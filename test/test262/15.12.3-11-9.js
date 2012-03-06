registerTest(
    "15.12.3",
    "15.12.3-11-9.js",
    "JSON.stringify correctly works on top level Boolean objects.",
    function testcase() {
        return JSON.stringify(new Boolean(false)) === 'false';
    }
);