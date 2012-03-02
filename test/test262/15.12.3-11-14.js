registerTest(
    "15.12.3",
    "15.12.3-11-14.js",
    "Applying JSON.stringifyEx to a  function returns undefined.",
    function testcase() {
        return JSON.stringifyEx(function () { }) === undefined;
    }
);