registerTest(
    "15.12.3",
    "15.12.3-11-7.js",
    "JSON.stringifyEx correctly works on top level Number objects.",
    function testcase() {
        return JSON.stringifyEx(new Number(42)) === '42';
    }
);