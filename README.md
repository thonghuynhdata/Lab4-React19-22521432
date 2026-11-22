# LAB 4 — Exercises (UIT S3T)

**Student:** Huỳnh Quốc Minh Thông  
**Student ID:** 22521432  
**Subject:** Lab 4 — Multi-Route SPA Architecture, Context Form Engine & Full-Stack React 19 Systems  
**Scope:** In-class exercises and Sprint 1–3. The separate homework applications in the slides are **not** part of this exercise package.

## 1. How to run

Requires Node.js 20+ and npm. Open a terminal in this folder:

```bash
npm install
npm test
npm run dev
```

Open **http://localhost:5173**. The Express API runs at **http://localhost:4000**.

### Optional MongoDB 8 persistence

By default, the server deliberately uses **in-memory demo storage** to run without a database (it resets when restarted). For persistent database integration, copy `.env.example` to `.env` and set an actual `MONGODB_URI` for a local or hosted MongoDB instance. The server then connects with `await mongoose.connect(...)`; it exits if a configured connection fails rather than silently dropping data.

## 2. Completed exercise mapping

| Source deck | Implementation |
|---|---|
| Ex 1.1 lazy loading and accessible Suspense skeleton | `src/App.jsx`, `src/styles.css` |
| Ex 1.2 / 1.2.1 React Router v7 navigation | `src/App.jsx`, `src/components/PeopleLayout.jsx` |
| Ex 1.2.2 master-detail, URL params, unknown record | `src/components/PersonDetail.jsx` |
| Ex 1.3 validation anti-pattern refactor | `src/context/FormContext.jsx`, `src/lib/validation.js` |
| Sprint 2 / ShowData | `src/components/SimpleForm.jsx`, `InputField.jsx`, `ShowData.jsx` |
| Ex 1.7.1 / Sprint 3 cancelable fetch | `src/hooks/useForumMessages.js`, `src/components/Forum.jsx` |
| Express server, CORS, GET + POST validation | `server/server.js` |
| Contract and audit documents | `project-rules.md`, `TASK_DECOMPOSITION.md`, `AI_FAILURE_AUDIT.md` |

The slide deck contains two backend URL patterns; **both** `/api/messages/:forum` and `/api/forums/:forum/messages` are supported to reconcile examples.

## 3. Manual test cases

- Visit `/people/p01`, reload directly, and check data; visit `/people/missing` for a 404 state.
- Resize browser below 720 px: people sidebar stacks above content.
- At `/form`, submit empty form; check accessible errors. Enter different passwords; check matching error. Enter valid values; inspect submitted data. Passwords are masked in inspector.
- At `/forum`, choose `nasa`, `esports-tribunal`, `notNasa`. Create a message, check it appears. On a slow network, switch forums quickly and check previous GET cancels.
- Confirm API health: `http://localhost:4000/api/health`.
- POST invalid payload with `curl` (or PowerShell Invoke-RestMethod) to see HTTP 400:

```bash
curl -i -X POST http://localhost:4000/api/messages/nasa -H 'Content-Type: application/json' -d '{"author":"","text":""}'
```

## 4. Submission notes

For GitHub, push this project from a local working directory with a real Git history, preferably multiple conventional commits. Include screenshots of the three routes and tests from your own browser if the instructor requires evidence. Avoid pushing `node_modules`, `.env`, or any secret. README and AI audit are included as required repository documentation.

## 5. Limitations and scope

This package implements the **exercises**, not three standalone homework specifications (Photo Gallery, Swipe Deck, and Esports Appeal Tribunal). No fabricated git commits, browser screenshots, Lighthouse score, or deployed URL is claimed.
