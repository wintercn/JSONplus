registerTest(
    "15.12.3",
    "15.12.3_2-3-a-3.js",
    "JSON.stringifyEx converts Boolean wrapper objects returned from replacer functions to literal numbers.",
    function testcase() {
        return JSON.stringifyEx([42], function (k, v) { return v === 42 ? new Boolean(false) : v }) === '[false]';
    }
);