registerTest(
    "15.12.3",
    "15.12.3_2-3-a-2.js",
    "JSON.stringifyEx converts Number wrapper objects returned from replacer functions to literal numbers.",
    function testcase() {
        return JSON.stringifyEx([42], function (k, v) { return v === 42 ? new Number(84) : v }) === '[84]';
    }
);