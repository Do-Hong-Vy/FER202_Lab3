import React from 'react';

const StudentList = ({ students, onEditStudent, onDeleteStudent }) => {
  if (students.length === 0) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
        <p style={{ color: 'var(--text-secondary)' }}>No students found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="card table-container animate-fade-in">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Major</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td style={{ fontFamily: 'monospace' }}>{student.id.slice(-6)}</td>
              <td style={{ fontWeight: 500 }}>{student.name}</td>
              <td>{student.age}</td>
              <td>
                <span style={{
                  padding: '0.2rem 0.6rem',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  color: 'var(--primary-color)'
                }}>
                  {student.major}
                </span>
              </td>
              <td>
                <div className="actions">
                  <button
                    className="btn-primary btn-icon"
                    onClick={() => onEditStudent(student)}
                    title="Edit Student"
                  >
                    Edit
                  </button>
                  <button
                    className="btn-danger btn-icon"
                    onClick={() => onDeleteStudent(student.id)}
                    title="Delete Student"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
