registerTest(
   "15.12.1.1",
    "15.12.1.1-g5-2.js",
    "A JSONStringCharacter UnicodeEscape may not have fewer than 4 hex characters",
    function testcase() {
        try {
            JSON.parseEx('"\\u005"')
        }
        catch (e) {
            return e.name === 'SyntaxError'
        }
    }
);