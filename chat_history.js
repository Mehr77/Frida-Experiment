Java.perform(function () {
    var target = "jp.naver.line.android.activity.chathistory.ChatHistoryActivity";
    var Cls = Java.use(target);

    send("[*] Hooking onKeyUp to trace stack");

    Cls.onKeyUp.overload("int", "android.view.KeyEvent").implementation = function (keyCode, event) {
        if (keyCode === 66) {
            send("[+] ENTER key pressed in chat");

            // Dump stack trace
            var Exception = Java.use("java.lang.Exception");
            var ex = Exception.$new();
            send(ex.getStackTrace().toString());
        }

        return this.onKeyUp(keyCode, event);
    };

    send("[*] Hook loaded for stack trace.");
});
