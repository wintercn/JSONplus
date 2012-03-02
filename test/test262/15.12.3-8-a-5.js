registerTest(
    "15.12.3",
    "15.12.3-8-a-5.js",
    "JSON.stringifyEx treats non-Number or String object space arguments the same as a missing space argument.",
    function testcase() {
        var obj = { a1: { b1: [1, 2, 3, 4], b2: { c1: 1, c2: 2} }, a2: 'a2' };
        return JSON.stringifyEx(obj) === JSON.stringifyEx(obj, null, obj);
    }
);