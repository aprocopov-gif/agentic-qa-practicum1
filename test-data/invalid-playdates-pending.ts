/**
 * Negative targets from AQPBT-10 acceptance criteria.
 */

export const invalidPlaydatesPending = {
  /** AC4 — dashboard not set up. */
  dashboardNotSetUpMessage: 'Set up your family on the Dashboard before planning playdates.',

  /** AC4 — pending UI that must not appear for Family B. */
  hiddenWhenDashboardNotSetUp: {
    pendingLabel: 'Pending requests',
    pendingEmptyCopy: 'No pending requests.',
  },
} as const;
