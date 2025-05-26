import frida
import sys

device = frida.get_usb_device()
process = next(p for p in device.enumerate_processes() if "line" in p.name.lower())
session = device.attach(process.pid)

with open("hook_ChatHistoryActivity.js", "r", encoding="utf-8") as f:
    script = session.create_script(f.read())

def on_message(message, data):
    print(message["payload"] if "payload" in message else message)

script.on("message", on_message)
script.load()
print("[*] Hook loaded. Interact with LINE. Press Ctrl+C to quit.")
sys.stdin.read()
