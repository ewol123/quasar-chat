module.exports = {
  "index test": function(browser) {
    browser
      .url("http://localhost:8081/")
      .waitForElementVisible("body", 1000)
      .assert.containsText("body", "let's go")
      .end();
  }
};
