registerTest(
   "15.12.1.1",
    "15.12.1.1-g6-4.js",
    "The JSON lexical grammer allows 'f' as a JSONEscapeCharacter after '\' in a JSONString",
    function testcase() {
        return JSON.parse('"\\f"') === '\f';
    }
);