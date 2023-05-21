describe("Menu", () => {
  beforeEach(() => {
    cy.visit("/home");
    cy.get("ion-menu-button").click();
  });

  it("should be accessilbe from the home page", () => {
    cy.get("ion-menu").should("have.class", "show-menu");
  });
  it("should contain all the required links", () => {
    cy.contains("Home");
    cy.contains("Primate Info");
    cy.contains("Primates Guide");
    cy.contains("My Sightings");
    cy.contains("My Account");
    cy.contains("Feedback");
    cy.contains("Language");
  });

  // Added waits as a temporary workaround for menu animation to complete
  it("should dismiss the menu when the close button is clicked", () => {
    cy.wait(500);
    cy.get("[data-cy=menu-close-btn]").click({ force: true });
    cy.get("ion-menu").should("not.have.class", "show-menu");
  });

  it("should dismiss the menu when a menu button is clicked", () => {
    cy.wait(500);
    cy.contains("Home").click({ force: true });
    cy.url().should("include", "/home");
    cy.get("ion-menu").should("not.have.class", "show-menu");
  });
});
