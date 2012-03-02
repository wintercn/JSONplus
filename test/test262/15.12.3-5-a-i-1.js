registerTest(
    "15.12.3",
    "15.12.3-5-a-i-1.js",
    "JSON.stringifyEx converts Number wrapper object space aruguments to Number values",
    function testcase() {
        var obj = { a1: { b1: [1, 2, 3, 4], b2: { c1: 1, c2: 2} }, a2: 'a2' };
        return JSON.stringifyEx(obj, null, new Number(5)) === JSON.stringifyEx(obj, null, 5);
    }
);