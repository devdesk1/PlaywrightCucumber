const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "test-results",
  reportPath: "./",
  reportName: "Cucumber Playwright Automation Report",
  pageTitle: "Bookcart Application Test Report",
  displayDuration: true,
  metadata: {
    browser: {
      name: "chrome",
      version: "124",
    },
    device: "Local test machine",
    platform: {
      name: "Windows",
      version: "11",
    },
  },
  customData: {
    title: "Run info",
    data: [
      { label: "Project", value: "Custom project" },
      { label: "Release", value: "1.2.3" },
      { label: "Jira Cycle", value: "10.01" }
    ],
  },
});
