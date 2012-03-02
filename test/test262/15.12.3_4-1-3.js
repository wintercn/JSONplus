registerTest(
    "15.12.3",
    "15.12.3_4-1-3.js",
    "JSON.stringifyEx a indirectly circular object throws a error",
    function testcase() {
        var obj = { p1: { p2: {}} };
        obj.p1.p2.prop = obj;
        try {
            JSON.stringifyEx(obj);
            return false;  // should not reach here
        }
        catch (e) { return true }
    }
);