import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import EmployeesPage from './pages/EmployeesPage';
import { Container } from '@mui/material';
import Header from './components/Header';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


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
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </Router>
  );
}

export default App;
