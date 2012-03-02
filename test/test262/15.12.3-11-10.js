registerTest(
    "15.12.3",
    "15.12.3-11-10.js",
    "A JSON.stringifyEx replacer function applied to a top level scalar value can return undefined.",
    function testcase() {
        return JSON.stringifyEx(42, function (k, v) { return undefined }) === undefined;
    }
);