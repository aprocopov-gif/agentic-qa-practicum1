# [Anna] Playdates: pending requests (Accept / Decline / cancel) — AQPBT-10

Feature: Playdates: pending requests (Accept / Decline / cancel): see pending requests while waiting for the other parent to approve

  Signed-in parents with a set-up family (Lev Test / The Gorfels) open Playdates and see
  Pending requests next to Upcoming and Past. Page copy states the other parent must approve
  before a playdate is confirmed. Creating a live pending row is out of scope.

# Happy paths

  Scenario: Playdates shows Find a playdate intro and Pending requests
    Given I am logged in as Family A with a completed dashboard
    When I open "/playdates"
    Then I see heading "Find a playdate"
    And I see "Pick a family, choose a matched slot or propose a manual time, then wait for the other parent to approve."
    And I see "Pending requests"

  Scenario: Empty Pending requests shows count 0 and empty copy
    Given I am logged in as Family A with a completed dashboard
    And I am on "/playdates" with no pending playdates
    When I view "Pending requests"
    Then I see count "0"
    And I see "No pending requests."

  Scenario: Find a playdate route shows the same empty Pending requests
    Given I am logged in as Family A with a completed dashboard
    When I open "/playdates/new"
    Then I see "Pending requests"
    And I see count "0"
    And I see "No pending requests."

# Negative

  Scenario: Family B gate hides Pending requests
    Given I am logged in as Family B (Anna Procopov) without a set-up dashboard
    When I open "/playdates"
    Then I see "Set up your family on the Dashboard before planning playdates."
    And I do not see "Pending requests"
    And I do not see "No pending requests."

  Scenario: Cancelled Past rows have no Accept, Decline, or cancel
    Given I am logged in as Family A with a completed dashboard
    And I am on "/playdates" with only cancelled history
    When I view "Past"
    Then I see status "Cancelled" on those rows
    And I do not see Accept, Decline, or cancel on those rows

# Edge cases

  Scenario: Empty Upcoming is still shown next to empty Pending requests
    Given I am logged in as Family A with a completed dashboard
    When I open "/playdates"
    Then I see "Pending requests" with "No pending requests."
    And I see "Upcoming" with "No upcoming playdates yet."

  Scenario: Banner Notifications shows no pending inbox
    Given I am logged in as Family A with a completed dashboard
    And I am on "/playdates"
    When I click "Notifications"
    Then I see "No new notifications"

<!--
Ambiguities / gaps (Jira out of scope + Confluence open questions):
- What a pending row looks like when the count is greater than zero (family name, time, children, status badge).
- Exact buttons on an incoming request vs a request I sent — Feature map names Accept, Decline, and cancel; not shown this session.
- What happens on screen after Accept, Decline, or cancel (list move, count change, toast, Upcoming / Past).
- Error copy if respond/cancel fails.
- Both parents acting on the same pending request at once.
- Whether banner Notifications ever lists a pending playdate, or only No new notifications.
- Whether Family B ever sees Pending requests before Dashboard setup and email confirm.
- Clicking Send request or creating a real pending playdate (out of scope).
-->
