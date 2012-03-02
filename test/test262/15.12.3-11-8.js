registerTest(
    "15.12.3",
    "15.12.3-11-8.js",
    "JSON.stringifyEx correctly works on top level String objects.",
    function testcase() {
        return JSON.stringifyEx(new String('wrappered')) === '"wrappered"';
    }
);