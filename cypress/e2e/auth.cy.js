const fixtureConfig = require("../fixtures/config.fixture.json");
const uiFixture = require("../fixtures/ui.fixture.json");

describe("Validate Authentication Flow", () => {
  it("Validate Authentication Page", () => {
    cy.visit(fixtureConfig["ui-location"]);

    cy.get("button > div > span", {
      timeout: fixtureConfig["ui-timeout"],
    })
      .should("contain.text", "Sign in / Register")
      .click();

    cy.url({ timeout: 30000 }).should(
      "deep.equal",
      `${fixtureConfig["ui-location"]}/authenticate`
    );

    cy.get("div.mantine-Stack-root > div.mantine-InputWrapper-root")
      .eq(0)
      .should("contain.text", "Email");
    cy.get("div.mantine-Stack-root > div.mantine-InputWrapper-root")
      .eq(1)
      .should("contain.text", "Password");

    cy.get("form > div.mantine-Group-root > button.mantine-UnstyledButton-root")
      .should("be.visible")
      .should("contain.text", "Login");
  });

  it("Validate successful login scenario", () => {
    cy.visit(fixtureConfig["ui-location"]);

    cy.get("button > div > span", {
      timeout: fixtureConfig["ui-timeout"],
    })
      .should("contain.text", "Sign in / Register")
      .click();

    cy.url({ timeout: 30000 }).should(
      "deep.equal",
      `${fixtureConfig["ui-location"]}/authenticate`
    );

    cy.get("div.mantine-Stack-root > div.mantine-InputWrapper-root")
      .eq(0)
      .should("contain.text", "Email")
      .type(uiFixture.email);
    cy.get("div.mantine-Stack-root > div.mantine-InputWrapper-root")
      .eq(1)
      .should("contain.text", "Password")
      .type(uiFixture.password);

    cy.get("form > div.mantine-Group-root > button.mantine-UnstyledButton-root")
      .should("be.visible")
      .should("contain.text", "Login")
      .click();

    cy.get("div.mantine-Notification-title", { timeout: 30000 }).should(
      "contain.text",
      uiFixture["success-auth-notification-title"]
    );

    cy.get("div.mantine-Notification-body", { timeout: 30000 }).should(
      "contain.text",
      uiFixture["success-auth-notification-body"]
    );
  });

  it("Validate un-successful login scenario", () => {
    cy.visit(fixtureConfig["ui-location"]);

    cy.get("button > div > span", {
      timeout: fixtureConfig["ui-timeout"],
    })
      .should("contain.text", "Sign in / Register")
      .click();

    cy.url({ timeout: 30000 }).should(
      "deep.equal",
      `${fixtureConfig["ui-location"]}/authenticate`
    );

    cy.get("div.mantine-Stack-root > div.mantine-InputWrapper-root")
      .eq(0)
      .should("contain.text", "Email")
      .type(uiFixture["invalid-email"]);
    cy.get("div.mantine-Stack-root > div.mantine-InputWrapper-root")
      .eq(1)
      .should("contain.text", "Password")
      .type(uiFixture["invalid-password"]);

    cy.get("form > div.mantine-Group-root > button.mantine-UnstyledButton-root")
      .should("be.visible")
      .should("contain.text", "Login")
      .click();

    cy.get("div.mantine-Notification-title", { timeout: 30000 }).should(
      "contain.text",
      uiFixture["error-auth-title"]
    );

    cy.get("div.mantine-Notification-body", { timeout: 30000 }).should(
      "contain.text",
      uiFixture["error-auth-body"]
    );
  });

  it("Validate user cannot pass through further steps that require validation", () => {
    cy.visit(fixtureConfig["ui-location"]);

    cy.get("div.mantine-Group-root > a")
      .contains("Browse Performances")
      .click();

    cy.url({ timeout: 30000 }).should(
      "deep.equal",
      `${fixtureConfig["ui-location"]}/browse-performance`
    );

    cy.get("div.mantine-Grid-col > div.mantine-Paper-root > button")
      .should("be.visible")
      .should("contain.text", "Buy Ticket")
      .first()
      .click();

    cy.url({ timeout: 30000 }).should(
      "deep.equal",
      `${fixtureConfig["ui-location"]}/browse-performance/booking`
    );

    cy.get("div.mantine-Grid-col > button.mantine-UnstyledButton-root")
      .should("be.visible")
      .should("contain.text", "Book Now")
      .click();

    cy.get("div.mantine-Notification-title", { timeout: 30000 }).should(
      "contain.text",
      "Oops !"
    );

    cy.get("div.mantine-Notification-body", { timeout: 30000 }).should(
      "contain.text",
      uiFixture["book-auth-error-body"]
    );
  });
});
