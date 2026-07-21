# Technical Specification --- Issue #5

## 1. Issue Overview

| Field       | Value                                                                                                |
| ----------- | ----------------------------------------------------------------------------------------------------- |
| Title       | Inside the footer, when hover on to the "Terms of Service" nothing is being displayed                |
| Description | Hovering the "Terms of Service" link in the footer showed no tooltip/text; expected explanatory text  |
| Labels      | (none)                                                                                                 |
| State       | CLOSED (2026-07-20)                                                                                    |
| Priority    | N/A — already resolved                                                                                |

## 2. Problem Analysis

The footer's "Terms of Service" `<a>` element previously lacked a hover tooltip, unlike other footer legal links.

Repository evidence shows this was already fixed prior to this analysis, in commit `9f225f5` — "fix: show terms of service text on footer hover (#6)". The same tooltip pattern was later applied to Privacy Policy (`38a80d5`), Cookie Policy (`7b0f264`), and Contact Us (`f6a9b3b`), indicating a consistent, repeated fix pattern across all footer bottom-bar links.

Current state in `src/components/Footer.jsx` (lines 154-162):
- The parent `<a>` has `className="group relative ..."`.
- A `<span>` renders the visible label.
- A sibling `<div>` (absolutely positioned, `opacity-0 invisible` → `group-hover:opacity-100 group-hover:visible`) renders the tooltip text: "By using JobPortal, you agree to our terms regarding account usage, job postings, and acceptable conduct on the platform."
- A small rotated `<div>` renders the tooltip's pointer/arrow.

This matches the working pattern used by the three other legal links (Privacy Policy, Cookie Policy) and the Contact Us link, all of which rely on Tailwind's `group` / `group-hover` utilities — no `dark:` variant, consistent with project styling rules.

**Conclusion: no defect currently exists in the codebase for this issue.** The GitHub issue is already closed, and the fix is present on `master`.

## 3. Proposed Solution

No code change is required. This spec exists to document verification of the fix and to guard against regression.

If any follow-up work is desired, it would be limited to:
- Confirming tooltip behavior is consistent across breakpoints (mobile hover has no true "hover" state, so tooltip only surfaces on devices with pointer/hover support — acceptable, matches existing pattern for sibling links).
- No architectural changes; no new components or utilities needed.

## 4. Step-by-Step Implementation

1. **Verify current behavior** — Run the dev server and hover "Terms of Service" in the footer to confirm the tooltip renders with the expected text.
2. **No code changes** — The fix already exists at `src/components/Footer.jsx:154-162`.
3. **Close out** — Confirm GitHub issue #5 remains closed; no reopening needed.

## 5. Verification Strategy

### Unit Tests

- N/A — no test infrastructure exists in this repo for component hover states (no test runner configured in `package.json`).

### Integration Tests

- N/A — not applicable given current project setup.

### Manual Checks

- Hover "Terms of Service" in the footer (desktop viewport) → tooltip with terms text appears above the link with correct arrow pointer.
- Hover "Privacy Policy", "Cookie Policy", "Contact Us" → confirm all four links share identical tooltip behavior/styling for consistency.
- Resize to mobile width → confirm layout wraps (`flex-wrap`) without tooltip clipping off-screen.

## 6. Files to Modify

| File Path | Nature of Change |
| --------- | ----------------- |
| None      | No changes required — fix already present |

## 7. New Files to Create

| File Path | Purpose |
| --------- | ------- |
| None      | Not applicable |

## 8. Existing Utilities to Leverage

| Utility                          | Benefit                                                       |
| --------------------------------- | -------------------------------------------------------------- |
| Tailwind `group` / `group-hover:` | Existing pattern already used for all four footer bottom links |

## 9. Acceptance Criteria

- [x] Hovering "Terms of Service" displays explanatory tooltip text
- [x] Behavior consistent with Privacy Policy, Cookie Policy, and Contact Us links
- [ ] Tests added — not applicable, no test suite in project
- [x] No regressions (pattern reused, not newly introduced)

## 10. Out of Scope

- Adding a dedicated `/terms` page or route (the link currently has no `to`/`href` — only a tooltip; navigation was not requested in the issue).
- Introducing automated test coverage for hover states.
- Refactoring the four footer tooltip links into a shared reusable component (would be a reasonable future cleanup, but not required to resolve this issue).
