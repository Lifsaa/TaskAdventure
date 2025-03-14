describe("User Registration", () => {
  it("should register a new user successfully", () => {
    cy.visit("/signup");

    // Fill out the signup form
    cy.get('input[name="username"]').type("newuser_test");
    cy.get('input[name="email"]').type("newuser_test@example.com");
    cy.get('input[name="password"]').type("StrongPassword123");
    cy.get('button[type="submit"]').click();

    // Wait for API response
    cy.wait(1000);

    // Verify token is stored
    cy.window().then((win) => {
      const token = win.localStorage.getItem("token");
      expect(token).to.exist;
    });

    // Ensure redirection to tasks page
    cy.url().should("include", "/tasks");
    cy.contains("Task Page").should("be.visible"); // Adjust to match actual UI text
  });

  it("should show error for existing username or email", () => {
    cy.visit("/signup");

    // Try to register with an existing username/email
    cy.get('input[name="username"]').type("existinguser");
    cy.get('input[name="email"]').type("existing@example.com");
    cy.get('input[name="password"]').type("Password123");
    cy.get('button[type="submit"]').click();

    // Verify error message appears
    cy.contains("Username taken").should("be.visible");
  });
});
