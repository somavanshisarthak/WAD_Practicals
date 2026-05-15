# WAD Practical — Angular Auth (localStorage)

Small Angular app for Web Application Development practicals: **register**, **login**, **profile** with data stored in **localStorage** only (no backend).

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended; project uses Angular 21)
- [npm](https://docs.npmjs.com/) (comes with Node.js)

Optional: [Angular CLI](https://angular.dev/tools/cli) globally:

```bash
npm install -g @angular/cli
```

## Installation

1. Clone the repository (or download and extract the ZIP).

   ```bash
   git clone <your-repo-url>.git
   cd angular
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Run the project

Development server (default: [http://localhost:4200/](http://localhost:4200/)):

```bash
npm start
```

Or:

```bash
ng serve
```

Other useful commands:

| Command        | Description              |
| -------------- | ------------------------ |
| `npm run build` | Production build → `dist/` |
| `npm test`      | Unit tests                 |

## What this app does

- **Register** — saves `name`, `email`, `password` to `localStorage` under `wad_users`.
- **Login** — checks email/password; on success saves session under `wad_session` and opens **Profile**.
- **Profile** — shows name and email; **Logout** clears the session.

## `.gitignore` (why it matters for GitHub)

The repo includes a **`.gitignore`** so you do not commit bulky or machine-specific files, for example:

- `node_modules/` — reinstall with `npm install` on any machine
- `dist/` — build output; regenerate with `npm run build`
- `/.angular/cache` — Angular CLI cache
- Log files, OS junk (`.DS_Store`), editor folders, and `.env` files

**Always commit:** `package.json` and `package-lock.json` so others get the same dependency versions.

**Never commit:** secrets; this demo has no real API keys, but if you add `.env` later, it stays ignored by default.

## Push to GitHub

From the project root (where `.gitignore` and `package.json` live):

```bash
git init
git add .
git status   # optional: confirm node_modules/ and dist/ are NOT listed
git commit -m "Initial commit: WAD Angular auth practical"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

If the repo already exists on GitHub, use its URL in `git remote add origin`.

---

Generated with [Angular CLI](https://github.com/angular/angular-cli) 21. For more on the CLI, see the [Angular CLI documentation](https://angular.dev/tools/cli).
