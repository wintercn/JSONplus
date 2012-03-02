registerTest(
    "15.12.3",
    "15.12.3-11-2.js",
    "A JSON.stringifyEx replacer function works is applied to a top level undefined value.",
    function testcase() {
        return JSON.stringifyEx(undefined, function (k, v) { return "replacement" }) === '"replacement"';
    }
);