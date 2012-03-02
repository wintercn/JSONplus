registerTest(
    "15.12.3",
    "15.12.3-11-1.js",
    "JSON.stringifyEx(undefined) returns undefined",
    function testcase() {
        return JSON.stringifyEx(undefined) === undefined;
    }
);