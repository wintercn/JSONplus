registerTest(
   "15.12.1.1",
    "15.12.1.1-g5-1.js",
    "The JSON lexical grammar allows Unicode escape sequences in a JSONString",
    function testcase() {
        return JSON.parseEx('"\\u0058"') === 'X';
    }
);