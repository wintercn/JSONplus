registerTest(
   "15.12.1.1",
    "15.12.1.1-0-9.js",
    "Whitespace characters can appear before/after any JSONtoken",
    function testcase() {
        new Parser().parse('\t\r \n{\t\r \n' +
                   '"property"\t\r \n:\t\r \n{\t\r \n}\t\r \n,\t\r \n' +
                   '"prop2"\t\r \n:\t\r \n' +
                        '[\t\r \ntrue\t\r \n,\t\r \nnull\t\r \n,123.456\t\r \n]' +
                     '\t\r \n}\t\r \n');  // should JOSN parse without error
        return true;
    }
);