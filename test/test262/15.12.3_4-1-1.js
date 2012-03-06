registerTest(
    "15.12.3",
    "15.12.3_4-1-1.js",
    "JSON.stringify a circular object throws a error",
    function testcase() {
        var obj = {};
        obj.prop = obj;
        try {
            JSON.stringify(obj);
            return false;  // should not reach here
        }
        catch (e) { return true }
    }
);