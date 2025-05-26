Java.perform(function () {
    var packagePrefix = "jp.naver.line.android.thrift.client.impl";
    var hookCount = 0;

    Java.enumerateLoadedClasses({
        onMatch: function(className) {
            if (className.startsWith(packagePrefix)) {
                try {
                    var clazz = Java.use(className);
                    send("[*] Hooking class: " + className);

                    var methods = clazz.class.getDeclaredMethods();
                    methods.forEach(function(method) {
                        var name = method.getName();
                        try {
                            clazz[name].overloads.forEach(function(overload) {
                                overload.implementation = function () {
                                    send("[+] " + className + "." + name + " called");
                                    for (var i = 0; i < arguments.length; i++) {
                                        try {
                                            send("    Arg[" + i + "]: " + arguments[i]);
                                        } catch (e) {
                                            send("    Arg[" + i + "]: [unprintable]");
                                        }
                                    }
                                    var retval = overload.apply(this, arguments);
                                    send("    Return: " + retval);
                                    return retval;
                                };
                                hookCount++;
                            });
                        } catch (e) {
                            send("[!] Skipped " + className + "." + name + " (likely inaccessible): " + e);
                        }
                    });
                } catch (e) {
                    send("[!] Could not use class " + className + ": " + e);
                }
            }
        },
        onComplete: function() {
            send("[*] Hooking complete. Total methods hooked: " + hookCount);
        }
    });
});
