import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
  Box,
  Grid,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { API_BASE_URL } from "./config";

const api = `${API_BASE_URL}/students`;

export default function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    studentId: "",
    name: "",
    department: "",
    year: "",
    email: "",
    cgpa: "",
  });
  const [editId, setEditId] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [confirmDelete, setConfirmDelete] = useState({ open: false, studentId: null });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(api);
      setStudents(res.data);
    } catch (error) {
      setSnackbar({ open: true, message: "Failed to load students.", severity: "error" });
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`${api}/${editId}`, form);
        setSnackbar({ open: true, message: "Student updated!", severity: "success" });
      } else {
        await axios.post(api, form);
        setSnackbar({ open: true, message: "Student added!", severity: "success" });
      }
      setForm({
        studentId: "",
        name: "",
        department: "",
        year: "",
        email: "",
        cgpa: "",
      });
      setEditId("");
      fetchStudents();
    } catch (error) {
      setSnackbar({ open: true, message: error?.response?.data?.error || "Error!", severity: "error" });
    }
  };

  const handleEdit = (student) => {
    setEditId(student.studentId);
    setForm({
      studentId: student.studentId,
      name: student.name,
      department: student.department,
      year: student.year,
      email: student.email,
      cgpa: student.cgpa,
    });
  };

  const handleDelete = async (studentId) => {
    setConfirmDelete({ open: true, studentId });
  };

  const confirmDeleteStudent = async () => {
    try {
      await axios.delete(`${api}/${confirmDelete.studentId}`);
      setSnackbar({ open: true, message: "Student deleted!", severity: "success" });
      fetchStudents();
    } catch (error) {
      setSnackbar({ open: true, message: "Delete failed!", severity: "error" });
    }
    setConfirmDelete({ open: false, studentId: null });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" align="center" sx={{ mb: 3 }}>
          Student Management System
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={2}>
              <TextField
                label="Student ID"
                name="studentId"
                size="small"
                value={form.studentId}
                onChange={handleChange}
                fullWidth
                required
                disabled={Boolean(editId)}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                label="Name"
                name="name"
                size="small"
                value={form.name}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                label="Department"
                name="department"
                size="small"
                value={form.department}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={1.5}>
              <TextField
                label="Year"
                name="year"
                type="number"
                size="small"
                value={form.year}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={2.5}>
              <TextField
                label="Email"
                name="email"
                type="email"
                size="small"
                value={form.email}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={1}>
              <TextField
                label="CGPA"
                name="cgpa"
                type="number"
                size="small"
                inputProps={{ step: "0.01", min: 0, max: 10 }}
                value={form.cgpa}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={1}>
              <Button variant="contained" color="primary" type="submit" fullWidth sx={{ height: "100%" }}>
                {editId ? "Update" : "Add"}
              </Button>
            </Grid>
            {editId && (
              <Grid item xs={12} sm={1}>
                <Button
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  sx={{ height: "100%" }}
                  onClick={() => {
                    setEditId("");
                    setForm({ studentId: "", name: "", department: "", year: "", email: "", cgpa: "" });
                  }}
                >
                  Cancel
                </Button>
              </Grid>
            )}
          </Grid>
        </Box>
      </Paper>

      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>CGPA</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((st) => (
              <TableRow key={st.studentId}>
                <TableCell>{st.studentId}</TableCell>
                <TableCell>{st.name}</TableCell>
                <TableCell>{st.department}</TableCell>
                <TableCell>{st.year}</TableCell>
                <TableCell>{st.email}</TableCell>
                <TableCell>{st.cgpa}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => handleEdit(st)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(st.studentId)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {students.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No Students Available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Dialog for delete confirmation */}
      <Dialog
        open={confirmDelete.open}
        onClose={() => setConfirmDelete({ open: false, studentId: null })}
      >
        <DialogTitle>Delete Student?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this student? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setConfirmDelete({ open: false, studentId: null })}
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={confirmDeleteStudent} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
