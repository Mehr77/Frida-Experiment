Java.perform(function () {
    const keyword = "chat";  // Try "chat", "event", etc.
    let found = false;

    Java.enumerateLoadedClasses({
        onMatch: function(className) {
            if (!found && className.toLowerCase().includes(keyword)) {
                found = true;
                try {
                    const clazz = Java.use(className);
                    send("[*] Hooking class: " + className);

                    const methods = clazz.class.getDeclaredMethods();
                    if (methods.length > 0) {
                        const methodName = methods[0].getName(); // Just hook the first method
                        send("[*] Hooking method: " + methodName);

                        clazz[methodName].overloads.forEach(function (overload) {
                            overload.implementation = function () {
                                send("[+] " + className + "." + methodName + "()");
                                return overload.apply(this, arguments);
                            };
                        });
                    }
                } catch (err) {
                    send("[!] Error hooking class: " + err.message);
                }
            }
        },
        onComplete: function () {
            if (!found) {
                send("[!] No matching classes found.");
            }
        }
    });
});
