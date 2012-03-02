registerTest(
    "15.12.3",
    "15.12.3_2-2-b-i-3.js",
    "JSON.stringifyEx converts Boolean wrapper objects returned from a toJSON call to literal Boolean values.",
    function testcase() {
        var obj = {
            prop: 42,
            toJSON: function () { return new Boolean(true) }
        };
        return JSON.stringifyEx([obj]) === '[true]';
    }
);