registerTest(
   "15.12.1.1",
    "15.12.1.1-g2-2.js",
    "A JSON String may not be delimited by single quotes ",
    function testcase() {
        try {
            if (JSON.parseEx("'abc'") === 'abc') return false;
        }
        catch (e) {
            return true;
        }
    }
);