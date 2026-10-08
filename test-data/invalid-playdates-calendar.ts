/**
 * Negative targets from AQPBT-12 acceptance criteria (Family B gate, hidden list labels).
 */

export const invalidPlaydatesCalendar = {
  /** AC5 — dashboard not set up; same gate copy as related playdate stories. */
  dashboardNotSetUpMessage: 'Set up your family on the Dashboard before planning playdates.',

  /** AC5 — list section headings that must not appear for Family B on playdate routes. */
  hiddenWhenDashboardNotSetUp: {
    upcoming: 'Upcoming',
    past: 'Past',
  },
} as const;
