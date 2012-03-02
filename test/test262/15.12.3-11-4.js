registerTest(
    "15.12.3",
    "15.12.3-11-4.js",
    "JSON.stringifyEx correctly works on top level Number values.",
    function testcase() {
        return JSON.stringifyEx(123) === '123';
    }
);