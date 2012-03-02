registerTest(
   "15.12.1.1",
    "15.12.1.1-g2-4.js",
    "A JSONString must both begin and end with double quotes",
    function testcase() {
        try {
            if (JSON.parseEx('"ab' + "c'") === 'abc') return false;
        }
        catch (e) {
            return true;
        }
    }
);