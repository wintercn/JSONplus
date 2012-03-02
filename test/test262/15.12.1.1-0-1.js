registerTest(
   "15.12.1.1",
    "15.12.1.1-0-1.js",
    "The JSON lexical grammar treats whitespace as a token seperator",
    function testcase() {
        try {
            new Parser().parse('12\t\r\n 34'); // should produce a syntax error as whitespace results in two tokens
        }
        catch (e) {
            if (e.name === 'SyntaxError') return true;
        }
    }
);