registerTest(
    "15.12.3",
    "15.12.3-6-a-1.js",
    "JSON.stringifyEx treats numeric space arguments greater than 10 the same as a  space argument of 10.",
    function testcase() {
        var obj = { a1: { b1: [1, 2, 3, 4], b2: { c1: 1, c2: 2} }, a2: 'a2' };
        return JSON.stringifyEx(obj, null, 10) === JSON.stringifyEx(obj, null, 100);
    }
);