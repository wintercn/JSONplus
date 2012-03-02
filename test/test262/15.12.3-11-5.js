registerTest(
    "15.12.3",
    "15.12.3-11-5.js",
    "JSON.stringifyEx correctly works on top level Boolean values.",
    function testcase() {
        return JSON.stringifyEx(true) === 'true';
    }
);