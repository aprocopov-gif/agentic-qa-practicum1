---
name: explore-and-generate
description: Finds untested user flows by diffing live UI exploration against existing Playwright specs. Use when the user says "find what we're not testing", "explore <page> for untested flows", "expand coverage", "what flows are missing", "coverage gap", or asks to discover new test scenarios without a Jira ticket. Do NOT use when a Jira ticket or acceptance criteria already exist — that is jira-ticket-analyzer. This skill is for ticket-less discovery only. Exploration is read-only: map coverage, crawl the UI, propose one Gherkin plan per run; do not write or run Playwright specs here.
---

# Explore and generate

## Guardrails

- Read-only (no data changes, no invites or approvals, no specs, no test runs); one flow per run; accessibility snapshot only, never screenshots; reuse `playwright/.auth/user.json` or sign in with the `.env` credentials.

## Steps

1. Map covered flows from `tests/*.spec.ts` and `pages/` (page, action, asserted outcome).
2. Crawl the target page with `browser_navigate` + `browser_snapshot`, opening dialogs and panels only as far as needed.
3. List real user flows (trigger, 2–5 steps, visible outcome).
4. Diff against coverage, labelling each **Gap** or **Partial**.
5. Pick ONE highest-value gap and say why in one sentence.
6. Output a Gherkin plan with exactly two scenarios (one positive, one edge case), every `Then` assertable in Playwright, real control names from the snapshot.

## Output template

Use these sections in order:

### Coverage snapshot

Bullet list of flows already covered (from specs/POMs) relevant to the explored page.

### Selected gap

One sentence: which gap was chosen and why.

### Gherkin test plan

```gherkin
Feature: …

  Scenario: … (positive)
    Given …
    When …
    Then …

  Scenario: … (edge case)
    Given …
    When …
    Then …
```

### Locator hints

Role/name pairs from the snapshot for controls used in the scenarios (no CSS).

### For test-writer

- Suggested file: `tests/<slug>.spec.ts`
- POM updates needed: …

### Suggested Jira story

Title, user story one-liner, and bullet acceptance criteria so a ticket-less gap can become an `AQPBT` story after review.

## Save

Write the full output to `features/explore-<page-slug>-<flow-slug>.feature.md`.
