registerTest(
   "15.12.1.1",
    "15.12.1.1-g2-5.js",
    "A JSONStrings can contain no JSONStringCharacters (Empty JSONStrings)",
    function testcase() {
        return JSON.parseEx('""') === "";
    }
);