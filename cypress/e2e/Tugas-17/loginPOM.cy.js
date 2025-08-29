import loginPage from '../../support/pageObjects/loginPage'

describe('Scenario Verifikasi Fungsi Login (POM OrangeHRM)', () => {
  let data

  before(() => {
    cy.fixture('loginData').then(d => { data = d })
  })

  it('TC001 - Login dengan username & password valid', () => {
    loginPage.visit(data.baseUrl, data.path)

    loginPage.inputUsername(data.valid.username)
    loginPage.inputPassword(data.valid.password)

    loginPage.interceptLogin()
    loginPage.clickLoginBtn()

    // tunggu network login (kalau ada)
    loginPage.waitLogin()
    loginPage.assertDashboard()

    // logout supaya case lain bersih
    cy.get('.oxd-userdropdown').click()
    cy.contains('a.oxd-userdropdown-link', 'Logout').click()
    cy.url().should('include', '/auth/login')
  })

  it('TC002 - Password salah → muncul Invalid credentials', () => {
    loginPage.visit(data.baseUrl, data.path)

    loginPage.inputUsername(data.wrongPass.username)
    loginPage.inputPassword(data.wrongPass.password)

    loginPage.interceptLogin()
    loginPage.clickLoginBtn()
    loginPage.waitLogin()

    loginPage.assertInvalid()
  })

  it('TC003 - Username salah → muncul Invalid credentials', () => {
    loginPage.visit(data.baseUrl, data.path)

    loginPage.inputUsername(data.wrongUser.username)
    loginPage.inputPassword(data.wrongUser.password)

    loginPage.interceptLogin()
    loginPage.clickLoginBtn()
    loginPage.waitLogin()

    loginPage.assertInvalid()
  })

  it('TC004 - Username kosong → muncul Required', () => {
    loginPage.visit(data.baseUrl, data.path)

    loginPage.inputPassword(data.valid.password)
    // validasi form biasanya client-side → tidak perlu wait intercept
    loginPage.clickLoginBtn()

    loginPage.assertRequiredUsername()
  })

  it('TC005 - Password kosong → muncul Required', () => {
    loginPage.visit(data.baseUrl, data.path)

    loginPage.inputUsername(data.valid.username)
    loginPage.clickLoginBtn()

    loginPage.assertRequiredPassword()
  })
})