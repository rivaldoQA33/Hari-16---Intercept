describe('Hari 16 - Login OrangeHRM dengan Intercept (Simple)', () => {

  it('Login sukses dengan data valid', () => {
    cy.intercept('POST', '**/auth/*').as('login')
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get("input[name='username']").type('Admin')
    cy.get("input[name='password']").type('admin123')
    cy.get("button[type='submit']").click()

    cy.wait('@login')
    cy.url().should('include', '/dashboard')
  })

  it('Login gagal dengan password salah', () => {
    cy.intercept('POST', '**/auth/*').as('login')
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get("input[name='username']").type('Admin')
    cy.get("input[name='password']").type('salah')
    cy.get("button[type='submit']").click()

    cy.wait('@login')
    cy.contains('Invalid credentials').should('be.visible')
  })

  it('Login gagal dengan username salah', () => {
    cy.intercept('POST', '**/auth/*').as('login')
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get("input[name='username']").type('BukanAdmin')
    cy.get("input[name='password']").type('admin123')
    cy.get("button[type='submit']").click()

    cy.wait('@login')
    cy.contains('Invalid credentials').should('be.visible')
  })

  it('Login gagal jika username kosong', () => {
    cy.intercept('POST', '**/auth/*').as('login')
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get("input[name='password']").type('admin123')
    cy.get("button[type='submit']").click()

    cy.contains('Required').should('be.visible')
  })

  it('Login gagal jika password kosong', () => {
    cy.intercept('POST', '**/auth/*').as('login')
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get("input[name='username']").type('Admin')
    cy.get("button[type='submit']").click()

    cy.contains('Required').should('be.visible')
  })

})