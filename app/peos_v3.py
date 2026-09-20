import os, zipfile, hashlib
from datetime import datetime, timedelta
from tkinter import *
from tkinter import filedialog, messagebox
import schedule, time, threading, pandas as pd
import webbrowser, urllib.parse, json
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
from matplotlib.figure import Figure

# --- SECURITY BLOCK ---
PROJECT_ID = "PEOS-KPP-2026-001"
FILE_HASH = "7f3a9c2b"
BACKUP_PATH = r"D:\Arif Workspace\Projects\PEOS\Backup"
CHAT_LOG_FILE = os.path.join(BACKUP_PATH, "PEOS_ChatLog.json")

def verify_files():
    if PROJECT_ID!= "PEOS-KPP-2026-001":
        raise SystemExit("ERROR: Invalid Project ID. File Manipulated!")
verify_files()
# --- END SECURITY ---

# --- CONFIG ---
BASE_PATH = r"D:\Arif Workspace\Projects\PEOS\Projects\KP-Police"
ALERT_DAYS = 3
YOUR_WHATSAPP = "923001401022"
TEAM = {
    "HQ": ["AK-Arif Khan"], "BNU": ["AR-Ali Raza"], "PWR": ["US-Usman Shah"],
    "MRD": ["SN-Sana Noor"], "HZD": ["ZK-Zafar Khan"], "KHT": ["FM-Farah Malik"],
    "DKI": ["IJ-Imran Jan"], "MLD": ["TN-Tahir Noor"]
}
# --- END CONFIG ---

data_for_export = []
summary_text = ""

def save_chat_log(action, details):
    if not os.path.exists(BACKUP_PATH): os.makedirs(BACKUP_PATH)
    log_entry = {
        "ProjectID": PROJECT_ID,
        "Timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "Action": action,
        "Details": details,
        "Hash": hashlib.sha256((PROJECT_ID + action + details).encode()).hexdigest()[:12]
    }
    logs = []
    if os.path.exists(CHAT_LOG_FILE):
        with open(CHAT_LOG_FILE, 'r', encoding='utf-8') as f: logs = json.load(f)
    logs.append(log_entry)
    with open(CHAT_LOG_FILE, 'w', encoding='utf-8') as f: json.dump(logs, f, indent=4, ensure_ascii=False)

def get_last_modified(folder):
    if not os.path.exists(folder): return None
    try:
        files = [os.path.join(folder, f) for f in os.listdir(folder) if os.path.isfile(os.path.join(folder, f))]
        if not files: return None
        return datetime.fromtimestamp(max(os.path.getmtime(f) for f in files))
    except: return None

def log(msg):
    log_box.insert(END, f"[{datetime.now().strftime('%H:%M:%S')}] {msg}")
    log_box.see(END)

def backup_now():
    try:
        if not os.path.exists(BACKUP_PATH): os.makedirs(BACKUP_PATH)
        zip_name = f"{PROJECT_ID}-Backup-{datetime.now().strftime('%Y%m%d-%H%M%S')}.zip"
        zip_path = os.path.join(BACKUP_PATH, zip_name)
        with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
            for root, dirs, files in os.walk(BASE_PATH):
                for file in files:
                    zipf.write(os.path.join(root, file), os.path.relpath(os.path.join(root, file), BASE_PATH))
        save_chat_log("BACKUP", f"File:{zip_name}")
        log(f"Backup Complete: {zip_name}")
        messagebox.showinfo("Success", f"Backup ban gaya:\n{zip_path}")
    except Exception as e:
        messagebox.showerror("Error", f"Backup nahi bana: {e}")

def view_chatlog():
    log_box.delete(0, END)
    if not os.path.exists(CHAT_LOG_FILE):
        log("No ChatLog found yet. Pehle 1 baar Scan ya Backup karo.")
        return
    with open(CHAT_LOG_FILE, 'r', encoding='utf-8') as f: logs = json.load(f)
    log(f"--- ChatLog History: {len(logs)} Records ---")
    for entry in logs[-20:]:
        msg = f"[{entry['Timestamp']}] {entry['Action']} | {entry['Details']} | Hash:{entry['Hash']}"
        log(msg)
    log("--- End of Log ---")

