import frida
import sys

def on_message(message, data):
    print(message['payload'])

device = frida.get_usb_device()
pid = device.spawn(["jp.naver.line.android"])
session = device.attach(pid)

script_code = """
Java.perform(function () {
    var classes = Java.enumerateLoadedClassesSync();
    classes.forEach(function(cls) {
        if (cls.toLowerCase().includes("line")) {
            console.log(cls);
        }
    });
});
"""

script = session.create_script(script_code)
script.on("message", on_message)
script.load()
device.resume(pid)

print("[*] Script loaded. Press Ctrl+C to quit.")
sys.stdin.read()
