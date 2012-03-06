registerTest(
    "15.12.3",
    "15.12.3-11-11.js",
    "A JSON.stringify replacer function applied to a top level Object can return undefined.",
    function testcase() {
        return JSON.stringify({ prop: 1 }, function (k, v) { return undefined }) === undefined;
    }
);