Java.perform(function () {
    const className = "jp.naver.line.android.thrift.client.impl.TalkServiceClientImpl";
    const clazz = Java.use(className);

    send("[*] Hooking ALL methods in " + className);

    clazz.class.getDeclaredMethods().forEach(function (method) {
        const name = method.getName();

        try {
            const overloads = clazz[name].overloads;
            overloads.forEach(function (ol) {
                ol.implementation = function () {
                    send("[+] Called: " + name + "(" + ol.argumentTypes.map(t => t.className).join(", ") + ")");
                    for (var i = 0; i < arguments.length; i++) {
                        try {
                            send("    Arg[" + i + "]: " + arguments[i]);
                        } catch (e) {
                            send("    Arg[" + i + "]: [unprintable]");
                        }
                    }

                    const result = ol.apply(this, arguments);
                    send("    Return: " + result);
                    return result;
                };
            });
        } catch (e) {
            send("[!] Could not hook: " + name + " → " + e);
        }
    });
});
