console.log("Starting backend server...");

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import the Student model
const Student = require('./model/Student');

const app = express();
app.use(cors());
app.use(express.json());

// Use environment variable for MongoDB URI, fallback to localhost
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/studentsdb";
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Add Student
app.post('/students', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Edit/Update Student
app.put('/students/:studentId', async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { studentId: req.params.studentId },
      req.body,
      { new: true }
    );
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Student
app.delete('/students/:studentId', async (req, res) => {
  try {
    const result = await Student.findOneAndDelete({ studentId: req.params.studentId });
    if (!result) return res.status(404).json({ error: 'Student not found' });
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// List All Students
app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));