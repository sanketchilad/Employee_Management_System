import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import EmployeesPage from './pages/EmployeesPage';
import { Container } from '@mui/material';
import Header from './components/Header';


function App() {
  return (
    <Router>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Navigate to="/employees" />} />
          <Route path="/employees" element={<EmployeesPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
