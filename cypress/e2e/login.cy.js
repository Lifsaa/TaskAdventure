describe("User Login", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("logs in successfully and redirects to tasks page", () => {
    cy.get('input[type="text"]').type("yo"); // Username field
    cy.get('input[type="password"]').type("yo"); // Password field
    cy.get('button[type="submit"]').click(); // Log In button

    // Verify token is stored
    cy.window().then((win) => {
      expect(win.localStorage.getItem("token")).to.exist;
    });

    // Ensure redirection
    cy.url().should("include", "/tasks");
    cy.contains("⚔️ Task Adventure").should("be.visible");
  });

  it("rejects incorrect login credentials", () => {
    cy.get('input[type="text"]').type("wronguser");
    cy.get('input[type="password"]').type("wrongpassword");
    cy.get('button[type="submit"]').click();

    // Verify error message
    cy.contains("Invalid credentials").should("be.visible");
  });
});
