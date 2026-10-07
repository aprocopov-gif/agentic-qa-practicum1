/**
 * Negative targets from AQPBT-9 acceptance criteria.
 * The story does not define invalid manual date/time, family, place, or child checkbox values;
 * Confluence lists send-request validation as an open question — none are invented here.
 */

export const invalidPlaydatesPropose = {
  /**
   * AC8 — Negative — Given I am logged in as a parent who has not set up a family on the
   * Dashboard, when I open `/playdates`, then I see this message and not the Propose UI.
   * Open question: which dashboard fields constitute “set up” (Confluence — Anna).
   */
  dashboardNotSetUpMessage: 'Set up your family on the Dashboard before planning playdates.',

  /**
   * AC8 — … I do **not** see the **Propose** panel or **Send request**.
   * Use with Family B (`APP_ALT_USER_*`) storageState; not a form-field invalid value.
   */
  blockedWhenDashboardNotSetUp: {
    hiddenPanelTitle: 'Propose',
    hiddenSubmitButton: 'Send request',
  },
} as const;

/**
 * Open question (AQPBT-9 / Confluence): required vs optional manual date, start time, end time,
 * location note per place option, and minimum selected children before **Send request**.
 *
 * AC9 (empty **Upcoming** copy) is negative acceptance criteria but not an invalid form input —
 * assert **No upcoming playdates yet.** from the live page when count is 0.
 */
