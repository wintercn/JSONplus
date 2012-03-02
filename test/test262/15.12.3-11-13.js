registerTest(
    "15.12.3",
    "15.12.3-11-13.js",
    "A JSON.stringifyEx replacer function applied to a top level scalar can return an Object.",
    function testcase() {
        return JSON.stringifyEx(42, function (k, v) { return v == 42 ? { forty: 2} : v }) === '{"forty":2}';
    }
);