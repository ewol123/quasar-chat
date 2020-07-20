module.exports = {
  "index test": function(browser) {
    browser
      .url(`http://localhost:${process.env.BROWSERSTACK_PORT || 8081}/`)
      .waitForElementVisible("body", 1000)
      .assert.containsText("body", "Welcome, please enter your user details")
      .assert.visible("input[aria-label=Name]")
      .setValue("input[aria-label=Name]", "browserstack")
      .assert.visible("#go-btn")
      .click("#go-btn")
      .assert.containsText("#main-text1", "No active users")
      .assert.visible("#main-btn-video")
      .click("#main-btn-video")
      .assert.containsText("#index-text1", "Type in your room number and click")
      .end();
  }
};
