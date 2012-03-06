registerTest(
    "15.12.3",
    "15.12.3-11-1.js",
    "JSON.stringify(undefined) returns undefined",
    function testcase() {
        return JSON.stringify(undefined) === undefined;
    }
);