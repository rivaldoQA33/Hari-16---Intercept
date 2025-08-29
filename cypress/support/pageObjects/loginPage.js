class LoginPage {
  // selectors simple biar mudah dibaca
  els = {
    user: "input[name='username']",
    pass: "input[name='password']",
    submit: "button[type='submit']",
    required: ".oxd-input-field-error-message.oxd-input-group__message",
    invalid: ".oxd-alert-content-text"
  }

  visit(baseUrl, path) {
    cy.visit(baseUrl + path)
    cy.get(this.els.user).should('be.visible')
    cy.get(this.els.pass).should('be.visible')
  }

  inputUsername(text) { cy.get(this.els.user).clear().type(text) }
  inputPassword(text) { cy.get(this.els.pass).clear().type(text) }
  clickLoginBtn() { cy.get(this.els.submit).click() }

  // ---- Intercept (optional sesuai soal tambahan)
  interceptLogin() {
    // pakai wildcard supaya gampang kena
    cy.intercept('POST', '**/auth/*').as('loginReq')
  }
  waitLogin() { cy.wait('@loginReq', { timeout: 15000 }) }

  // ---- Assertions
  assertDashboard() {
    cy.url().should('include', '/dashboard')
    cy.contains('h6', 'Dashboard').should('be.visible')
  }
  assertInvalid() {
    cy.contains(this.els.invalid, 'Invalid credentials').should('be.visible')
  }
  assertRequiredUsername() {
    cy.get(this.els.required).first().should('have.text', 'Required')
  }
  assertRequiredPassword() {
    cy.get(this.els.required).last().should('have.text', 'Required')
  }
}

export default new LoginPage()