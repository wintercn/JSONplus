registerTest(
   "15.12.1.1",
    "15.12.1.1-g6-5.js",
    "The JSON lexical grammer allows 'n' as a JSONEscapeCharacter after '\' in a JSONString",
    function testcase() {
        return new Parser().parse('"\\n"') === '\n';
    }
);