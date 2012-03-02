registerTest(
    "15.12.3",
    "15.12.3-11-12.js",
    "A JSON.stringifyEx replacer function applied to a top level scalar can return an Array.",
    function testcase() {
        return JSON.stringifyEx(42, function (k, v) { return v == 42 ? [4, 2] : v }) === '[4,2]';
    }
);