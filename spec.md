# Blue Panthers

## Current State
The app has a backend with `getAllMembers()` as a public query and `register()` for signups. The frontend has a `useGetAllMembers` hook that returns an empty array when `actor` is null. The `useActor` hook creates an anonymous actor by default (no login required). The admin page uses `useGetAllMembers` to display members.

## Requested Changes (Diff)

### Add
- Retry logic and a "Refresh" button on the admin page so the admin can manually reload if members fail to appear

### Modify
- Fix `useGetAllMembers` hook: currently returns `[]` early when actor is null, but the actor should always be available (even anonymous). Remove the early-return guard so the query always runs once the actor is ready.
- Improve the error state on the admin page to show more detail and a retry button.

### Remove
- Nothing

## Implementation Plan
1. In `useQueries.ts`, remove the `if (!actor) return []` early return -- let the query wait properly for the actor via `enabled: !!actor && !isFetching`.
2. In `AdminPage.tsx`, add a retry/refresh button on the error state using `useQueryClient` to invalidate and refetch the members query.
3. Ensure the loading skeleton shows while waiting for the actor to be ready.
