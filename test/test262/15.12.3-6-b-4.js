registerTest(
    "15.12.3",
    "15.12.3-6-b-4.js",
    "JSON.stringifyEx treats numeric space arguments (in the range 1..10) is equivalent to a string of spaces of that length.",
    function testcase() {
        var obj = { a1: { b1: [1, 2, 3, 4], b2: { c1: 1, c2: 2} }, a2: 'a2' };
        var fiveSpaces = '     ';
        //               '12345'
        return JSON.stringifyEx(obj, null, 5) === JSON.stringifyEx(obj, null, fiveSpaces);
    }
);