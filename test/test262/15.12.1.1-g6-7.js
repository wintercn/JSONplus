registerTest(
   "15.12.1.1",
    "15.12.1.1-g6-7.js",
    "The JSON lexical grammer allows 't' as a JSONEscapeCharacter after '\' in a JSONString",
    function testcase() {
        return JSON.parseEx('"\\t"') === '\t';
    }
);