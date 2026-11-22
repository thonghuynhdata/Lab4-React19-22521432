# Project Rules — UIT S3T Lab 4

1. Contract-first workflow: contract → failing test → implement → refactor.
2. React 19, React Router v7; no legacy `<Switch>` or `defaultProps` patterns.
3. Forms must compute validation synchronously from values; do not use effects to maintain derived errors.
4. Every async effect owns an `AbortController` and protects unmount/route switches.
5. Backend checks all incoming POST payloads and returns appropriate HTTP codes.
6. Do not commit `.env` or MongoDB credentials; use `.env.example`.
7. Use semantic HTML, labeled fields, keyboard focus, and active link states.
8. Use atomic conventional Git commits when maintaining this project; commit history cannot be fabricated in an archive.
