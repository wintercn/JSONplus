registerTest(
   "15.12.1.1",
    "15.12.1.1-g4-3.js",
    "The JSON lexical grammar does not allow a JSONStringCharacter to be any of the Unicode characters U+0010 thru U+0017",
    function testcase() {
        try {
            JSON.parseEx('"\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017"'); // invalid string characters should produce a syntax error
        }
        catch (e) {
            return true; // treat any exception as a pass, other tests ensure that JSON.parseEx throws SyntaxError exceptions
        }
    }
);