registerTest(
    "15.12.3",
    "15.12.3-11-5.js",
    "JSON.stringify correctly works on top level Boolean values.",
    function testcase() {
        return JSON.stringify(true) === 'true';
    }
);