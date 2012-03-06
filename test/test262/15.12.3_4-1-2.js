registerTest(
    "15.12.3",
    "15.12.3_4-1-2.js",
    "JSON.stringify a circular object throws a TypeError",
    function testcase() {
        var obj = {};
        obj.prop = obj;
        try {
            JSON.stringify(obj);
            return false;  // should not reach here
        }
        catch (e) { return e.name === 'TypeError' }
    }
);