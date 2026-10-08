/** Unique first name for a child row created in a test run. */
export function buildChildFirstName(suffix: string = String(Date.now())): string {
  return `Child-${suffix}`;
}
