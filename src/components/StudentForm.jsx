import React, { useState, useEffect } from 'react';

const StudentForm = ({ onAddStudent, editingStudent, onUpdateStudent }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [major, setMajor] = useState('Information Technology');

  useEffect(() => {
    if (editingStudent) {
      setName(editingStudent.name);
      setAge(editingStudent.age);
      setMajor(editingStudent.major);
    } else {
      clearForm();
    }
  }, [editingStudent]);

  const clearForm = () => {
    setName('');
    setAge('');
    setMajor('Information Technology');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !age) return;

    if (editingStudent) {
      onUpdateStudent({
        ...editingStudent,
        name,
        age: parseInt(age, 10),
        major
      });
    } else {
      onAddStudent({
        id: Date.now().toString(),
        name,
        age: parseInt(age, 10),
        major
      });
      clearForm();
    }
  };

  return (
    <div className="card animate-fade-in">
      <h2>{editingStudent ? 'Edit Student' : 'Add New Student'}</h2>
      <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
        <div className="form-group">
          <label htmlFor="name">Student Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter full name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Student Age</label>
          <input
            id="age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter age"
            min="1"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="major">Student Major</label>
          <select id="major" value={major} onChange={(e) => setMajor(e.target.value)}>
            <option value="Information Technology">Information Technology</option>
            <option value="Business Administration">Business Administration</option>
            <option value="Marketing">Marketing</option>
            <option value="Software Engineering">Software Engineering</option>
          </select>
        </div>
        <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
          {editingStudent ? 'Update Student' : 'Add Student'}
        </button>
        {editingStudent && (
          <button 
            type="button" 
            className="btn-danger" 
            style={{ width: '100%', marginTop: '0.5rem' }}
            onClick={() => onUpdateStudent(null)}
          >
            Cancel Edit
          </button>
        )}
      </form>
    </div>
  );
};

export default StudentForm;
