registerTest(
    "15.12.3",
    "15.12.3-6-a-2.js",
    "JSON.stringify truccates non-integer numeric space arguments to their integer part.",
    function testcase() {
        var obj = { a1: { b1: [1, 2, 3, 4], b2: { c1: 1, c2: 2} }, a2: 'a2' };
        return JSON.stringify(obj, null, 5.99999) === JSON.stringify(obj, null, 5);
    }
);