# [Anna] Playdates add to calendar — AQPBT-12

Feature: Playdates add to calendar — calendar export is not offered on empty or cancelled rows

  Signed-in parents with a set-up family (Lev Test / The Gorfels) open Playdates and must not
  see Google or ICS export on empty Upcoming or Cancelled Past rows. Profile Calendar Sync
  explains that calendar links ship with playdates.

# Happy paths

  Scenario: Empty Upcoming on Playdates shows message without calendar export
    Given I am logged in as Family A with a completed dashboard
    When I open "/playdates" with Upcoming count 0
    Then I see "No upcoming playdates yet."
    And I do not see "Google" or "ICS"

  Scenario: Cancelled Past row on Playdates has no calendar or pending actions
    Given I am logged in as Family A with a completed dashboard
    And I am on "/playdates"
    When I view the Cancelled Past row for "The Nguyens" at "Fri, Oct 16, 3:00 PM"
    Then I see status "Cancelled"
    And I do not see "Google", "ICS", Accept, Decline, or cancel on that row

  Scenario: Find a playdate route shows the same empty Upcoming and cancelled Past lists
    Given I am logged in as Family A with a completed dashboard
    When I open "/playdates/new"
    Then I see "No upcoming playdates yet."
    And I see Cancelled Past rows without "Google" or "ICS"

  Scenario: Profile Calendar Sync shows playdate calendar message on profile
    Given I am logged in as Family A with a completed dashboard
    And I am on "/profile"
    When I click "Calendar Sync" ("Add-to-calendar links soon")
    Then I stay on "/profile"
    And I see "Calendar links ship with playdates 🗓️"

# Negative

  Scenario: Family B gate on Playdates hides lists and calendar export
    Given I am logged in as Family B (Anna Procopov) without a set-up dashboard
    When I open "/playdates"
    Then I see "Set up your family on the Dashboard before planning playdates."
    And I do not see "Upcoming", "Past", "Google", or "ICS"

  Scenario: Family B gate on Find a playdate hides lists and calendar export
    Given I am logged in as Family B (Anna Procopov) without a set-up dashboard
    When I open "/playdates/new"
    Then I see "Set up your family on the Dashboard before planning playdates."
    And I do not see "Upcoming", "Past", "Google", or "ICS"

  Scenario: Clicking a Cancelled Past row does not reveal calendar export
    Given I am logged in as Family A with a completed dashboard
    And I am on "/playdates" viewing a Cancelled Past row
    When I click that row
    Then I stay on "/playdates"
    And no calendar-export controls appear

# Edge cases

  Scenario: Future-dated Cancelled Past row still has no calendar export
    Given I am logged in as Family A with a completed dashboard
    And I am on "/playdates"
    When I view the Cancelled Past row dated "Thu, Oct 15, 3:00 PM"
    Then I see "Cancelled"
    And I do not see "Google" or "ICS" on that row

  Scenario: Past section lists cancelled families from the circle without export actions
    Given I am logged in as Family A with a completed dashboard
    When I open "/playdates"
    Then I see "Past" beside cancelled rows for "The Nguyens" and "The Petrovs"
    And I do not see "Google" or "ICS"

  Scenario: Dashboard Upcoming Playdates widget has no Google or ICS
    Given I am logged in as Family A with a completed dashboard
    When I open "/app"
    Then I see the Upcoming Playdates widget without "Google" or "ICS"

  Scenario: In-app Calendar page has no Google or ICS export controls
    Given I am logged in as Family A with a completed dashboard
    When I open "/calendar"
    Then I see "Your family calendar"
    And I do not see "Google" or "ICS"

  Scenario: Clicking Cancelled Past row on Find a playdate stays on route without export
    Given I am logged in as Family A with a completed dashboard
    And I am on "/playdates/new"
    When I click a Cancelled Past row for "The Nguyens"
    Then I stay on "/playdates/new"
    And I do not see "Google" or "ICS"

<!--
Ambiguities / gaps (Jira out of scope + Confluence open questions):
- Confirmed Upcoming row UI and exact Google / ICS labels, href, and ICS download behavior.
- Error copy when ICS download fails; API /api/v1/events/{id}/ics vs playdate list ICS.
- Export on completed (non-Cancelled) Past rows or on the dashboard Upcoming widget when non-empty.
- Two families viewing the same confirmed row at once.
- Birthday "Add to my calendar" is a separate feature map row.
- Family B Profile Calendar Sync toast vs playdate gate (Confluence: toast observed for both when reachable).
-->
