describe("User Signup", () => {
  beforeEach(() => {
    cy.visit("/signup");
  });

  it("signs up successfully and redirects to tasks", () => {
    cy.get('input[type="email"]').type("newuser_cp@example.com");
    cy.get('input[type="text"]').type("newuser_cp");
    cy.get('input[type="password"]').eq(0).type("Password123!");
    cy.get('input[type="password"]').eq(1).type("Password123!");

    cy.get('button[type="submit"]').click();

    // Verify token is stored
    cy.window().then((win) => {
      expect(win.localStorage.getItem("token")).to.exist;
    });

    cy.url().should("include", "/tasks");
    cy.contains("⚔️ Task Adventure").should("be.visible");
  });

  it("shows error when passwords do not match", () => {
    cy.get('input[type="password"]').eq(0).type("Password123!");
    cy.get('input[type="password"]').eq(1).type("WrongPassword");

    cy.get('button[type="submit"]').click();
    cy.contains("Passwords do not match").should("be.visible");
  });
});
