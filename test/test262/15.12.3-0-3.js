registerTest(
    "15.12.3",
    "15.12.3-0-3.js",
    "JSON.stringifyEx must be deletable (configurable)",
    function testcase() {
        var o = JSON;
        var desc = Object.getOwnPropertyDescriptor(o, "stringify");
        if (desc.configurable === true) {
            return true;
        }
    }
);