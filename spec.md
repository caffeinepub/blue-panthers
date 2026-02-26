# Specification

## Summary
**Goal:** Add an Admin page to the Blue Panthers site that lists all registered members in a styled table.

**Planned changes:**
- Create an `/admin` route and Admin page component that fetches all registered members using the existing `useGetAllMembers` query hook
- Display members in a table showing name, email, role, and sign-up timestamp, styled with the Blue Panthers navy/gold theme
- Show a friendly empty-state message when no members have signed up
- Register the `/admin` route in the TanStack Router configuration in `App.tsx`
- Add an "Admin" navigation link to both the desktop and mobile menus in the shared Layout

**User-visible outcome:** Users can navigate to `/admin` via the nav bar and see a themed table listing all registered members with their name, email, role, and sign-up timestamp.
