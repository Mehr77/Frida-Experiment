import frida
import sys

def on_message(message, data):
    if message['type'] == 'send':
        print("[*] " + message['payload'])
    elif message['type'] == 'error':
        print("[!] Error:", message['stack'])
        

session = frida.get_usb_device().attach("LINE")  # or use the PID if needed

with open("hook_targeted_classes.js") as f:
    script = session.create_script(f.read())

script.on('message', on_message)
script.load()

print("[*] Hook loaded for ChatHistoryActivity. Interact with LINE and check for output.")
sys.stdin.read()