def draw_chart():
    for widget in chart_frame.winfo_children(): widget.destroy()
    div_counts = {}
    for row in data_for_export[1:]:
        div = row[1]; status = row[5]
        if div not in div_counts: div_counts[div] = {"OK": 0, "ALERT": 0}
        div_counts[div][status] += 1
    if not div_counts: return
    fig = Figure(figsize=(7, 2.5), dpi=100)
    ax = fig.add_subplot(111)
    divisions = list(div_counts.keys())
    ok_counts = [div_counts[d]["OK"] for d in divisions]
    alert_counts = [div_counts[d]["ALERT"] for d in divisions]
    ax.bar(divisions, ok_counts, color='green', label='OK')
    ax.bar(divisions, alert_counts, bottom=ok_counts, color='red', label='ALERT')
    ax.set_title(f'{PROJECT_ID} - Division Status', fontsize=10)
    ax.legend(loc='upper right', fontsize=8)
    fig.tight_layout()
    canvas = FigureCanvasTkAgg(fig, master=chart_frame)
    canvas.draw()
    canvas.get_tk_widget().pack()

def _real_scan_peos():
    global data_for_export, summary_text
    result.delete(0, END)
    data_for_export = [["ProjectID", "Division", "Member", "File Count", "Last Activity", "Status"]]
    total_files = 0; alert_count = 0; alerts_list = []
    summary_text = f"*{PROJECT_ID} Daily Report - {datetime.now().strftime('%Y-%m-%d %H:%M')}*\n\n"
    log(f"Scanning: {BASE_PATH}")

    for div, members in TEAM.items():
        div_path = os.path.join(BASE_PATH, f"{div} Division"); div_files = 0
        for member in members:
            member_path = os.path.join(div_path, "02-Work", member)
            file_count = len([f for f in os.listdir(member_path) if os.path.isfile(os.path.join(member_path, f))]) if os.path.exists(member_path) else 0
            div_files += file_count; last_mod = get_last_modified(member_path); status = "OK"; last_str = "Never"
            if last_mod:
                last_str = last_mod.strftime('%Y-%m-%d')
                if (datetime.now() - last_mod).days >= ALERT_DAYS:
                    status = "ALERT"; alert_count += 1; alerts_list.append(member); result.insert(END, f" -> {member}: {file_count} files - ALERT"); result.itemconfig(result.size()-1, {'fg':'red'})
                else: result.insert(END, f" -> {member}: {file_count} files - OK")
            else: status = "ALERT"; alert_count += 1; alerts_list.append(member); result.insert(END, f" -> {member}: {file_count} files - ALERT"); result.itemconfig(result.size()-1, {'fg':'red'})
            data_for_export.append([PROJECT_ID, div, member, file_count, last_str, status])
        total_files += div_files; result.insert(END, f"{div} Division: {div_files} files"); summary_text += f"*{div} Division*: {div_files} files\n"

    summary_text += f"\n*Total Files*: {total_files}\n*ALERTS*: {alert_count}\n"
    if alerts_list: summary_text += f"*Red List*: {', '.join(alerts_list)}\n"
    summary_text += f"\n_ID: {PROJECT_ID}_"
    btn_whatsapp.config(state=NORMAL); btn_export.config(state=NORMAL); btn_backup.config(state=NORMAL)
    log(f"Scan Complete. Total: {total_files} | Alerts: {alert_count}")
    save_chat_log("SCAN", f"Total:{total_files} Alerts:{alert_count}")
    draw_chart()

def safe_scan_peos():
    try:
        log("Auto Scan Shuru...")
        _real_scan_peos()
    except Exception as e:
        log(f"ERROR: Scan fail ho gaya. Reason: {e}")
        save_chat_log("ERROR", f"Scan Failed: {str(e)[:50]}")
        log("5 second baad khud dobara try karunga...")
        time.sleep(5)
        try:
            _real_scan_peos()
            log("Khud theek ho gaya ✅")
            save_chat_log("RECOVERED", "Scan auto-recovered")
        except Exception as e2:
            log(f"2nd try bhi fail: {e2}")

