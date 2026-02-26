# Blue Panthers

## Current State
The site has a Home page, Sign Up page, and Admin page. Navigation links to all three. The app uses a navy/gold color scheme with a consistent Layout component.

## Requested Changes (Diff)

### Add
- A new Schedule page at `/schedule` showing team events
- First entry: "Practice" for all of May, with two time slots: 7:30–8:00 AM and 10:40–11:00 AM
- "Schedule" nav link in Layout (desktop and mobile nav, and footer)
- A route for `/schedule` in App.tsx

### Modify
- Layout.tsx: add "Schedule" to navLinks array and footer links
- App.tsx: add scheduleRoute and include it in routeTree

### Remove
- Nothing

## Implementation Plan
1. Create `src/frontend/src/pages/SchedulePage.tsx` with a styled schedule listing May practices with both time slots
2. Update `App.tsx` to add the schedule route
3. Update `Layout.tsx` to add the Schedule nav link (desktop, mobile, footer)

## UX Notes
- Keep the navy/gold theme consistent with existing pages
- Display the month (May 2026), event type (Practice), and both time slots clearly
- Use a calendar-style or card-style layout that is easy to read on mobile
