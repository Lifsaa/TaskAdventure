describe("Protected Routes", () => {
  beforeEach(() => {
    cy.clearLocalStorage(); // Ensure clean state before each test
  });

  it("redirects unauthenticated users to login", () => {
    cy.visit("/tasks"); // Try accessing protected route without login
    cy.url().should("include", "/login"); // Should redirect to login
  });

  it("allows authenticated users to access protected routes", () => {
    cy.intercept("POST", "**/api/auth/login").as("loginRequest");

    // Log in first
    cy.visit("/login");
    cy.get('input[type="text"]').type("sue");
    cy.get('input[type="password"]').type("123");
    cy.get('button[type="submit"]').click();

    // Wait for login API response
    cy.wait("@loginRequest");

    // Ensure token is stored before proceeding
    cy.window().should((win) => {
      expect(win.localStorage.getItem("token")).to.exist;
    });

    // Visit a protected route
    cy.visit("/tasks");
    cy.contains("⚔️ Task Adventure").should("be.visible");
  });
});
