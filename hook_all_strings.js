Java.perform(function () {
    var StringClass = Java.use("java.lang.String");

    StringClass.toString.implementation = function () {
        var result = this.$init();
        if (result.length > 3 && result.length < 300) {
            send("[str] " + result);
        }
        return result;
    };
});
