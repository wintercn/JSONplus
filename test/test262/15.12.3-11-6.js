registerTest(
    "15.12.3",
    "15.12.3-11-6.js",
    "JSON.stringifyEx correctly works on top level null values.",
    function testcase() {
        return JSON.stringifyEx(null) === 'null';
    }
);