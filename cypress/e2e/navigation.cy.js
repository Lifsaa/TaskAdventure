describe("Navigation Tests", () => {
    beforeEach(() => {
      cy.visit("/login");
      cy.get('input[type="text"]').type("sue");
      cy.get('input[type="password"]').type("123");
      cy.get('button[type="submit"]').click();
      cy.wait(1000);
    });
  
    it("navigates to Calendar page", () => {
      cy.get('a[href="/calendar"]').click();
      cy.url().should("include", "/calendar");
      cy.contains("Task Calendar").should("be.visible");
    });
  
    it("navigates to Stats page", () => {
      cy.get('a[href="/stats"]').click();
      cy.url().should("include", "/stats");
      cy.contains("User Stats").should("be.visible");
    });
  
    it("logs out and redirects to login", () => {
      cy.get("button").contains("Log Out").click();
      cy.url().should("include", "/login");
      cy.contains("⚔️ Welcome to Task Adventure").should("be.visible");
    });
  });
  