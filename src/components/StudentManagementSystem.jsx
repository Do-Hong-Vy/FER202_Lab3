import {
  useState,
  useEffect,
  useReducer,
  useMemo,
  useCallback,
  useContext,
} from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { studentReducer, initialState } from "../hooks/studentReducer";
import StudentForm from "./StudentForm";
import FilterBar from "./FilterBar";
import StudentList from "./StudentList";
import {
  Container,
  Row,
  Col,
  Navbar,
  Button,
  Card,
  Badge,
} from "react-bootstrap";
import { LuSun, LuMoon } from "react-icons/lu";

const StudentManagementSystem = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  // State for search and filter
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMajor, setFilterMajor] = useState("All Majors");
  const [editingStudent, setEditingStudent] = useState(null);

  // Reducer for student data
  const [students, dispatch] = useReducer(studentReducer, initialState);

  // Load from local storage on mount
  useEffect(() => {
    const savedStudents = localStorage.getItem("studentsData");
    if (savedStudents) {
      try {
        const parsed = JSON.parse(savedStudents);
        dispatch({ type: "LOAD_STUDENTS", payload: parsed });
      } catch (e) {
        console.error("Failed to parse students from localStorage", e);
      }
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem("studentsData", JSON.stringify(students));
  }, [students]);

  // Callbacks
  const handleAddStudent = useCallback((student) => {
    dispatch({ type: "ADD_STUDENT", payload: student });
  }, []);

  const handleUpdateStudent = useCallback((student) => {
    if (student) {
      dispatch({ type: "UPDATE_STUDENT", payload: student });
    }
    setEditingStudent(null);
  }, []);

  const handleDeleteStudent = useCallback(
    (id) => {
      if (window.confirm("Are you sure you want to delete this student?")) {
        dispatch({ type: "DELETE_STUDENT", payload: id });
        if (editingStudent && editingStudent.id === id) {
          setEditingStudent(null);
        }
      }
    },
    [editingStudent],
  );

  // Memoized filtering and searching
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const lowerCaseSearch = searchTerm.toLowerCase();
      const matchesSearch = 
        student.name.toLowerCase().includes(lowerCaseSearch) ||
        student.id.toLowerCase().includes(lowerCaseSearch);
      const matchesFilter =
        filterMajor === "All Majors" || student.major === filterMajor;
      return matchesSearch && matchesFilter;
    });
  }, [students, searchTerm, filterMajor]);

  return (
    <>
      <Navbar
        bg={theme === "light" ? "light" : "dark"}
        variant={theme}
        className="mb-4 shadow-sm border-bottom"
      >
        <Container>
          <Navbar.Brand className="fw-bold text-primary">
            Student Management
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Button
              variant={theme === "light" ? "primary" : "light"}
              className={theme === "dark" ? "text-dark fw-bold" : "fw-bold"}
              onClick={toggleTheme}
            >
              {theme === "light" ? (
                <>
                  <LuMoon className="me-2" /> Dark Mode
                </>
              ) : (
                <>
                  <LuSun className="me-2" /> Light Mode
                </>
              )}
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Row>
          <Col lg={4}>
            <StudentForm
              onAddStudent={handleAddStudent}
              editingStudent={editingStudent}
              onUpdateStudent={handleUpdateStudent}
            />
          </Col>

          <Col lg={8}>
            <Card className="mb-4">
              <Card.Header
                as="h5"
                className="d-flex justify-content-between align-items-center"
              >
                <span>Student List</span>
                <Badge bg="primary">
                  Total Students: {filteredStudents.length}
                </Badge>
              </Card.Header>
              <Card.Body>
                <FilterBar
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  filterMajor={filterMajor}
                  onFilterChange={setFilterMajor}
                />

                <StudentList
                  students={filteredStudents}
                  onEditStudent={setEditingStudent}
                  onDeleteStudent={handleDeleteStudent}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default StudentManagementSystem;
