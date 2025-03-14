describe("User Login", () => {
    it("logs in successfully and accesses protected routes", () => {
      cy.visit("/login");
  
      // Fill out login form
      cy.get('input[name="username"]').type("sue");
      cy.get('input[name="password"]').type("123");
      cy.get('button[type="submit"]').click();
  
      // Wait for API response
      cy.wait(1000);
  
      // Verify token is stored in localStorage
      cy.window().then((win) => {
        const token = win.localStorage.getItem("token");
        expect(token).to.exist;
      });
  
      // Check redirection to tasks page
      cy.url().should("include", "/tasks");
      cy.contains("Task Page").should("be.visible");
    });
  
    it("rejects incorrect login credentials", () => {
      cy.visit("/login");
  
      // Enter wrong credentials
      cy.get('input[name="username"]').type("wronguser");
      cy.get('input[name="password"]').type("wrongpassword");
      cy.get('button[type="submit"]').click();
  
      // Verify error message appears
      cy.contains("Invalid credentials").should("be.visible");
    });
  });
  