registerTest(
    "15.12.3",
    "15.12.3-11-3.js",
    "A JSON.stringifyEx correctly works on top level string values.",
    function testcase() {
        return JSON.stringifyEx("a string") === '"a string"';
    }
);