Java.perform(function () {
    const targets = [
        "com.linecorp.line.mainchatdata.messagecontent.external.MessageContentFileContentProvider"    ];

    let hooked = 0;

    targets.forEach(function(className) {
        try {
            var clazz = Java.use(className);
            send("[*] Hooking class: " + className);

            clazz.class.getDeclaredMethods().forEach(function (method) {
                var name = method.getName();
                try {
                    clazz[name].overloads.forEach(function (overload) {
                        overload.implementation = function () {
                            send("[+] " + className + "." + name + "() called");
                            for (var i = 0; i < arguments.length; i++) {
                                try {
                                    send("    Arg[" + i + "]: " + arguments[i]);
                                } catch (e) {
                                    send("    Arg[" + i + "]: [unprintable]");
                                }
                            }
                            const result = overload.apply(this, arguments);
                            send("    Return: " + result);
                            return result;
                        };
                        hooked++;
                    });
                } catch (e) {
                    send("[!] Failed to hook method in: " + className + " – " + e.message);
                }
            });
        } catch (e) {
            send("[!] Failed to use class: " + className + " – " + e.message);
        }
    });

    send("[*] Total hooked methods: " + hooked);
});
