registerTest(
    "15.12.3",
    "15.12.3-11-4.js",
    "JSON.stringify correctly works on top level Number values.",
    function testcase() {
        return JSON.stringify(123) === '123';
    }
);