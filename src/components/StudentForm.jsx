/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";

const StudentForm = ({ onAddStudent, editingStudent, onUpdateStudent }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [major, setMajor] = useState("Information Technology");

  const clearForm = () => {
    setName("");
    setAge("");
    setMajor("Information Technology");
  };

  useEffect(() => {
    if (editingStudent) {
      setName(editingStudent.name);
      setAge(editingStudent.age);
      setMajor(editingStudent.major);
    } else {
      clearForm();
    }
  }, [editingStudent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !age) return;

    if (editingStudent) {
      onUpdateStudent({
        ...editingStudent,
        name,
        age: parseInt(age, 10),
        major,
      });
    } else {
      onAddStudent({
        id: Date.now().toString(),
        name,
        age: parseInt(age, 10),
        major,
      });
      clearForm();
    }
  };

  return (
    <Card className="mb-4">
      <Card.Header as="h5">
        {editingStudent ? "Edit Student" : "Add New Student"}
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Student Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter full name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="age">
            <Form.Label>Student Age</Form.Label>
            <Form.Control
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter age"
              min="1"
              required
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="major">
            <Form.Label>Student Major</Form.Label>
            <Form.Select
              value={major}
              onChange={(e) => setMajor(e.target.value)}
            >
              <option value="Information Technology">
                Information Technology
              </option>
              <option value="Business Administration">
                Business Administration
              </option>
              <option value="Marketing">Marketing</option>
              <option value="Software Engineering">Software Engineering</option>
            </Form.Select>
          </Form.Group>

          <div className="d-flex gap-2">
            <Button
              variant={editingStudent ? "warning" : "primary"}
              type="submit"
              className="w-100"
            >
              {editingStudent ? "Update Student" : "Add Student"}
            </Button>

            {editingStudent && (
              <Button
                variant="outline-danger"
                type="button"
                className="w-100"
                onClick={() => onUpdateStudent(null)}
              >
                Cancel Edit
              </Button>
            )}
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default StudentForm;
