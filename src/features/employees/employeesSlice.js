import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from '../../api/api';

// Async thunks using your api.js
export const fetchEmployees = createAsyncThunk('employees/fetchAll', async () => {
  const response = await getEmployees();
  return response.data;
});

export const fetchEmployeeById = createAsyncThunk('employees/fetchById', async (id) => {
  const response = await getEmployeeById(id);
  return response.data;
});

export const addEmployee = createAsyncThunk('employees/add', async (employee) => {
  const response = await createEmployee(employee);
  return response.data;
});

export const editEmployee = createAsyncThunk('employees/update', async ({ id, data }) => {
  const response = await updateEmployee(id, data);
  return response.data;
});

export const removeEmployee = createAsyncThunk('employees/delete', async (id) => {
  await deleteEmployee(id);
  return id;
});

// Slice
const employeesSlice = createSlice({
  name: 'employees',
  initialState: {
    list: [],
    loading: false,
    error: null,
    selectedEmployee: null,
  },
  reducers: {
    clearSelectedEmployee: (state) => {
      state.selectedEmployee = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchEmployeeById.fulfilled, (state, action) => {
        state.selectedEmployee = action.payload;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(editEmployee.fulfilled, (state, action) => {
        const index = state.list.findIndex(emp => emp.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(removeEmployee.fulfilled, (state, action) => {
        state.list = state.list.filter(emp => emp.id !== action.payload);
      });
  },
});

export const { clearSelectedEmployee } = employeesSlice.actions;
export default employeesSlice.reducer;
