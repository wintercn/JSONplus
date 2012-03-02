registerTest(
   "15.12.1.1",
    "15.12.1.1-g6-2.js",
    "The JSON lexical grammer allows '\' as a JSONEscapeCharacter after '\' in a JSONString",
    function testcase() {
        return new Parser().parse('"\\\\"') === '\\';
    }
);