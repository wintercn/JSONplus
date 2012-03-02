registerTest(
   "15.12.1.1",
    "15.12.1.1-g1-4.js",
    "The JSON lexical grammar treats <SP> as a whitespace character",
    function testcase() {
        if (new Parser().parse(' 1234') != 1234) return false; // <SP> should be ignored
        try {
            new Parser().parse('12 34'); // <SP> should produce a syntax error as whitespace results in two tokens
        }
        catch (e) {
            if (e.name === 'SyntaxError') return true;
        }
    }
);