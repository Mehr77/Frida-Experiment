Java.perform(function () {
    var Cls = Java.use("jp.naver.line.android.activity.chathistory.ChatHistoryActivity");

    send("[*] Hooking onKeyUp");

    Cls.onKeyUp.overload("int", "android.view.KeyEvent").implementation = function (keyCode, event) {
        if (keyCode === 66) {
            send("[+] ENTER key pressed — enabling verbose method tracing...");

            var methods = Cls.class.getDeclaredMethods();
            methods.forEach(function (m) {
                var name = m.getName();
                try {
                    Cls[name].overloads.forEach(function (overload) {
                        overload.implementation = function () {
                            send(`[*] Called: ${name}(${Array.from(arguments).join(", ")})`);
                            return overload.apply(this, arguments);
                        };
                    });
                } catch (_) {}
            });
        }

        return this.onKeyUp(keyCode, event);
    };

    send("[*] Hook loaded.");
});
