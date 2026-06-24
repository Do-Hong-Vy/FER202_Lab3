# Các Kịch Bản Bị Giảng Viên Bắt Code Thêm Lúc Chấm Lab 3
*(Đã kèm Code Chuẩn - Chỉ việc Copy/Paste)*

---

## TÌNH HUỐNG 1: "Thêm cho tôi ô nhập Số Điện Thoại (Phone) vào Form"

**BƯỚC 1: Mở `src/components/StudentForm.jsx`**
Khai báo state ở trên cùng:
```javascript
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [major, setMajor] = useState("Information Technology");
  const [phone, setPhone] = useState(""); // <--- THÊM DÒNG NÀY
```

Trong hàm `useEffect` (dòng 16), thêm:
```javascript
  useEffect(() => {
    if (editingStudent) {
      setName(editingStudent.name);
      setAge(editingStudent.age);
      setMajor(editingStudent.major);
      setPhone(editingStudent.phone || ""); // <--- THÊM DÒNG NÀY
    } else {
...
```

Trong hàm `handleSubmit` (dòng 50), thêm `phone` vào payload:
```javascript
    if (editingStudent) {
      onUpdateStudent({
        ...editingStudent,
        name: trimmedName,
        age: parseInt(age, 10),
        major,
        phone, // <--- THÊM DÒNG NÀY
      });
    } else {
      onAddStudent({
        id: Date.now().toString(),
        name: trimmedName,
        age: parseInt(age, 10),
        major,
        phone, // <--- THÊM DÒNG NÀY
      });
...
```

Trong giao diện JSX (Form), thêm đoạn này ngay dưới ô Age (khoảng dòng 104):
```javascript
        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Group>
```

**BƯỚC 2: Mở `src/components/StudentList.jsx`**
Thêm tiêu đề bảng (dòng 30):
```javascript
            <th>Age</th>
            <th>Phone</th> {/* <--- THÊM DÒNG NÀY */}
            <th>Major</th>
```
Hiển thị dữ liệu bảng (dòng 40):
```javascript
              <td>{student.age}</td>
              <td>{student.phone}</td> {/* <--- THÊM DÒNG NÀY */}
              <td>
```

---

## TÌNH HUỐNG 2: "Không cho phép nhập trùng Tên sinh viên"

**BƯỚC 1: Truyền danh sách `students` vào Form**
Mở `src/components/StudentManagementSystem.jsx` (dòng 146):
```javascript
              <StudentForm
                students={students} // <--- THÊM DÒNG NÀY
                onAddStudent={handleAddStudent}
                onUpdateStudent={handleUpdateStudent}
                editingStudent={editingStudent}
                clearEdit={() => setEditingStudent(null)}
              />
```

**BƯỚC 2: Check trùng lặp**
Mở `src/components/StudentForm.jsx`. 
Sửa tham số nhận vào (dòng 5):
```javascript
const StudentForm = ({ students, onAddStudent, onUpdateStudent, editingStudent, clearEdit }) => {
```
Thêm code check vào giữa hàm `handleSubmit` (ngay dưới đoạn check `/\d/.test` - dòng 41):
```javascript
    // THÊM ĐOẠN CODE NÀY VÀO TRƯỚC KHI GỌI onAddStudent
    const isDuplicate = students?.some(
      (s) => s.name.toLowerCase() === trimmedName.toLowerCase() && s.id !== editingStudent?.id
    );
    if (isDuplicate) {
      setError("Tên sinh viên này đã tồn tại!");
      return;
    }
```

---

## TÌNH HUỐNG 3: "Viết thêm nút 'Xóa Tất Cả' (Clear All)"

**BƯỚC 1: Cập nhật Reducer**
Mở `src/hooks/studentReducer.js` (dòng 14). Thêm case `CLEAR_ALL`:
```javascript
    case 'DELETE_STUDENT':
      return state.filter(student => student.id !== action.payload);
    
    case 'CLEAR_ALL': // <--- THÊM ĐOẠN NÀY
      return [];      // <--- THÊM ĐOẠN NÀY

    case 'LOAD_STUDENTS':
```

**BƯỚC 2: Gắn nút vào giao diện**
Mở `src/components/StudentManagementSystem.jsx`.
Tạo hàm xóa (Dưới dòng 75):
```javascript
  const handleClearAll = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa toàn bộ sinh viên không?")) {
      dispatch({ type: "CLEAR_ALL" });
    }
  };
```
Kéo xuống UI phần `FilterBar` (Dòng 130), thêm 1 cái Button kế bên:
```javascript
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <FilterBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                filterMajor={filterMajor}
                onFilterChange={setFilterMajor}
              />
              {/* THÊM NÚT NÀY VÀO GÓC PHẢI */}
              <Button variant="danger" onClick={handleClearAll} className="ms-3 mb-4">
                Clear All
              </Button>
            </div>
```

---

## TÌNH HUỐNG 4: "Sắp xếp sinh viên theo Tuổi từ thấp đến cao"

