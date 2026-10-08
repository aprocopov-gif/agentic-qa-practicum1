/** Valid Family A credentials from the environment (auth setup). */
export function validFamilyACredentials(): { email: string; password: string } {
  const email = process.env.APP_USER_EMAIL;
  const password = process.env.APP_USER_PASSWORD;
  if (!email || !password) {
    throw new Error('APP_USER_EMAIL and APP_USER_PASSWORD must be set for Family A log-in tests');
  }
  return { email, password };
}
