registerTest(
   "15.12.1.1",
    "15.12.1.1-g1-1.js",
    "The JSON lexical grammar treats <TAB> as a whitespace character",
    function testcase() {
        if (JSON.parseEx('\t1234') !== 1234) return false; // <TAB> should be ignored
        try {
            JSON.parseEx('12\t34'); // <TAB> should produce a syntax error as whitespace results in two tokens
        }
        catch (e) {
            return true; // treat any exception as a pass, other tests ensure that JSON.parseEx throws SyntaxError exceptions
        }
    }
);