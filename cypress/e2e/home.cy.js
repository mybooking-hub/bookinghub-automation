const fixtureConfig = require("../fixtures/config.fixture.json");
const uiFixture = require("../fixtures/ui.fixture.json");

describe("Verify Home Page", () => {
  it("Should display home page", () => {
    cy.visit(fixtureConfig["ui-location"]);

    cy.get("h1", { timeout: fixtureConfig["ui-timeout"] }).contains(
      uiFixture["h-hero-text"]
    );

    cy.get("button > div > span", {
      timeout: fixtureConfig["ui-timeout"],
    }).should("contain.text", "Sign in / Register");

    cy.get("button > div > span", { timeout: fixtureConfig["ui-timeout"] })
      .should("be.visible")
      .should("contain.text", "Get started");

    // cy.screenshot("Home");
  });

  it("Should contains all the menu items", () => {
    cy.visit(fixtureConfig["ui-location"]);

    cy.get("div.mantine-Group-root > a").should("contain.text", "Home");
    cy.get("div.mantine-Group-root > a").should(
      "contain.text",
      "Browse Performances"
    );
    cy.get("div.mantine-Group-root > a").should(
      "contain.text",
      "About MyBookingHub"
    );
  });

  it("Should rederict to respective pages by menus", () => {
    cy.visit(fixtureConfig["ui-location"]);

    cy.get("div.mantine-Group-root > a")
      .contains("Browse Performances")
      .click();
    cy.url({ timeout: 30000 }).should(
      "deep.equal",
      `${fixtureConfig["ui-location"]}/browse-performance`
    );
    cy.get("div.mantine-Group-root > a").contains("Home").click();
    cy.url({ timeout: 30000 }).should(
      "deep.equal",
      `${fixtureConfig["ui-location"]}/`
    );
  });
});
