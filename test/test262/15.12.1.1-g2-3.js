registerTest(
   "15.12.1.1",
    "15.12.1.1-g2-3.js",
    "A JSON String may not be delimited by Uncode escaped quotes ",
    function testcase() {
        try {
            if (JSON.parse("\\u0022abc\\u0022") === 'abc') return false;
        }
        catch (e) {
            return true;
        }
    }
);