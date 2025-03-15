describe("Navigation Tests", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get("input").eq(0).type("sue");
    cy.get("input").eq(1).type("123");
    cy.get('button[type="submit"]').click();

    // Ensure login is successful
    cy.window().should((win) => {
      expect(win.localStorage.getItem("token")).to.exist;
    });

    cy.wait(1000);
  });

  it("navigates to Tasks page", () => {
    cy.get("button.MuiIconButton-root").first().click(); // Open menu

    cy.get('a[href="/tasks"]').should("be.visible").click();
    cy.url().should("include", "/tasks");
    cy.contains("⚔️ Task Adventure").should("be.visible");
  });

  it("navigates to Calendar page", () => {
    cy.get("button.MuiIconButton-root").first().click(); // Open menu

    cy.get('a[href="/calendar"]').should("be.visible").click();

    cy.url().should("include", "/calendar");
    cy.contains("Task Calendar").should("be.visible");
  });

  it("navigates to Stats page", () => {
    cy.get("button.MuiIconButton-root").first().click(); // Open menu

    cy.get('a[href="/stats"]').should("be.visible").click();

    cy.url().should("include", "/stats");
    cy.contains("User Stats").should("be.visible");
  });

  it("navigates to User Info page", () => {
    cy.get("button.MuiIconButton-root").first().click(); // Open menu

    cy.get('a[href="/userinfo"]').should("be.visible").click();
    cy.url().should("include", "/userinfo");
    cy.contains("User Info").should("be.visible");
  });

  it("navigates to Contact Us page", () => {
    cy.get("button.MuiIconButton-root").first().click(); // Open menu

    cy.get('a[href="/contact"]').should("be.visible").click();
    cy.url().should("include", "/contact");
    cy.contains("Contact Us").should("be.visible");
  });

  it("logs out and redirects to login", () => {
    cy.get("button.MuiIconButton-root").first().click(); // Open menu

    // Use {force: true} to click the Log Out button, even if it's covered by a modal
    cy.contains("Log Out").click({ force: true });

    cy.window().should((win) => {
      expect(win.localStorage.getItem("token")).to.be.null;
    });

    cy.url().should("include", "/login");
    cy.contains("⚔️ Welcome to Task Adventure").should("be.visible");
  });
});
