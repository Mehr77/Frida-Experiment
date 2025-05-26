Java.perform(function () {
    var clazz = Java.use("jp.naver.line.android.thrift.client.impl.TalkServiceClientImpl");

    send("[*] Hooking all methods in TalkServiceClientImpl");

    clazz.class.getDeclaredMethods().forEach(function (method) {
        var methodName = method.getName();

        try {
            clazz[methodName].overloads.forEach(function (overload) {
                overload.implementation = function () {
                    send("[+] Called: " + methodName + "()");
                    for (var i = 0; i < arguments.length; i++) {
                        try {
                            send("   Arg[" + i + "]: " + arguments[i].toString());
                        } catch (e) {
                            send("   Arg[" + i + "]: [object]");
                        }
                    }

                    var result = overload.apply(this, arguments);
                    send("   Return: " + result);
                    return result;
                };
            });
        } catch (e) {
            send("[!] Could not hook " + methodName + ": " + e);
        }
    });
});