**BƯỚC 1: Khai báo State**
Mở `src/components/StudentManagementSystem.jsx`.
```javascript
  const [filterMajor, setFilterMajor] = useState("All Majors");
  const [sortAge, setSortAge] = useState(false); // <--- THÊM DÒNG NÀY
```

**BƯỚC 2: Cập nhật logic useMemo**
Tại dòng 85, sửa đoạn cuối của hàm `filteredStudents`:
```javascript
  const filteredStudents = useMemo(() => {
    let result = students.filter((student) => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterMajor === "All Majors" || student.major === filterMajor;
      return matchesSearch && matchesFilter;
    });

    // THÊM ĐOẠN SORT NÀY VÀO TRƯỚC KHI RETURN
    if (sortAge) {
      result = result.sort((a, b) => a.age - b.age);
    }
    return result;

  }, [students, searchTerm, filterMajor, sortAge]); // <--- NHỚ THÊM sortAge VÀO ĐÂY
```

**BƯỚC 3: Tạo Checkbox trên giao diện**
Kéo xuống dưới cùng (dòng 138), chỗ Total Students:
```javascript
                <Badge bg="primary" className="me-3">
                  Total Students: {filteredStudents.length}
                </Badge>
                {/* THÊM CHECKBOX VÀO ĐÂY */}
                <Form.Check 
                  type="switch"
                  id="sort-age-switch"
                  label="Sắp xếp tuổi tăng dần"
                  checked={sortAge}
                  onChange={(e) => setSortAge(e.target.checked)}
                />
```

---

## TÌNH HUỐNG 6: "[useRef] Con trỏ tự động nhấp nháy vào ô Tên sau khi Add"

**BƯỚC 1: Import và khai báo**
Mở `src/components/StudentForm.jsx`.
```javascript
import { useState, useEffect, useRef } from 'react'; // <--- Thêm useRef vào đây

const StudentForm = ({ onAddStudent, onUpdateStudent, editingStudent, clearEdit }) => {
  const nameInputRef = useRef(null); // <--- THÊM DÒNG NÀY
```

**BƯỚC 2: Gắn vào Form và gọi lệnh Focus**
Tại dòng 82, gắn ref vào ô nhập:
```javascript
          <Form.Control
            ref={nameInputRef} // <--- THÊM DÒNG NÀY VÀO
            type="text"
            placeholder="Enter full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
```
Tại dòng 29 (trong hàm `clearForm`), gọi lệnh focus:
```javascript
  const clearForm = () => {
    setName("");
    setAge("");
    setMajor("Information Technology");
    setError("");
    clearEdit();
    nameInputRef.current?.focus(); // <--- THÊM DÒNG NÀY VÀO CUỐI
  };
```

---

## TÌNH HUỐNG 8: "[useMemo] In Tổng số tuổi"

**BƯỚC 1: Thêm useMemo**
Mở `src/components/StudentManagementSystem.jsx`. Kéo xuống dưới hàm `filteredStudents` (dòng 89):
```javascript
  // THÊM TOÀN BỘ ĐOẠN NÀY
  const totalAge = useMemo(() => {
    return filteredStudents.reduce((sum, student) => sum + student.age, 0);
  }, [filteredStudents]);
```

**BƯỚC 2: Hiển thị**
Tìm dòng chứa `<Badge bg="primary">` (Dòng 137), chèn thêm:
```javascript
                <Badge bg="primary">
                  Total Students: {filteredStudents.length}
                </Badge>
                {/* THÊM CÁI NÀY VÀO */}
                <Badge bg="success" className="ms-2">
                  Total Age: {totalAge}
                </Badge>
```

---

## TÌNH HUỐNG 10: "[useContext] Chuyển đổi Ngôn Ngữ Anh/Việt"

**BƯỚC 1: Cập nhật Provider**
Mở `src/contexts/ThemeContext.jsx`:
```javascript
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");
  const [language, setLanguage] = useState("EN"); // <--- THÊM DÒNG NÀY

  const toggleTheme = () => { ... };
  const toggleLanguage = () => setLanguage(l => l === "EN" ? "VI" : "EN"); // <--- THÊM DÒNG NÀY

  return (
    // THÊM language VÀ toggleLanguage VÀO value
    <ThemeContext.Provider value={{ theme, toggleTheme, language, toggleLanguage }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

**BƯỚC 2: Gọi ra dùng**
Mở `src/components/StudentManagementSystem.jsx`:
```javascript
// Cập nhật lấy language từ Context
const { theme, toggleTheme, language, toggleLanguage } = useContext(ThemeContext);

// Thay đổi nút trên Navbar
<Navbar bg={theme} variant={theme} className="shadow-sm">
  <Container>
    <Navbar.Brand className="fw-bold text-primary">
      {language === 'EN' ? 'Student Management' : 'Quản Lý Sinh Viên'}
    </Navbar.Brand>
    <div>
      <Button variant={theme === "light" ? "dark" : "light"} onClick={toggleTheme} className="me-2">
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </Button>
      <Button variant="info" onClick={toggleLanguage}>
        {language}
      </Button>
    </div>
  </Container>
</Navbar>
```
