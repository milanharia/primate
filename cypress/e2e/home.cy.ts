// In practice data would come from an API and be mocked
// using a fixture. Since I am not calling an API I can
// safely assume the same data is returned from the app

describe("Home - Search Bar", () => {
  beforeEach(() => {
    cy.visit("/home");
  });

  it("displays the search bar", () => {
    cy.get("[data-cy=home-search-bar]").should("exist");
    cy.wait(2000);
    cy.get("[data-cy=home-search-bar]").type("Primate Project");
    cy.contains("Primate Project #1");
    cy.contains("Primate Project #2");
    cy.contains("Primate Project #3");
    cy.contains("Primate Project #4");
    cy.get("[data-cy=home-search-bar]").type(" #1");
    cy.contains("Primate Project #1");
    cy.contains("Primate Project #2").should("not.exist");
    cy.contains("Primate Project #3").should("not.exist");
    cy.contains("Primate Project #4").should("not.exist");
  });
  it("shows correct auto suggestions", () => {
    cy.wait(2000);
    cy.get("[data-cy=home-search-bar]").type("Primate Project");
    cy.contains("Primate Project #1");
    cy.contains("Primate Project #2");
    cy.contains("Primate Project #3");
    cy.contains("Primate Project #4");
    cy.get("[data-cy=home-search-bar]").type(" #1");
    cy.contains("Primate Project #1");
    cy.contains("Primate Project #2").should("not.exist");
    cy.contains("Primate Project #3").should("not.exist");
    cy.contains("Primate Project #4").should("not.exist");
  });
  it("launches the details modal when a suggestion is tapped", () => {
    cy.wait(2000);
    cy.get("[data-cy=home-search-bar]").type("Primate Project #1");
    cy.contains("Primate Project #1").click();
    cy.contains("Primate Project #1");
    cy.contains("Indonesia");
    cy.get("[data-cy=filter-chip-safety]").should("exist");
    cy.get("[data-cy=filter-chip-info]").should("exist");
    cy.get("[data-cy=filter-chip-sightings]").should("exist");
  });
});

describe("Home - Map", () => {
  beforeEach(() => {
    cy.visit("/home");
  });

  it("displays the search bar", () => {
    cy.get("[data-cy=home-search-bar]").should("exist");
  });

  it("displays the filters", () => {
    cy.contains("All Sites");
    cy.contains("Favourites");
    cy.contains("I've Been");
  });

  it("displays the correct pins", () => {
    cy.wait(2000); // If we mocked this using fixtures we would not need arbitrary wait
    cy.get("[data-cy=map-pin]").should("have.length", 4);
    cy.contains("Favourites").click({ force: true });
    cy.get("[data-cy=map-pin]").should("have.length", 1);
    cy.contains("I've Been");
    cy.get("[data-cy=map-pin]").should("not.have.length");
  });

  it("shows bottom displaying primate information when a pin is tapped", () => {
    cy.wait(2000); // If we mocked this using fixtures we would not need arbitrary wait
    cy.get("[data-cy=map-pin]").first().click({ force: true });
    cy.contains("Primate Project #1");
    cy.contains("Indonesia");
  });
});

describe("Home - List", () => {
  beforeEach(() => {
    cy.visit("/home");
    cy.get("[data-cy=list-btn]").click();
  });

  it("displays the search bar", () => {
    cy.get("[data-cy=home-search-bar]").should("exist");
  });

  it("displays the filters", () => {
    cy.contains("All Sites");
    cy.contains("Favourites");
    cy.contains("I've Been");
  });

  it("should display the correct cards", () => {
    cy.wait(2000);
    cy.get("[data-cy=site-card]").should("have.length", 4);
    cy.contains("Favourites").click({ force: true });
    cy.get("[data-cy=site-card]").should("have.length", 1);
    cy.contains("I've Been");
    cy.get("[data-cy=site-card]").should("not.have.length");
  });

  it("should allow a site to be favourited from the card", () => {
    cy.wait(2000);
    cy.get("[data-cy=site-2-card-fav-btn]").click();
    cy.contains("Favourites").click({ force: true });
    cy.get("[data-cy=site-card]").should("have.length", 2);
  });

  it("should display the information modal when a card is tapped", () => {
    cy.wait(2000);
    cy.get("[data-cy=site-card]").last().click();
    cy.contains("Primate Project #4");
    cy.contains("Indonesia");

    // Safety Filter
    cy.contains("Safety");
    cy.contains("KEY SAFETY ADVICE");
    cy.contains("MORE INFORMATION");

    // Project Info Filter
    cy.get("[data-cy=filter-chip-info]").click({ force: true });
    cy.contains("PROJECT OVERVIEW");
    cy.contains(
      "Project description text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis eget gravida cursus sit volutpat nam enim duis sem. Dignissim aliquam ultrices risus malesuada nunc sem ante convallis diam. Maecenas neque in odio dolor proin enim euismod. Nisi, porttitor tristique suspendisse vestibulum."
    );
    cy.contains("GUIDES");

    // Sightings Filter
    cy.get("[data-cy=filter-chip-sightings]").click({ force: true });
    cy.contains("MY SIGHTINGS");
    cy.contains("RECENT SIGHTINGS");
  });

  it("should allow a site to be favourited from the modal", () => {
    cy.wait(2000);
    cy.get("[data-cy=site-card]").last().click();
    cy.get("[data-cy=fav-btn]").click();
    cy.get("[data-cy=details-close-btn]").click();
    cy.contains("Favourites").click({ force: true });
    cy.get("[data-cy=site-card]").should("have.length", 2);
  });

  it("should allow a site to be marked as seen from the modal", () => {
    cy.wait(2000);
    cy.get("[data-cy=site-card]").last().click();
    cy.get("[data-cy=been-btn]").click();
    cy.get("[data-cy=details-close-btn]").click();
    cy.contains("I've Been").click({ force: true });
    cy.get("[data-cy=site-card]").should("have.length", 1);
  });
});
