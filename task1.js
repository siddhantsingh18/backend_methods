import express from "express";

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log("Request URL:", req.url);
  next();
});

let students = [
  { id: 1, name: "sid" },
  { id: 2, name: "pranjal" }
];

// GET
app.get("/students", (req, res) => {
  res.json(students);
});

// POST
app.post("/students", (req, res) => {
  const newStudent = req.body;
  students.push(newStudent);

  res.json({
    message: "Student added successfully",
    student: newStudent
  });
});

// PUT
app.put("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const updatedData = req.body;

  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  student.name = updatedData.name;

  res.json({
    message: "Student updated successfully",
    student
  });
});

// DELETE

app.delete("/students/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  students.splice(index, 1);

  res.json({
    message: "Student deleted successfully"
  });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});