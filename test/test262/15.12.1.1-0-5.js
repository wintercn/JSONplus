registerTest(
   "15.12.1.1",
    "15.12.1.1-0-5.js",
    "<ZWSPP> is not valid JSON whitespace as specified by the production JSONWhitespace.",
    function testcase() {
        try {
            JSON.parse('\u200b1234'); // should produce a syntax error 
        }
        catch (e) {
            return true; // treat any exception as a pass, other tests ensure that JSON.parse throws SyntaxError exceptions
        }
    }
);