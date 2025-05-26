Interceptor.attach(Module.getExportByName(null, "dlopen"), {
    onEnter: function (args) {
        this.path = Memory.readUtf8String(args[0]);
        if (this.path.indexOf("libline") !== -1 ||
            this.path.indexOf("libthrift") !== -1 ||
            this.path.indexOf("libcore") !== -1) {
            send("[*] Loading native library: " + this.path);
            this.shouldHook = true;
        } else {
            this.shouldHook = false;
        }
    },
    onLeave: function (retval) {
        if (this.shouldHook) {
            send("[*] Library loaded. Setting hooks...");
            // Defer hook logic slightly to ensure module is ready
            setTimeout(function () {
                try {
                    var base = Module.findBaseAddress("libline.so") ||
                               Module.findBaseAddress("libthrift.so") ||
                               Module.findBaseAddress("libcore.so");
                    if (base) {
                        send("[+] Native lib loaded at: " + base);
                        // Example: Hook a common C string function for visibility
                        var func = Module.getExportByName(null, "strlen");
                        Interceptor.attach(func, {
                            onEnter: function (args) {
                                var str = Memory.readUtf8String(args[0]);
                                if (str && str.length > 5 && str.length < 500) {
                                    send("[strlen] " + str);
                                }
                            }
                        });
                    }
                } catch (e) {
                    send("[!] Hook error: " + e.message);
                }
            }, 100);
        }
    }
});
