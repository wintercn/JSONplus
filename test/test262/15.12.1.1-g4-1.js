registerTest(
   "15.12.1.1",
    "15.12.1.1-g4-1.js",
    "The JSON lexical grammar does not allow a JSONStringCharacter to be any of the Unicode characters U+0000 thru U+0007",
    function testcase() {
        try {
            new Parser().parse('"\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007"'); // invalid string characters should produce a syntax error
        }
        catch (e) {
            return true; // treat any exception as a pass, other tests ensure that new Parser().parse throws SyntaxError exceptions
        }
    }
);