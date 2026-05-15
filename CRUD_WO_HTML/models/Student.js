const mongoose = require("mongoose");

// One document in the "students" collection = one student record
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  course: { type: String, required: true },
});

module.exports = mongoose.model("Student", studentSchema);
