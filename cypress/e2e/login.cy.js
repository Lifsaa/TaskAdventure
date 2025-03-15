describe("User Login", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("logs in successfully and redirects to tasks page", () => {
    cy.intercept("POST", "/api/auth/login").as("loginRequest");

    cy.get("input").eq(0).type("sue"); // First input (username)
    cy.get("input").eq(1).type("123"); // Second input (password)
    cy.get('button[type="submit"]').click(); // Click Log In button

    // Wait for login API request to complete
    cy.wait("@loginRequest");

    // Ensure token is stored before proceeding
    cy.window().should((win) => {
      expect(win.localStorage.getItem("token")).to.exist;
    });

    // Wait briefly to allow navigation update
    cy.wait(1000);

    // Ensure redirection to tasks page
    cy.url().should("include", "/tasks");
    cy.contains("⚔️ Task Adventure").should("be.visible");
  });

  it("rejects incorrect login credentials", () => {
    cy.get("input").eq(0).type("wronguser");
    cy.get("input").eq(1).type("wrongpassword");
    cy.get('button[type="submit"]').click();

    // Verify error message appears
    cy.contains("Invalid credentials").should("be.visible");
  });
});
