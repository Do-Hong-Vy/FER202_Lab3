import { Form, Row, Col } from "react-bootstrap";

const FilterBar = ({
  searchTerm,
  onSearchChange,
  filterMajor,
  onFilterChange,
}) => {
  return (
    <Row className="mb-4 g-3">
      <Col md={8}>
        <Form.Control
          type="text"
          placeholder="Search students by name or ID..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </Col>
      <Col md={4}>
        <Form.Select
          value={filterMajor}
          onChange={(e) => onFilterChange(e.target.value)}
        >
          <option value="All Majors">All Majors</option>
          <option value="Information Technology">Information Technology</option>
          <option value="Business Administration">
            Business Administration
          </option>
          <option value="Marketing">Marketing</option>
          <option value="Software Engineering">Software Engineering</option>
        </Form.Select>
      </Col>
    </Row>
  );
};

export default FilterBar;
