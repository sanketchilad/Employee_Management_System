// Mock axios BEFORE importing apiModule
jest.mock("axios", () => {
  const mockApi = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  };
  return {
    create: jest.fn(() => mockApi),
    __mockApi: mockApi,
  };
});

import * as apiModule from "../api/api";

describe("API Layer", () => {
  let mockApi;

  // retrieve the mockApi from the mocked axios module
  beforeEach(() => {
    mockApi = require("axios").__mockApi;
    jest.clearAllMocks();
  });


  test("getEmployees calls correct endpoint", async () => {
    mockApi.get.mockResolvedValue({ data: [] });
    await apiModule.getEmployees();
    expect(mockApi.get).toHaveBeenCalledWith("/employee");
  });


  test("getEmployeeById calls correct endpoint", async () => {
    mockApi.get.mockResolvedValue({ data: {} });
    await apiModule.getEmployeeById(1);
    expect(mockApi.get).toHaveBeenCalledWith("/employee/1");
  });


  test("createEmployee posts data", async () => {
    const data = { name: "Sample" };
    mockApi.post.mockResolvedValue({ data });
    await apiModule.createEmployee(data);
    expect(mockApi.post).toHaveBeenCalledWith("/employee", data);
  });


  test("updateEmployee updates data", async () => {
    const data = { name: "Test" };
    mockApi.put.mockResolvedValue({ data });
    await apiModule.updateEmployee(1, data);
    expect(mockApi.put).toHaveBeenCalledWith("/employee/1", data);
  });


  test("deleteEmployee deletes employee", async () => {
    mockApi.delete.mockResolvedValue({});
    await apiModule.deleteEmployee(1);
    expect(mockApi.delete).toHaveBeenCalledWith("/employee/1");
  });


  test("getCountries calls correct endpoint", async () => {
    mockApi.get.mockResolvedValue({ data: [] });
    await apiModule.getCountries();
    expect(mockApi.get).toHaveBeenCalledWith("/country");
  });
});
