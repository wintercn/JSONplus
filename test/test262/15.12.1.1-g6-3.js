registerTest(
   "15.12.1.1",
    "15.12.1.1-g6-3.js",
    "The JSON lexical grammer allows 'b' as a JSONEscapeCharacter after '\' in a JSONString",
    function testcase() {
        return JSON.parseEx('"\\b"') === '\b';
    }
);