import { ThemeProvider } from './contexts/ThemeContext';
import StudentManagementSystem from './components/StudentManagementSystem';

function App() {
  return (
    <ThemeProvider>
      <StudentManagementSystem />
    </ThemeProvider>
  );
}

export default App;
