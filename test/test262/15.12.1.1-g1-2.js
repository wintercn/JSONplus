registerTest(
   "15.12.1.1",
    "15.12.1.1-g1-2.js",
    "The JSON lexical grammar treats <CR> as a whitespace character",
    function testcase() {
        if (JSON.parseEx('\r1234') !== 1234) return false; // <cr> should be ignored
        try {
            JSON.parseEx('12\r34'); // <CR> should produce a syntax error as whitespace results in two tokens
        }
        catch (e) {
            if (e.name === 'SyntaxError') return true;
        }
    }
);