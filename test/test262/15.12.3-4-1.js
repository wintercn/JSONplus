registerTest(
    "15.12.3",
    "15.12.3-4-1.js",
    "JSON.stringify ignores replacer aruguments that are not functions or arrays..",
    function testcase() {
        try {
            return JSON.stringify([42], {}) === '[42]';
        }
        catch (e) { return false }
    }
);