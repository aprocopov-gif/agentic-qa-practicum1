# [Anna] Playdates: upcoming and past lists — AQPBT-11

Feature: Playdates: upcoming and past lists: review upcoming and past playdates

  Signed-in parents with a set-up family (Lev Test / The Gorfels) open Playdates and see
  Upcoming and Past. When nothing is coming up, Upcoming is empty. Past lists cancelled
  playdates with the other family. Creating a real upcoming playdate is out of scope.

# Happy paths

  Scenario: Playdates shows Find a playdate, Upcoming, and Past
    Given I am logged in as Family A with a completed dashboard
    When I open "/playdates"
    Then I see heading "Find a playdate"
    And I see "Upcoming"
    And I see "Past"

  Scenario: Empty Upcoming shows count 0 and empty copy
    Given I am logged in as Family A with a completed dashboard
    And I am on "/playdates" with no upcoming playdates
    When I view "Upcoming"
    Then I see count "0"
    And I see "No upcoming playdates yet."

  Scenario: Past lists cancelled rows with family, date, child, and status
    Given I am logged in as Family A with a completed dashboard
    And I am on "/playdates" with cancelled history
    When I view "Past"
    Then I see count "6"
    And I see "The Nguyens", "Fri, Oct 16, 3:00 PM · AQP10-1791427751097 park", "Mia", and status "Cancelled"

  Scenario: Find a playdate route shows the same Upcoming and Past
    Given I am logged in as Family A with a completed dashboard
    When I open "/playdates/new"
    Then I see "Upcoming" count "0" and "No upcoming playdates yet."
    And I see the same Past rows as on "/playdates"

# Negative

  Scenario: Family B gate on Playdates hides Upcoming and Past
    Given I am logged in as Family B (Anna Procopov) without a set-up dashboard
    When I open "/playdates"
    Then I see "Set up your family on the Dashboard before planning playdates."
    And I do not see "Upcoming"
    And I do not see "No upcoming playdates yet."
    And I do not see "Past"

  Scenario: Family B gate on Find a playdate hides Upcoming and Past
    Given I am logged in as Family B (Anna Procopov) without a set-up dashboard
    When I open "/playdates/new"
    Then I see "Set up your family on the Dashboard before planning playdates."
    And I do not see "Upcoming"
    And I do not see "Past"

  Scenario: Clicking a Cancelled Past row stays on Playdates without actions
    Given I am logged in as Family A with a completed dashboard
    And I am on "/playdates" looking at a Cancelled past row
    When I click that row
    Then I stay on "/playdates"
    And I do not see Accept, Decline, cancel, "Google", or "ICS" on that row

# Edge cases

  Scenario: Past row can include a place after a middle dot
    Given I am logged in as Family A with a completed dashboard
    And I am on "/playdates"
    When I view the Past row dated "Thu, Oct 15, 3:00 PM · Probe-1791427114355 Thornhill Green park"
    Then I see "Maria"
    And I see status "Cancelled"

  Scenario: Past includes the Oct 9 cancelled probe row
    Given I am logged in as Family A with a completed dashboard
    When I open "/playdates"
    Then I see a Cancelled Past row for "The Nguyens" at "Fri, Oct 9, 3:00 PM · cleanup-verify-1791433121747 park"

  Scenario: Dashboard View all opens Playdates lists
    Given I am logged in as Family A with a completed dashboard
    And I am on "/app"
    When I click "View all"
    Then I am on "/playdates"
    And I see "Upcoming" and "Past"

  Scenario: Past rows appear newest-first
    Given I am logged in as Family A with a completed dashboard
    When I open "/playdates"
    Then I see "Fri, Oct 16, 3:00 PM · AQP10-1791427751097 park" above "Thu, Oct 15, 3:00 PM · Probe-1791427114355 Thornhill Green park"
    And I see "Thu, Oct 15, 3:00 PM · Probe-1791427114355 Thornhill Green park" above "Sun, Oct 11, 10:00 AM · McpAQP910-1791432738775 park"

<!--
Ambiguities / gaps (Jira out of scope + Confluence open questions):
- What Upcoming looks like when the count is greater than zero (fields, status, Google / ICS).
- Statuses besides Cancelled on Past (completed or confirmed).
- When a playdate leaves Upcoming and appears under Past.
- Whether both families see the same Upcoming / Past row after confirmation.
- Why one Past row child tag is Ethan (The Nguyens) while others show Mia (Lev).
- Whether the place after · is only for out playdates, and whether an end time is ever shown on a list row.
- Why the dashboard Playdates count stays 0 when Past is 6, and why the widget empty copy differs from No upcoming playdates yet.
- Error copy if Upcoming or Past fails to load.
- Whether Past is paginated or capped: UI count 6 on 8 Oct 2026 while GET /api/v1/playdates returned 8 cancelled. Sun, Sep 13 (Ethan) and The Petrovs Sat, Sep 12 were not in the visible six.
- Whether banner Notifications ever mentions an upcoming or past playdate.
- Clicking Send request or creating a real upcoming playdate (out of scope).
- Jira AC3 recorded Past 3 and September rows; this file follows the live Past 6 list from 8 Oct 2026.
-->
