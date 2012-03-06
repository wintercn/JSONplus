registerTest(
    "15.12.3",
    "15.12.3-0-2.js",
    "JSON.stringify must exist as be a function taking 3 parameters",
    function testcase() {
        var f = JSON.stringify;

        if (typeof (f) === "function" && f.length === 3) {
            return true;
        }
    }
);