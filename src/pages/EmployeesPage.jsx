import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchEmployees,
  addEmployee,
  editEmployee,
  removeEmployee,
} from '../features/employees/employeesSlice';
import { fetchCountries } from '../features/countries/countriesSlice';
import EmployeeList from '../components/EmployeeList';
import EmployeeForm from '../components/EmployeeForm';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Paper,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import '../scss/EmployeePage.scss';

const EmployeesPage = () => {
  const dispatch = useDispatch();
  const { list: employees, loading } = useSelector((state) => state.employees);
  const { list: countries } = useSelector((state) => state.countries);

  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    dispatch(fetchEmployees());
    dispatch(fetchCountries());
  }, [dispatch]);

  const handleAddOrEdit = (data) => {
    if (editingEmployee) {
      dispatch(editEmployee({ id: editingEmployee.id, data }));
    } else {
      dispatch(addEmployee(data));
    }
    setOpenModal(false);
    setEditingEmployee(null);
  };


    const handleDelete = (id) => {
      setSelectedId(id);
      setOpenDeleteDialog(true);
    };

    const handleConfirmDelete = () => {
      dispatch(removeEmployee(selectedId));
      setOpenDeleteDialog(false);
      setSelectedId(null);
    };

    const handleCloseDelete = () => {
      setOpenDeleteDialog(false);
      setSelectedId(null);
    };

    const filteredEmployees = employees.filter((emp) =>
    emp.id.toString().includes(searchTerm) ||
    emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedEmployees = filteredEmployees.slice((page - 1) * 10, page * 10);

  return (
      <Box className="employeesPage">
        {/* Header */}
        <Box className="pageHeader">
          <Typography variant="h5" className="pageTitle">
            Employees
          </Typography>

          <Box className="headerRight">
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />

            <Button
              variant="contained"
              className="addButton"
              onClick={() => {
                setEditingEmployee(null);
                setOpenModal(true);
              }}
            >
              Add Employee
            </Button>
          </Box>
        </Box>

        {/* Table */}
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <>
            <Paper elevation={2} className="tableWrapper">
              <EmployeeList
                employees={paginatedEmployees}
                countries={countries}
                onEdit={(emp) => {
                  setEditingEmployee(emp);
                  setOpenModal(true);
                }}
                onDelete={handleDelete}
              />
            </Paper>

            <Pagination
              total={filteredEmployees.length}
              page={page}
              setPage={setPage}
            />
          </>
        )}

        {/* Add/Edit Modal */}
        <Dialog
          open={openModal}
          onClose={() => setOpenModal(false)}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle>
            <Box className="dialogTitleBox">
              <Typography variant="h6" className="dialogTitle">
                {editingEmployee ? "Edit Employee" : "Add Employee"}
              </Typography>

              <IconButton
                onClick={() => setOpenModal(false)}
                size="small"
                className="closeButton"
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>

          <DialogContent className="dialogContent">
            <EmployeeForm
              onSubmit={handleAddOrEdit}
              employee={editingEmployee}
              countries={countries}
              onCancel={() => setOpenModal(false)}
            />
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={openDeleteDialog}
          onClose={handleCloseDelete}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle>Confirm Delete</DialogTitle>

          <DialogContent>
            <Typography className="confirmText">
              Are you sure you want to delete this employee?
            </Typography>

            <Box className="deleteActions">
              <Button
                variant="outlined"
                onClick={handleCloseDelete}
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                color="error"
                onClick={handleConfirmDelete}
              >
                Delete
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    );
  };

export default EmployeesPage;