registerTest(
   "15.12.1.1",
    "15.12.1.1-g2-1.js",
    "JSON Strings can be written using double quotes",
    function testcase() {
        return new Parser().parse('"abc"') === "abc";
    }
);