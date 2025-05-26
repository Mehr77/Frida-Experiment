import frida
import sys

def on_message(message, data):
    print(message['payload'])

device = frida.get_usb_device()
pid = device.spawn(["jp.naver.line.android"])
session = device.attach(pid)

script_code = """
Java.perform(function () {
    var targetClass = "jp.naver.line.android.thrift.client.impl.TalkServiceClientImpl";
    var clazz = Java.use(targetClass);
    var methods = clazz.class.getDeclaredMethods();
    methods.forEach(function(m) {
        console.log(m.toString());
    });
});
"""

script = session.create_script(script_code)
script.on("message", on_message)
script.load()
device.resume(pid)

print("[*] Script loaded. Press Ctrl+C to quit.")
sys.stdin.read()

