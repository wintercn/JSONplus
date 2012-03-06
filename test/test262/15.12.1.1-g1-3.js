registerTest(
   "15.12.1.1",
    "15.12.1.1-g1-3.js",
    "The JSON lexical grammar treats <LF> as a whitespace character",
    function testcase() {
        if (JSON.parse('\n1234') !== 1234) return false; // <LF> should be ignored
        try {
            JSON.parse('12\n34'); // <LF> should produce a syntax error as whitespace results in two tokens
        }
        catch (e) {
            if (e.name === 'SyntaxError') return true;
        }
    }
);