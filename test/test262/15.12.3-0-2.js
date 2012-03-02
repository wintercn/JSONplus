registerTest(
    "15.12.3",
    "15.12.3-0-2.js",
    "JSON.stringifyEx must exist as be a function taking 3 parameters",
    function testcase() {
        var f = JSON.stringifyEx;

        if (typeof (f) === "function" && f.length === 3) {
            return true;
        }
    }
);