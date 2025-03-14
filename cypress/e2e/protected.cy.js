describe("Protected Routes", () => {
    it("redirects unauthenticated users to login", () => {
      cy.visit("/tasks"); // Try accessing protected page
      cy.url().should("include", "/login"); // Ensure user is redirected
    });
  
    it("allows authenticated users to access protected routes", () => {
      cy.visit("/login");
  
      // Perform login
      cy.get('input[name="username"]').type("sue");
      cy.get('input[name="password"]').type("123");
      cy.get('button[type="submit"]').click();
  
      cy.wait(1000); // Ensure token is stored
  
      // Visit protected route after login
      cy.visit("/tasks");
      cy.contains("Task Page").should("be.visible");
    });
  });
  