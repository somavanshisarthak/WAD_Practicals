# Student CRUD API (Node + Express + MongoDB)

No frontend. Test with **Postman** only.

## What you need installed

1. **Node.js** (LTS) — [https://nodejs.org](https://nodejs.org)
2. **MongoDB** running locally (default port `27017`) — [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)

## Installation

Open a terminal in this project folder and run:

```bash
npm install
```

## Run the project

1. Start MongoDB (how you do this depends on your OS; often a service named `mongod` or MongoDB Compass’s local connection).
2. Start the API:

```bash
npm start
```

You should see: `Connected to MongoDB` and `Server running at http://localhost:3000`.

## Postman examples

Base URL: `http://localhost:3000`

Set **Body → raw → JSON** for POST and PUT.

### 1. POST — create a student

- **Method:** POST  
- **URL:** `http://localhost:3000/students`  
- **Body (raw JSON):**

```json
{
  "name": "Riya Sharma",
  "age": 20,
  "course": "Computer Science"
}
```

**Response:** `201` with the saved student (includes `_id` from MongoDB). Copy `_id` for PUT/DELETE.

### 2. GET — list all students

- **Method:** GET  
- **URL:** `http://localhost:3000/students`  

**Response:** `200` with an array of students.

### 3. PUT — update a student

- **Method:** PUT  
- **URL:** `http://localhost:3000/students/<paste_id_here>`  
  Example: `http://localhost:3000/students/674a1b2c3d4e5f6789abcdef`  
- **Body (raw JSON):**

```json
{
  "name": "Riya Sharma",
  "age": 21,
  "course": "Information Technology"
}
```

**Response:** `200` with the updated student. `404` if the id is wrong.

### 4. DELETE — remove a student

- **Method:** DELETE  
- **URL:** `http://localhost:3000/students/<paste_id_here>`  

**Response:** `200` with a short message and the deleted record. `404` if the id is wrong.

## Viva-friendly summary

- **Express** listens on a port and defines **routes** (`/students`).
- **Mongoose** connects Node.js to **MongoDB** and uses a **schema** (`Student`) so each document has `name`, `age`, `course`.
- **CRUD:** POST (Create), GET (Read), PUT (Update), DELETE (Delete). The `:id` in the URL is MongoDB’s `_id` string.
