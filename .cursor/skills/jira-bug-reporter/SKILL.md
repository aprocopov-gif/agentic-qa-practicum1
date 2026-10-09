---
name: jira-bug-reporter
description: Analyzes Playwright test failures, identifies root cause, and creates detailed Jira bug tickets. Use when a test fails and needs investigation and bug reporting.
---

# Jira Bug Reporter

## Workflow

1. Read the failure: assertion message, stack trace, screenshot and trace paths under `test-results/`.
2. Confirm it reproduces: re-run the failing test once.
3. Identify the root cause from the spec, the page object, and the app's behavior (BuddyTime's source is not available to us — describe the behavior precisely).
4. Search Jira project `JIRA_PROJECT_KEY` (`AQPBT`) for a similar open bug before drafting a new one.
5. Draft: Title (specific), Type Bug, Severity, Priority, Steps to reproduce (numbered, from login, naming which family does what), Expected (from the AC or the Confluence page), Actual, Environment (the `APP_URL` host, browser, account role — never an email or password), Evidence (screenshot and trace paths), the exact Playwright error, Linked story (`AQPBT-N`).
6. Show the draft to the human. File it with the Atlassian MCP only after approval, and link it to the originating story.

## Rules

- Never file for a test issue or a green run; never include credentials.

## Triage before filing

| Outcome | Action |
|---------|--------|
| Product defect (reproduces manually; AC/Confluence says otherwise) | Draft bug per workflow step 5 |
| Test drift (UI/copy/locator changed; app behavior matches AC) | Fix the test; do not file |
| Flake or environment | Stabilize or re-run; file only if reproducible product failure |

## Duplicate search

Use Jira JQL on project `JIRA_PROJECT_KEY` (from `.env` / `.env.example`, default `AQPBT`): open bugs with similar summary text or the same area (route, feature name, ticket key in description). If a duplicate exists, comment on it with new evidence instead of creating another issue.

## Draft template

Present this block to the human for approval:

```markdown
**Title:** …
**Type:** Bug
**Severity:** …
**Priority:** …
**Linked story:** AQPBT-N

**Steps to reproduce**
1. …

**Expected**
…

**Actual**
…

**Environment**
- Host: (from APP_URL, hostname only)
- Browser: …
- Account role: Family A / Family B / logged out (no emails or passwords)

**Evidence**
- Screenshot: test-results/…
- Trace: test-results/…

**Playwright error**
…
```

## Filing (after approval only)

1. Create the bug in project `JIRA_PROJECT_KEY` via Atlassian MCP.
2. Prefix agent-authored description or summary lead-in with `[Anna]` per repo Atlassian authoring rules.
3. Link the bug to the originating story (`AQPBT-N`).
4. Do not paste secrets; reference roles and paths only.
