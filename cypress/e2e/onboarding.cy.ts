const assertCorrectActiveBullet = (activeBullet: number) => {
  for (let i = 1; i < 5; i++) {
    cy.get(`[data-cy=bullet-${i}]`).should(
      "have.class",
      i === activeBullet ? "bg-primary" : "bg-white"
    );
  }
};

describe("Onboarding", () => {
  it("Redirects you to the correct route", () => {
    cy.visit("/");
    cy.url().should("include", "/onboarding");
  });
  it("Allows the user to complete the onboarding journey", () => {
    cy.visit("/");
    cy.contains("Welcome to Primate");
    cy.get("[data-cy=prev-btn]").should("not.exist");
    cy.get("[data-cy=next-btn]").should("exist").and("contain.text", "Next");
    assertCorrectActiveBullet(1);

    cy.get("[data-cy=next-btn]").click();
    cy.contains("Promoting ethical primate tourism");
    cy.get("[data-cy=prev-btn]").should("exist").and("contain.text", "Back");
    cy.get("[data-cy=next-btn]").should("exist").and("contain.text", "Next");
    assertCorrectActiveBullet(2);

    cy.get("[data-cy=next-btn]").click();
    cy.contains("Helping you and primates stay safe");
    cy.get("[data-cy=prev-btn]").should("exist").and("contain.text", "Back");
    cy.get("[data-cy=next-btn]").should("exist").and("contain.text", "Next");
    assertCorrectActiveBullet(3);

    cy.get("[data-cy=next-btn]").click();
    cy.contains("Let’s get exploring!");
    cy.get("[data-cy=prev-btn]").should("exist").and("contain.text", "Back");
    cy.get("[data-cy=next-btn]").should("exist").and("contain.text", "Explore");
    assertCorrectActiveBullet(4);

    cy.get("[data-cy=next-btn]").click();
    cy.url().should("contain", "/home");
  });
});
