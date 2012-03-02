registerTest(
   "15.12.1.1",
    "15.12.1.1-g5-3.js",
    "A JSONStringCharacter UnicodeEscape may not include any non=hex characters",
    function testcase() {
        try {
            JSON.parseEx('"\\u0X50"')
        }
        catch (e) {
            return e.name === 'SyntaxError'
        }
    }
);