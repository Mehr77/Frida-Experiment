Interceptor.attach(Module.getExportByName(null, 'send'), {
    onEnter: function (args) {
        var fd = args[0].toInt32();
        var buf = args[1];
        var len = args[2].toInt32();

        var data = Memory.readUtf8String(buf, len);
        if (data.length > 3 && data.length < 2000) {
            send("[native send] fd=" + fd + " len=" + len + "\\n" + data);
        }
    },
    onLeave: function (retval) {}
});
