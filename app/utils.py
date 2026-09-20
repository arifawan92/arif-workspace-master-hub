import webbrowser, urllib.parse, pandas as pd
def open_whatsapp(number, message):
 url = f"https://wa.me/{number}?text={urllib.parse.quote(message)}"
 webbrowser.open_new_tab(url)
def export_to_excel(data, filename):
 df = pd.DataFrame(data[1:], columns=data[0]); df.to_excel(filename, index=False)