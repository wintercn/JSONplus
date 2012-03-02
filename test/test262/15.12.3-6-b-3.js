registerTest(
    "15.12.3",
    "15.12.3-6-b-3.js",
    "JSON.stringifyEx treats numeric space arguments less than 1 (-5) the same as emptry string space argument.",
    function testcase() {
        var obj = { a1: { b1: [1, 2, 3, 4], b2: { c1: 1, c2: 2} }, a2: 'a2' };
        return JSON.stringifyEx(obj, null, -5) === JSON.stringifyEx(obj);  /* emptry string should be same as no space arg */
    }
);