registerTest(
   "15.12.1.1",
    "15.12.1.1-g6-6.js",
    "The JSON lexical grammer allows 'r' as a JSONEscapeCharacter after '\' in a JSONString",
    function testcase() {
        return new Parser().parse('"\\r"') === '\r';
    }
);