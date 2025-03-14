describe("Protected Routes", () => {
  it("redirects unauthenticated users to login", () => {
    cy.visit("/tasks");
    cy.url().should("include", "/login");
  });

  it("allows authenticated users to access protected routes", () => {
    cy.visit("/login");
    cy.get('input[type="text"]').type("sue");
    cy.get('input[type="password"]').type("123");
    cy.get('button[type="submit"]').click();
    cy.wait(1000);

    cy.visit("/tasks");
    cy.contains("⚔️ Task Adventure").should("be.visible");
  });
});
