import axios from "axios";

const API_BASE = "https://669b3f09276e45187d34eb4e.mockapi.io/api/v1";

export const api = axios.create({
  baseURL: API_BASE,
});

// Employee endpoints
export const getEmployees = () => api.get("/employee");
export const getEmployeeById = (id) => api.get(`/employee/${id}`);
export const createEmployee = (data) => api.post("/employee", data);
export const updateEmployee = (id, data) => api.put(`/employee/${id}`, data);
export const deleteEmployee = (id) => api.delete(`/employee/${id}`);

// Country endpoints
export const getCountries = () => api.get("/country");
