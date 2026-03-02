import { useState } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Paper,
  Box,
  IconButton,
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EmployeeDetailPage from '../pages/EmployeeDetailPage';
import '../scss/EmployeeList.scss';


const EmployeeList = ({ employees, countries, onEdit, onDelete }) => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);

if (employees.length === 0) {
  return (
    <Box className="emptyState">
      <Typography variant="h6" className="noResults">
        No employees found
      </Typography>
      <Typography variant="body2">
        Try adjusting your search or add a new employee.
      </Typography>
    </Box>
  );
}

return (
    <>
      <Paper elevation={2} className="tablePaper">
        <Table>
          <TableHead>
            <TableRow className="tableHeaderRow">
              <TableCell className="tableHeaderCell">Name</TableCell>
              <TableCell className="tableHeaderCell">Email</TableCell>
              <TableCell className="tableHeaderCell">Mobile</TableCell>
              <TableCell className="tableHeaderCell">Country</TableCell>
              <TableCell className="tableHeaderCell" align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {employees.map((emp) => (
              <TableRow key={emp.id} hover className="tableRow">
                <TableCell
                  onClick={() => setSelectedEmployee(emp)}
                  className="nameCell"
                >
                  {emp.name}
                </TableCell>

                <TableCell>{emp.email}</TableCell>

                <TableCell>{emp.mobile}</TableCell>

                <TableCell>{emp.country}</TableCell>

                <TableCell align="right">
                  <Box className="actionsBox">
                    <IconButton
                      size="small"
                      onClick={() => onEdit(emp)}
                      className="editButton"
                    >
                      <EditOutlinedIcon fontSize="small" />
                    </IconButton>

                    <IconButton
                      size="small"
                      onClick={() => onDelete(emp.id)}
                      className="deleteButton"
                    >
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <EmployeeDetailPage
        employee={selectedEmployee}
        countries={countries}
        onClose={() => setSelectedEmployee(null)}
      />
    </>
  )
};

export default EmployeeList;