const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const Student = require("./models/Student");

const app = express();
const PORT = 3000;

app.use(express.json());

// Change this if your MongoDB runs elsewhere or needs auth
const MONGO_URI = "mongodb://127.0.0.1:27017/student_crud_db";

async function connectDB() {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB");
}

// CREATE — add a new student
app.post("/students", async (req, res) => {
  try {
    const { name, age, course } = req.body;
    const student = new Student({ name, age, course });
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ — list all students
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE — change one student by MongoDB _id
app.put("/students/:id", async (req, res) => {
  try {
    const { name, age, course } = req.body;
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { name, age, course },
      { new: true, runValidators: true }
    );
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE — remove one student by MongoDB _id
app.delete("/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json({ message: "Student deleted", student });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// index.html, style.css, script.js (same server = no CORS setup needed)
app.use(express.static(path.join(__dirname, "public")));

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Open http://localhost:${PORT} in your browser`);
  });
}

start().catch((err) => {
  console.error("Failed to start:", err.message);
  process.exit(1);
});
