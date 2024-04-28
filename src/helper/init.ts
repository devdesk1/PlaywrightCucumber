const fs = require("fs-extra");

try {
    fs.ensureDir("test-results");
    fs.emptyDir("test-results");
} catch (error) {
    console.log("Folder ---  test-results not created or exists.... " + error);
}