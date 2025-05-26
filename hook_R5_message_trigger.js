Java.perform(function () {
    var targetClass = "jp.naver.line.android.activity.chathistory.ChatHistoryActivity";
    var Cls = Java.use(targetClass);

    send("[*] Hooking R5(int, KeyEvent)");

    try {
        Cls.R5.overload("int", "android.view.KeyEvent").implementation = function (code, event) {
            send(`[+] R5() called with code=${code}, keyEvent=${event.toString()}`);
            return this.R5(code, event);
        };
        send("[*] Hook loaded.");
    } catch (e) {
        send("[!] Failed to hook R5: " + e.message);
    }
});
