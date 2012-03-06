registerTest(
    "15.12.3",
    "15.12.3-11-15.js",
    "Applying JSON.stringify with a replacer function to a function returns the replacer value.",
    function testcase() {
        return JSON.stringify(function () { }, function (k, v) { return 99 }) === '99';
    }
);