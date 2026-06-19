import { Table, Button, Badge, Alert } from 'react-bootstrap';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

const getMajorBadgeVariant = (major) => {
  switch (major) {
    case 'Information Technology': return 'info';
    case 'Business Administration': return 'success';
    case 'Marketing': return 'warning';
    case 'Software Engineering': return 'primary';
    default: return 'secondary';
  }
};

const StudentList = ({ students, onEditStudent, onDeleteStudent }) => {
  const { theme } = useContext(ThemeContext);

  if (students.length === 0) {
    return (
      <Alert variant="secondary" className="text-center mt-3">
        No students found matching your criteria.
      </Alert>
    );
  }

  return (
    <div className="table-responsive">
      <Table variant={theme} bordered hover className="align-middle">
        <thead className={theme === 'dark' ? 'table-dark' : 'table-light'}>
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
              <td className="text-muted font-monospace">{student.id.slice(-6)}</td>
              <td className="fw-bold">{student.name}</td>
              <td>{student.age}</td>
              <td>
                <Badge bg={getMajorBadgeVariant(student.major)} pill>
                  {student.major}
                </Badge>
              </td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  className="me-2"
                  onClick={() => onEditStudent(student)}
                  title="Edit Student"
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onDeleteStudent(student.id)}
                  title="Delete Student"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default StudentList;
