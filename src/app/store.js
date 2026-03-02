import { configureStore } from '@reduxjs/toolkit';
import employeesReducer from '../features/employees/employeesSlice';
import countriesReducer from '../features/countries/countriesSlice';

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
    countries: countriesReducer,
  },
});
