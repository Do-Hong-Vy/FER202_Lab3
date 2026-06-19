import React, { useState, useEffect, useReducer, useMemo, useCallback, useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { studentReducer, initialState } from '../reducers/studentReducer';
import StudentForm from './StudentForm';
import FilterBar from './FilterBar';
import StudentList from './StudentList';

const StudentManagementSystem = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  // State for search and filter
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMajor, setFilterMajor] = useState('All Majors');
  const [editingStudent, setEditingStudent] = useState(null);

  // Reducer for student data
  const [students, dispatch] = useReducer(studentReducer, initialState);

  // Load from local storage on mount
  useEffect(() => {
    const savedStudents = localStorage.getItem('studentsData');
    if (savedStudents) {
      try {
        const parsed = JSON.parse(savedStudents);
        dispatch({ type: 'LOAD_STUDENTS', payload: parsed });
      } catch (e) {
        console.error("Failed to parse students from localStorage", e);
      }
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('studentsData', JSON.stringify(students));
  }, [students]);

  // Callbacks
  const handleAddStudent = useCallback((student) => {
    dispatch({ type: 'ADD_STUDENT', payload: student });
  }, []);

  const handleUpdateStudent = useCallback((student) => {
    if (student) {
      dispatch({ type: 'UPDATE_STUDENT', payload: student });
    }
    setEditingStudent(null);
  }, []);

  const handleDeleteStudent = useCallback((id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      dispatch({ type: 'DELETE_STUDENT', payload: id });
      if (editingStudent && editingStudent.id === id) {
        setEditingStudent(null);
      }
    }
  }, [editingStudent]);

  // Memoized filtering and searching
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterMajor === 'All Majors' || student.major === filterMajor;
      return matchesSearch && matchesFilter;
    });
  }, [students, searchTerm, filterMajor]);

  return (
    <div className="app-container">
      <header className="header">
        <h1>Student Manager</h1>
        <button className="btn-theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
      </header>

      <div className="dashboard">
        <aside>
          <StudentForm 
            onAddStudent={handleAddStudent} 
            editingStudent={editingStudent}
            onUpdateStudent={handleUpdateStudent}
          />
        </aside>

        <main>
          <FilterBar 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filterMajor={filterMajor}
            onFilterChange={setFilterMajor}
          />

          <div className="stats-bar">
            Total Students: {filteredStudents.length}
          </div>

          <StudentList 
            students={filteredStudents}
            onEditStudent={setEditingStudent}
            onDeleteStudent={handleDeleteStudent}
          />
        </main>
      </div>
    </div>
  );
};

export default StudentManagementSystem;
