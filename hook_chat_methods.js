Java.perform(function () {
    var target = "jp.naver.line.android.activity.chathistory.ChatHistoryActivity";
    var Cls = Java.use(target);

    send("[*] Hooking onKeyUp method");

    Cls.onKeyUp.overload("int", "android.view.KeyEvent").implementation = function (keyCode, event) {
        if (keyCode === 66) { // 66 = Enter key
            send("[+] ENTER key pressed in chat");
            send("    Event: " + event.toString());
        }
        return this.onKeyUp(keyCode, event);
    };

    send("[*] Hook loaded.");
});
