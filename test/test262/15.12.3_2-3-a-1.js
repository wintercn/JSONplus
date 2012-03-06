registerTest(
    "15.12.3",
    "15.12.3_2-3-a-1.js",
    "JSON.stringify converts string wrapper objects returned from replacer functions to literal strings.",
    function testcase() {
        return JSON.stringify([42], function (k, v) { return v === 42 ? new String('fortytwo') : v }) === '["fortytwo"]';
    }
);