registerTest(
   "15.12.1.1",
    "15.12.1.1-0-2.js",
    "<VT> is not valid JSON whitespace as specified by the production JSONWhitespace.",
    function testcase() {
        try {
            new Parser().parse('\u000b1234'); // should produce a syntax error 
        }
        catch (e) {
            return true; // treat any exception as a pass, other tests ensure that new Parser().parse throws SyntaxError exceptions
        }
    }
);