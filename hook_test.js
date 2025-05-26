Java.perform(function () {
    var className = "jp.naver.line.android.LineApplication";
    send("[*] Hooking " + className);

    var cls = Java.use(className);
    cls.getApplicationContext.implementation = function () {
        send("[+] getApplicationContext() called");
        return this.getApplicationContext();
    };
});
