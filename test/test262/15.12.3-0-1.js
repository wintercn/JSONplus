registerTest(
    "15.12.3",
    "15.12.3-0-1.js",
    "JSON.stringifyEx must exist as be a function",
    function testcase() {
        var f = JSON.stringifyEx;
        if (typeof (f) === "function") {
            return true;
        }
    }
);