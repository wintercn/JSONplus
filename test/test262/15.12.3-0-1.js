registerTest(
    "15.12.3",
    "15.12.3-0-1.js",
    "JSON.stringify must exist as be a function",
    function testcase() {
        var f = JSON.stringify;
        if (typeof (f) === "function") {
            return true;
        }
    }
);