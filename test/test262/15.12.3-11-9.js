registerTest(
    "15.12.3",
    "15.12.3-11-9.js",
    "JSON.stringifyEx correctly works on top level Boolean objects.",
    function testcase() {
        return JSON.stringifyEx(new Boolean(false)) === 'false';
    }
);