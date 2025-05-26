import frida
import sys

def on_message(message, data):
    if message['type'] == 'send':
        print("[*] {}".format(message['payload']))
    elif message['type'] == 'error':
        print("[!] Error:", message['stack'])

session = frida.get_usb_device().attach(19956)  # Or use "LINE" if needed

with open("hook_all_TalkServiceClientImpl.js") as f:
    script = session.create_script(f.read())

script.on("message", on_message)
script.load()

print("[*] Hooking all methods in TalkServiceClientImpl... Press Ctrl+C to quit.")
sys.stdin.read()
