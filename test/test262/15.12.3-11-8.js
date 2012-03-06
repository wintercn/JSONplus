registerTest(
    "15.12.3",
    "15.12.3-11-8.js",
    "JSON.stringify correctly works on top level String objects.",
    function testcase() {
        return JSON.stringify(new String('wrappered')) === '"wrappered"';
    }
);