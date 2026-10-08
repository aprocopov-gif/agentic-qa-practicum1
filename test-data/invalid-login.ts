/**
 * Negative targets from AQPBT-1 acceptance criteria and Confluence [Vitaly] Log in.
 */

export const invalidLogin = {
  /** AC3 / AC4 — inline message for wrong password or unregistered email. */
  invalidCredentialsMessage: 'Invalid email or password',

  /** AC3 — wrong password paired with valid Family A email in specs. */
  wrongPassword: 'incorrect-password-value',
} as const;

/** AC4 — unique address unlikely to be registered (not a registered Family A/B account). */
export function unregisteredLoginEmail(): string {
  return `not-registered-${Date.now()}@invalid.example`;
}
