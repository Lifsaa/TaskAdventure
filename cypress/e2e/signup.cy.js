describe("User Signup", () => {
  let uniqueUser;

  beforeEach(() => {
    const timestamp = Date.now() + Math.floor(Math.random() * 10000);
    uniqueUser = {
      email: `testuser_${timestamp}@example.com`,
      username: `testuser_${timestamp}`,
      password: "Password123!",
    };

    // Intercept Signup API request
    cy.intercept("POST", `${Cypress.env("apiUrl")}/auth/signup`).as(
      "signupRequest",
    );

    cy.visit("/signup");
  });

  it("signs up successfully and redirects to tasks", () => {
    cy.get('input[type="email"]').type(uniqueUser.email);
    cy.get('input[type="text"]').type(uniqueUser.username);
    cy.get('input[type="password"]').eq(0).type(uniqueUser.password);
    cy.get('input[type="password"]').eq(1).type(uniqueUser.password);

    cy.get('button[type="submit"]').click();

    // Wait for signup API request to complete
    cy.wait("@signupRequest");

    // Ensure token is stored before proceeding
    cy.window().should((win) => {
      expect(win.localStorage.getItem("token")).to.exist;
    });

    // Wait briefly to allow navigation update
    cy.wait(1000);

    cy.url().should("include", "/tasks");
    cy.contains("⚔️ Task Adventure").should("be.visible");
  });
});
