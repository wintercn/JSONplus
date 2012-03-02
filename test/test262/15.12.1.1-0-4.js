registerTest(
   "15.12.1.1",
    "15.12.1.1-0-4.js",
    "<NBSP> is not valid JSON whitespace as specified by the production JSONWhitespace.",
    function testcase() {
        try {
            JSON.parseEx('\u00a01234'); // should produce a syntax error 
        }
        catch (e) {
            return true; // treat any exception as a pass, other tests ensure that JSON.parseEx throws SyntaxError exceptions
        }
    }
);