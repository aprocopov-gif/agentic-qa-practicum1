---
name: test-data-reset
description: Deletes records that Playwright tests created in the app under test, using the delete calls in support/api-client.ts. Use only when the user explicitly asks to reset test data after an interrupted run left records behind.
disable-model-invocation: true
---

# Test data reset

Script (run from the repo root with npx tsx): reuse support/api-client.ts and
support/record-tracker.ts — do not duplicate API logic. Default: delete every record in
.test-artifacts/created-records.jsonl with its owner's storage state. Flags: --dry-run
(list targets, delete nothing), --type <type>. Never delete a record the tracker did not
record. Print found / deleted / failed counts, then reset the tracker.

```bash
npx tsx .cursor/skills/test-data-reset/scripts/reset-test-data.ts [--dry-run] [--type <type>]
```

confirm intent; check the auth files exist (run the setup project if not); run
--dry-run first unless the user already confirmed; 401 → the storage state expired,
re-run setup; 404 → report it as already removed. Include a result template:
Scope · Found · Deleted · Failed
