/**
 * Negative targets from AQPBT-11 acceptance criteria.
 */

export const invalidPlaydatesLists = {
  /** AC5 — dashboard not set up. */
  dashboardNotSetUpMessage: 'Set up your family on the Dashboard before planning playdates.',

  /** AC5 — list UI that must not appear for Family B. */
  hiddenWhenDashboardNotSetUp: {
    upcoming: 'Upcoming',
    upcomingEmptyCopy: 'No upcoming playdates yet.',
    past: 'Past',
  },
} as const;
