from flask import Flask, render_template, request
import subprocess, os, datetime

app = Flask(__name__)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

@app.route("/")
def dashboard():
    theme = request.args.get("theme", "green")
    
    # Last 5 log entries
    log_path = os.path.join(BASE_DIR, "data", "health-trace.log")
    logs = []
    if os.path.exists(log_path):
        with open(log_path, "r") as f:
            logs = f.readlines()[-5:]
    
    # Backup count
    backup_path = os.path.join(BASE_DIR, "Backup")
    backup_count = len([f for f in os.listdir(backup_path) if f.endswith(".zip")]) if os.path.exists(backup_path) else 0
    
    return render_template("index.html", theme=theme, logs=logs, backup_count=backup_count)

@app.route("/run-backup")
def run_backup():
    script_path = os.path.join(BASE_DIR, "scripts", "auto-backup.ps1")
    subprocess.Popen(["powershell", "-ExecutionPolicy", "Bypass", "-File", script_path])
    return "Backup Started! Check logs in 10 seconds."

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)
