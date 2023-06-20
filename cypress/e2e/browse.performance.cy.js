const fixtureConfig = require("../fixtures/config.fixture.json");

describe("Validate Browse Performances Screen", () => {
  it("Visible Search Bar visibility in new route location", () => {
    cy.visit(fixtureConfig["ui-location"]);

    cy.get("div.mantine-Group-root > a")
      .contains("Browse Performances")
      .click();
    cy.url({ timeout: 30000 }).should(
      "deep.equal",
      `${fixtureConfig["ui-location"]}/browse-performance`
    );

    cy.get("input")
      .invoke("attr", "placeholder")
      .should("eq", "Search Performance");

    cy.get("input[placeholder='Search Performance']").should("be.visible");
  });

  it("Visibility of Performance lists and interactive Buy Ticket Button", () => {
    cy.visit(fixtureConfig["ui-location"]);

    cy.get("div.mantine-Group-root > a")
      .contains("Browse Performances")
      .click();
    cy.url({ timeout: 30000 }).should(
      "deep.equal",
      `${fixtureConfig["ui-location"]}/browse-performance`
    );

    cy.get("div.mantine-Grid-col > div.mantine-Paper-root > button").should(
      "be.visible"
    );

    cy.get("div.mantine-Grid-col > div.mantine-Paper-root > button")
      .should("be.visible")
      .should("contain.text", "Buy Ticket");
  });
});
