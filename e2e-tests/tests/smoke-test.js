module.exports = {
  'www.pierre-cardin.de': browser => {
    browser
      .url('https://www.pierre-cardin.de/')
      .waitForElementVisible('iframe[title="Frekkls Launcher"]')
      .click('iframe[title="Frekkls Launcher"]')
      .waitForElementVisible('iframe[title="Frekkls Content"]')
      .end()
  },
  'timeblock-europe.com': browser => {
    // if we don't have visit home first, the website redirects us to /en
    browser
      .url('https://timeblock-europe.com/')
      .url('https://timeblock-europe.com/de/produkt/timeblock-monatsabo/')
      .waitForElementVisible('iframe[title="Frekkls Launcher"]')
      .click('iframe[title="Frekkls Launcher"]')
      .waitForElementVisible('iframe[title="Frekkls Content"]')
      .end()
  },
  'tontonetfils.fr': browser => {
    browser
      .url('https://tontonetfils.fr/')
      .waitForElementVisible('iframe[title="Frekkls Launcher"]')
      .click('iframe[title="Frekkls Launcher"]')
      .waitForElementVisible('iframe[title="Frekkls Content"]')
      .end()
  },
  'villadonatello.com': browser => {
    browser
      .url('https://villadonatello.com/')
      .waitForElementVisible('iframe[title="Frekkls Launcher"]')
      .click('iframe[title="Frekkls Launcher"]')
      .waitForElementVisible('iframe[title="Frekkls Content"]')
      .end()
  },
  'www.baldessarini.com': browser => {
    browser
      .url('https://www.baldessarini.com/de/')
      .waitForElementVisible('iframe[title="Frekkls Launcher"]')
      .click('iframe[title="Frekkls Launcher"]')
      .waitForElementVisible('iframe[title="Frekkls Content"]')
      .end()
  },
  'www.shopinfo.com.br': browser => {
    browser
      .url('https://www.shopinfo.com.br/')
      .waitForElementVisible('iframe[title="Frekkls Launcher"]')
      .click('iframe[title="Frekkls Launcher"]')
      .waitForElementVisible('iframe[title="Frekkls Content"]')
      .end()
  },
  'www.buttwrap.com': browser => {
    browser
      .url('https://www.buttwrap.com/')
      .click('.eg-cc-dismiss')
      .waitForElementNotVisible('.eg-cc-banner')
      .waitForElementVisible('iframe[title="Frekkls Launcher"]')
      .click('iframe[title="Frekkls Launcher"]')
      .waitForElementVisible('iframe[title="Frekkls Content"]')
      .end()
  },
  'www.delius-contract.de': browser => {
    browser
      .url('https://www.delius-contract.de/de/')
      .waitForElementVisible('iframe[title="Frekkls Launcher"]')
      .click('iframe[title="Frekkls Launcher"]')
      .waitForElementVisible('iframe[title="Frekkls Content"]')
      .end()
  },
  'www.exitwell.com': browser => {
    browser
      .url('https://www.exitwell.com/')
      .waitForElementVisible('iframe[title="Frekkls Launcher"]')
      .click('iframe[title="Frekkls Launcher"]')
      .waitForElementVisible('iframe[title="Frekkls Content"]')
      .end()
  },
  'www.impressorajato.com.br': browser => {
    browser
      .url('https://www.impressorajato.com.br/impressora-multifuncional-brother-5652-dcp-l5652dn-laser-mono')
      .waitForElementVisible('iframe[title="Frekkls Launcher"]')
      .click('iframe[title="Frekkls Launcher"]')
      .waitForElementVisible('iframe[title="Frekkls Content"]')
      .end()
  },
  'www.pampling.com': browser => {
    browser
      .url('https://www.pampling.com/#trnd:path:/simple-chat/297,persona:222')
      .waitForElementVisible('iframe[title="Frekkls Launcher"]')
      .click('iframe[title="Frekkls Launcher"]')
      .waitForElementVisible('iframe[title="Frekkls Content"]')
      .end()
  },
  'www.pionier-workwear.com': browser => {
    browser
      .url(
        'https://www.pionier-workwear.com/index.php?sxx_page=online.shop.products.details&sxx_call[b18bf8141a][IID]=5368'
      )
      .waitForElementVisible('iframe[title="Frekkls Launcher"]')
      .click('iframe[title="Frekkls Launcher"]')
      .waitForElementVisible('iframe[title="Frekkls Content"]')
      .end()
  },
}
