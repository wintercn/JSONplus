registerTest(
    "15.12.3",
    "15.12.3_2-2-b-i-2.js",
    "JSON.stringify converts Number wrapper objects returned from a toJSON call to literal Number.",
    function testcase() {
        var obj = {
            prop: 42,
            toJSON: function () { return new Number(42) }
        };
        return JSON.stringify([obj]) === '[42]';
    }
);