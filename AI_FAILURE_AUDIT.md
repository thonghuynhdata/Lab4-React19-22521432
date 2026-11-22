# AI FAILURE AUDIT — Lab 4

## Review items and engineering mitigations

| Risk / typical AI failure | Impact | Mitigation in submitted source | Verification |
|---|---|---|---|
| Mixing React Router v5 `<Switch>` or `component` with v7 | Router errors | Uses v7 `Routes`, `Route`, `Outlet`, `NavLink`, `useParams` | Open `/people/p01`, refresh, test invalid ID |
| Cascading `useEffect` form validation | Extra renders, update-depth loops | `validateForm(values)` computed in `useMemo`; field errors are derived | Change fields rapidly; observe no effect-based validation |
| Requests updating state after forum switch | Stale messages and leaking effects | Per-effect `AbortController`; `signal.aborted` check | Chrome DevTools Slow 3G; switch channels quickly |
| MongoDB secrets embedded in source | Credential exposure | `process.env.MONGODB_URI`; ignored `.env` | Review `server/server.js` and `.gitignore` |
| Deprecated Mongoose callback API | Query failures | Mongoose 8 `await Message.find().lean()` and `await Message.create()` | Test with reachable Mongo instance |
| Missing field labels and error relationships | Accessibility barriers | `useId`, `<label htmlFor>`, `aria-invalid`, `aria-describedby` | Inspect accessibility tree and keyboard navigation |

## Observed failures vs potential failure modes

These are **anticipated failure modes** from the slide deck, not claims that errors were observed during an actual execution. No fabricated failure logs, screenshots, benchmark scores, Lighthouse reports, or commits are included.

## Verification to perform before submission

1. `npm install`, `npm test`, `npm run dev`.
2. Test `/people/p01`, `/people/nope`, `/form`, `/forum` in Chrome.
3. Validate empty, invalid email, short password, mismatched passwords and valid submission.
4. Test GET and POST endpoints; invalid payload should return HTTP 400.
5. In DevTools Network choose Slow 3G, switch `nasa` → `esports-tribunal` → `notNasa`; verify prior requests cancel.
6. Use Chrome Lighthouse/Accessibility inspection for measured results; never claim 100/100 without a real run.
7. Record actual defects and fixes here if encountered.
