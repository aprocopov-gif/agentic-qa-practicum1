export enum AppRoute {
  Landing = '/',
  Login = '/login',
  SignUp = '/signup',
  ForgotPassword = '/forgot-password',
  Privacy = '/privacy',
  Terms = '/terms',
  Dashboard = '/app',
  Calendar = '/calendar',
  Friends = '/friends',
  Communities = '/communities',
  NewCommunity = '/communities/new',
  Availability = '/availability',
  Playdates = '/playdates',
  NewPlaydate = '/playdates/new',
  Birthdays = '/birthdays',
  Profile = '/profile',
  Admin = '/admin',
}

/** Birthday party detail the host opens from Birthdays → View. */
export function birthdayPartyRoute(partyId: string): string {
  return `/birthdays/${partyId}`;
}

/** Public guest RSVP page (no app required). */
export function guestRsvpRoute(token: string): string {
  return `/e/${token}`;
}

/** Co-parent or circle invite acceptance page. */
export function coParentJoinRoute(token: string): string {
  return `/join/${token}`;
}

/** Community detail page. */
export function communityRoute(communityId: string): string {
  return `/communities/${communityId}`;
}
