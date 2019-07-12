module.exports = {
  'Pierre Cardin Smoke Test': browser => {
    browser
      .url('https://www.pierre-cardin.de/herren')
      .waitForElementVisible('iframe[title="Frekkls Launcher"]')
      .click('iframe[title="Frekkls Launcher"]')
      .waitForElementVisible('iframe[title="Frekkls Content"]')
      .execute(function assignIframeIds() {
        document.querySelector('iframe[title="Frekkls Launcher"]').id = 'frekkls-launcher'
        document.querySelector('iframe[title="Frekkls Content"]').id = 'frekkls-content'
      })
      .frame('frekkls-content')
      .assert.containsText('div', 'Lass dich inspirieren!')
      .click('li:nth-child(3)')
      .assert.containsText('div', 'Die Lieblingsprodukte von Nico')
      .end()
  },
}
