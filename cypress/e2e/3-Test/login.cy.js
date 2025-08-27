describe('Quiz 3 - OrangeHRM Login', () => {

  it('Login berhasil dengan username & password valid', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get("input[name='username']").type('Admin')
    cy.get("input[name='password']").type('admin123')
    cy.get("button[type='submit']").click()

    // cek url dashboard muncul
    cy.url().should('include', '/dashboard')
  })

  it('Login gagal dengan password salah', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get("input[name='username']").type('Admin')
    cy.get("input[name='password']").type('salah')
    cy.get("button[type='submit']").click()

    cy.contains('Invalid credentials').should('be.visible')
  })

  it('Login gagal dengan username salah', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get("input[name='username']").type('BukanAdmin')
    cy.get("input[name='password']").type('admin123')
    cy.get("button[type='submit']").click()

    cy.contains('Invalid credentials').should('be.visible')
  })

  it('Login gagal jika username kosong', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get("input[name='password']").type('admin123')
    cy.get("button[type='submit']").click()

    cy.contains('Required').should('be.visible')
  })

  it('Login gagal jika password kosong', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get("input[name='username']").type('Admin')
    cy.get("button[type='submit']").click()

    cy.contains('Required').should('be.visible')
  })

})