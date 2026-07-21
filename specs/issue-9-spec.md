# Technical Specification — Issue #9

## 1. Issue Overview

| Field       | Value                                                                                     |
| ----------- | ------------------------------------------------------------------------------------------ |
| Title       | Inside the footer when user hover on "Contact Us", no text is displayed                    |
| Description | The footer's "Contact Us" link showed no tooltip on hover, unlike sibling links (Privacy Policy, Terms of Service, Cookie Policy), which display helpful text on hover. |
| Labels      | none                                                                                        |
| Priority    | Low                                                                                         |
| State       | **CLOSED** — already resolved                                                              |

## 2. Problem Analysis

In `src/components/Footer.jsx`, the bottom-row footer links ("Privacy Policy", "Terms of Service", "Cookie Policy") each render a `group`-hover tooltip: a `<div>` with an arrow caret that fades in on hover of the parent link. The "Contact Us" `<Link to="/contact">` element was missing this tooltip markup entirely, so hovering produced no visual feedback — only the underlying navigation worked.

This was fixed and merged via PR #10 (commit `f6a9b3b`, already on `master`/current branch).

## 3. Proposed Solution

No further design work needed — verified the current `Footer.jsx` (lines 173–184) already contains a tooltip on the "Contact Us" `<Link>` that mirrors the sibling pattern:

- Same gradient hover-background `<div>` (`from-primary-600/20 to-purple-600/20`)
- Same tooltip box classes (`absolute bottom-full … bg-gray-800 border border-gray-700 rounded-lg …`)
- Same caret `<div>` (`absolute top-full … rotate-45`)
- Tooltip copy: "Have a question or facing an issue? Get in touch with our support team and we'll be happy to help."

Styling and structure are pixel-identical to the three sibling tooltips — no inconsistency found.

## 4. Step-by-Step Implementation

No implementation required — issue already resolved on this branch. If re-verifying:

1. Confirm `Footer.jsx` "Contact Us" block matches sibling tooltip markup — **done, verified**.
2. Run `npm run lint` locally to confirm no JSX/class issues — recommended follow-up (PR #10's author noted lint wasn't run in CI sandbox).
3. Manually hover-test in dev server across breakpoints (`sm`, `md`, `lg`) to confirm tooltip visibility and positioning.

## 5. Verification Strategy

### Unit Tests

- No unit test suite exists in this repo for component rendering; not applicable.

### Integration Tests

- Not applicable — no test infrastructure currently in place for UI components.

### Manual Checks

- Hover over "Contact Us" in footer → tooltip with support text appears, matches styling of adjacent links.
- Click "Contact Us" → navigates to `/contact` route (unchanged `Link` behavior).
- Verify tooltip does not clip/overflow on small viewports (mobile-first check per `sm:`/`md:`/`lg:` breakpoints).
- Run `npm run lint` to confirm no ESLint violations introduced by the JSX.

## 6. Files to Modify

| File Path                        | Nature of Change |
| --------------------------------- | ----------------- |
| _(none — already applied)_        | N/A               |

## 7. New Files to Create

| File Path | Purpose |
| --------- | ------- |
| _(none)_  | N/A     |

## 8. Existing Utilities to Leverage

| Utility                                  | Benefit                                                        |
| ----------------------------------------- | --------------------------------------------------------------- |
| Existing tooltip pattern in `Footer.jsx` | Already reused consistently for all four footer links — no new pattern needed |

## 9. Acceptance Criteria

- [x] Hovering "Contact Us" displays a help tooltip
- [x] Tooltip styling matches sibling footer links
- [ ] `npm run lint` run locally to confirm no regressions (recommended, not yet confirmed in CI)
- [x] No regressions to `/contact` navigation

## 10. Out of Scope

- Redesigning the footer tooltip system or extracting it into a reusable component
- Adding automated test coverage (no test infra currently exists in this repo)
- Changes to any other footer links or unrelated components
