# Student CRUD (Node + Express + MongoDB + HTML/CSS/JS)

Full-stack **CRUD** on the **Student** collection: `name`, `age`, `course`.  
Frontend uses **fetch()** to call the same server (no separate API port, no CORS).

## Folder structure

```
CRUD_WO_HTML/
├── server.js              # Express + MongoDB routes + serves public files
├── package.json
├── .gitignore
├── models/
│   └── Student.js         # Mongoose schema (students collection)
└── public/
    ├── index.html         # Form + table
    ├── style.css          # Simple layout
    └── script.js          # fetch() for POST / GET / PUT / DELETE
```

## What you need installed

1. **Node.js** (LTS) — [https://nodejs.org](https://nodejs.org)
2. **MongoDB** locally on port **27017** — [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)

## Installation

```bash
cd CRUD_WO_HTML
npm install
```

## Run the project

1. Start **MongoDB** on your machine.
npm init -y
npm install express mongoose cors
•  Start the service: sudo systemctl start mongod
•  Verify it is running: sudo systemctl status mongod
•  Ensure it starts on boot: sudo systemctl enable mongod
2. Start the server:

```bash
npm start
```

3. Open a browser: **http://localhost:3000**  
   - Add / edit / delete students from the page.  
   - You can still test **Postman** on the same URLs (`http://localhost:3000/students`, etc.).

You should see `Connected to MongoDB` and `Open http://localhost:3000 in your browser` in the terminal.

## API (used by `script.js` and Postman)

| Action | Method | URL |
|--------|--------|-----|
| Create | POST | `/students` |
| Read all | GET | `/students` |
| Update | PUT | `/students/:id` |
| Delete | DELETE | `/students/:id` |

**POST / PUT body (JSON):** `{ "name": "...", "age": 20, "course": "..." }`  
**`:id`** = MongoDB `_id` string from the list.

## Postman (optional)

Base URL: `http://localhost:3000` — Body **raw JSON** for POST and PUT (same as before).

## Practical-exam summary

- **Backend:** Express defines routes; **Mongoose** saves documents in MongoDB.
- **Frontend:** `index.html` loads `script.js`, which uses **`fetch()`** with `JSON.stringify` and `Content-Type: application/json`.
- **Same origin:** HTML is served from `public/` by Express, so calls like `fetch("/students")` go to the same host and port.
