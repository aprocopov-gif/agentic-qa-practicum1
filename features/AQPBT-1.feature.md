# [Vitaly] Log in — Gherkin (AQPBT-1)

Feature: Log in with email and password to reach the signed-in app

  Registered parents sign in on `/login` with email and password. Successful sign-in opens
  the signed-in app (default `/app` or a `next` route). Failures stay on `/login` with
  **Invalid email or password** when credentials are wrong.

# Happy paths

  Scenario: Successful log-in lands on Dashboard with signed-in shell
    Given I am logged out and on "/login"
    When I enter valid Family A email and password and click "Log in"
    Then I leave "/login" and land on "/app"
    And I see the banner "Dashboard"
    And I see "Log out" in the banner

  Scenario: Log-in with next returns to Friends
    Given I am logged out and on "/login?next=%2Ffriends"
    When I enter valid Family A email and password and click "Log in"
    Then I land on "/friends"
    And I see the banner "Friends"

  Scenario: Log out from the signed-in banner returns to the log-in form
    Given I am signed in as Family A in an isolated browser context
    When I click "Log out" in the app banner
    Then I am on "/login"
    And I see the heading "Welcome back"
    And I see "Email", "Password", and "Log in"

  Scenario: Marketing Log in opens the log-in screen
    Given I am logged out and on "/"
    When I click the link "Log in"
    Then I am on "/login"
    And I see the heading "Welcome back"

  Scenario: Forgot password exit path returns to log-in without sending reset
    Given I am logged out and on "/login"
    When I click "Forgot password?"
    Then I am on "/forgot-password"
    And I see "Reset your password"
    When I click "← Back to log in"
    Then I am on "/login" again
    And I have not clicked "Send reset link"

# Negative

  Scenario: Incorrect password shows inline auth error
    Given I am logged out and on "/login"
    When I enter valid Family A email and an incorrect password and click "Log in"
    Then I remain on "/login"
    And I see "Invalid email or password"

  Scenario: Unregistered email shows the same inline auth error
    Given I am logged out and on "/login"
    When I enter an email that is not registered and any password and click "Log in"
    Then I remain on "/login"
    And I see "Invalid email or password"

# Edge cases

  Scenario: Empty email and password do not show auth failure message
    Given I am logged out and on "/login"
    When I click "Log in" without filling "Email" and "Password"
    Then I remain on "/login"
    And I do not see "Invalid email or password"

  Scenario: Unauthenticated deep link to Dashboard redirects to log-in
    Given I am logged out
    When I open "/app"
    Then I am taken to "/login"
    And I see "Welcome back", "Email", "Password", and "Log in"

  Scenario: Already signed in user still sees the log-in form on /login
    Given I am signed in as Family A in an isolated browser context
    When I open "/login"
    Then I see the heading "Welcome back"
    And I see "Email", "Password", and "Log in"

  Scenario: Sign up link preserves next when arriving from login with return URL
    Given I am logged out and on "/login?next=%2Ffriends"
    Then the "Sign up" link includes "next=%2Ffriends"

<!--
Ambiguities / gaps (Jira out of scope + Confluence open questions):
- Exact HTML5 validation messages for empty or malformed Email (AC5 only excludes Invalid email or password).
- Whether /login ever auto-redirects when a session already exists (E3 documents observed: form still shown).
- Account lockout, rate limiting, or distinct “email not confirmed” vs Invalid email or password.
- Family B log-in with real second-family credentials (story: not validated).
- Loading/disabled state on Log in during submit.
- Sign up, Send reset link submit, and email delivery are out of scope for this feature file.
-->