def send_whatsapp(auto=False):
    global summary_text
    if summary_text == "":
        if not auto: messagebox.showwarning("Warning", "Pehle Scan Now daba do")
        return
    try:
        url = f"https://wa.me/{YOUR_WHATSAPP}?text={urllib.parse.quote(summary_text)}"
        webbrowser.open_new_tab(url)
        save_chat_log("WHATSAPP_SENT", f"To:{YOUR_WHATSAPP}")
        if not auto: messagebox.showinfo("Done", "Browser khul gaya. Bas Send dabao.")
    except Exception as e: messagebox.showerror("Error", f"Browser nahi khula: {e}")

def export_report():
    if not data_for_export: messagebox.showwarning("Warning", "Pehle Scan Now daba do"); return
    file_path = filedialog.asksaveasfilename(defaultextension=".xlsx", filetypes=[("Excel files", "*.xlsx")], initialfile=f"{PROJECT_ID}-Report-{datetime.now().strftime('%Y%m%d')}.xlsx")
    if file_path:
        df = pd.DataFrame(data_for_export[1:], columns=data_for_export[0]); df.to_excel(file_path, index=False)
        save_chat_log("EXPORT", f"File:{file_path}")
        messagebox.showinfo("Success", f"Report Exported:\n{file_path}")

def scan_and_send():
    safe_scan_peos()
    time.sleep(2)
    send_whatsapp(auto=True)
    log(f"Auto Report Sent at {datetime.now().strftime('%H:%M')}")

def run_schedule():
    while True:
        schedule.run_pending()
        time.sleep(60)

def start_auto():
    schedule.every(1).hours.do(scan_and_send) # Har 1 ghante
    btn_auto.config(text=f"Auto Pilot: ON", bg="red");
    log(f"Auto Pilot ON. Har 1 ghante + Self Healing active")

# GUI
root = Tk(); root.title(f"{PROJECT_ID} Dashboard v3.0 - Auto Pilot"); root.geometry("720x620")
Label(root, text=f"{PROJECT_ID} Dashboard", font=("Arial", 16, "bold")).pack(pady=5)

frame = Frame(root); frame.pack()
Button(frame, text="1. Scan Now", command=safe_scan_peos, bg="green", fg="white").pack(side=LEFT, padx=2)
btn_whatsapp = Button(frame, text="2. Send WhatsApp", command=send_whatsapp, bg="#25D366", fg="white", state=DISABLED); btn_whatsapp.pack(side=LEFT, padx=2)
btn_export = Button(frame, text="3. Export Excel", command=export_report, bg="blue", fg="white", state=DISABLED); btn_export.pack(side=LEFT, padx=2)
btn_backup = Button(frame, text="4. Backup Now", command=backup_now, bg="purple", fg="white", state=DISABLED); btn_backup.pack(side=LEFT, padx=2)
Button(frame, text="5. Check Code", command=lambda: os.system("python -m py_compile " + os.path.basename(__file__)), bg="gray", fg="white").pack(side=LEFT, padx=2)
Button(frame, text="6. View ChatLog", command=view_chatlog, bg="brown", fg="white").pack(side=LEFT, padx=2)

btn_auto = Button(root, text="7. Start Auto Pilot", command=start_auto, bg="orange", fg="black"); btn_auto.pack(pady=5)
result = Listbox(root, width=85, height=10, font=("Consolas", 9)); result.pack(pady=5)
Label(root, text="Activity Log:").pack(); log_box = Listbox(root, width=85, height=5, font=("Consolas", 8)); log_box.pack(pady=5)

chart_frame = Frame(root); chart_frame.pack(pady=10)
Label(root, text="Division Performance Chart").pack()

threading.Thread(target=run_schedule, daemon=True).start()
log(f"{PROJECT_ID} v3.0 Started. Auto Pilot Ready"); root.mainloop()