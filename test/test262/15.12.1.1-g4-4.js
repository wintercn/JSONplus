registerTest(
   "15.12.1.1",
    "15.12.1.1-g4-4.js",
    "The JSON lexical grammar does not allow a JSONStringCharacter to be any of the Unicode characters U+0018 thru U+001F",
    function testcase() {
        try {
            new Parser().parse('"\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f"'); // invalid string characters should produce a syntax error
        }
        catch (e) {
            if (e.name === 'SyntaxError') return true;
        }
    }
);