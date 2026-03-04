import reducer, {
  fetchEmployees,
  fetchEmployeeById,
  addEmployee,
  editEmployee,
  removeEmployee,
  clearSelectedEmployee,
} from "../features/employees/employeesSlice";

import * as api from "../api/api";

jest.mock("../api/api");

describe("employeesSlice", () => {
  const initialState = {
    list: [],
    loading: false,
    error: null,
    selectedEmployee: null,
  };

  const mockEmployees = [
    { id: "1", name: "Sample" },
    { id: "2", name: "Test" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Initial State
  test("should return initial state", () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });


  // fetchEmployees.pending
  test("should handle fetchEmployees.pending", () => {
    const action = { type: fetchEmployees.pending.type };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(true);
  });


  // fetchEmployees.fulfilled
  test("should handle fetchEmployees.fulfilled", () => {
    const action = {
      type: fetchEmployees.fulfilled.type,
      payload: mockEmployees,
    };

    const state = reducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.list).toEqual(mockEmployees);
  });


  // fetchEmployees.rejected
  test("should handle fetchEmployees.rejected", () => {
    const action = {
      type: fetchEmployees.rejected.type,
      error: { message: "Error occurred" },
    };

    const state = reducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe("Error occurred");
  });


  // fetchEmployeeById.fulfilled
  test("should set selectedEmployee on fetchEmployeeById.fulfilled", () => {
    const action = {
      type: fetchEmployeeById.fulfilled.type,
      payload: mockEmployees[0],
    };

    const state = reducer(initialState, action);

    expect(state.selectedEmployee).toEqual(mockEmployees[0]);
  });


  // addEmployee.fulfilled
  test("should add employee to list", () => {
    const action = {
      type: addEmployee.fulfilled.type,
      payload: { id: "3", name: "New Employee" },
    };

    const state = reducer(
      { ...initialState, list: mockEmployees },
      action
    );

    expect(state.list.length).toBe(3);
  });


  // editEmployee.fulfilled
  test("should update existing employee", () => {
    const updated = { id: "1", name: "Updated Sample" };

    const action = {
      type: editEmployee.fulfilled.type,
      payload: updated,
    };

    const state = reducer(
      { ...initialState, list: mockEmployees },
      action
    );

    expect(state.list[0].name).toBe("Updated Sample");
  });


  // removeEmployee.fulfilled
  test("should remove employee from list", () => {
    const action = {
      type: removeEmployee.fulfilled.type,
      payload: "1",
    };

    const state = reducer(
      { ...initialState, list: mockEmployees },
      action
    );

    expect(state.list.length).toBe(1);
    expect(state.list[0].id).toBe("2");
  });


  // clearSelectedEmployee
  test("should clear selected employee", () => {
    const stateWithSelected = {
      ...initialState,
      selectedEmployee: mockEmployees[0],
    };

    const state = reducer(stateWithSelected, clearSelectedEmployee());

    expect(state.selectedEmployee).toBeNull();
  });


  // THUNK TESTS
  // fetchEmployees thunk success
  test("fetchEmployees dispatches fulfilled on success", async () => {
    api.getEmployees.mockResolvedValue({ data: mockEmployees });

    const dispatch = jest.fn();
    const getState = jest.fn();

    await fetchEmployees()(dispatch, getState, undefined);

    expect(api.getEmployees).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: fetchEmployees.pending.type })
    );
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: fetchEmployees.fulfilled.type,
        payload: mockEmployees,
      })
    );
  });


  // addEmployee thunk success
  test("addEmployee dispatches fulfilled", async () => {
    const newEmp = { id: "3", name: "Added" };
    api.createEmployee.mockResolvedValue({ data: newEmp });

    const dispatch = jest.fn();

    await addEmployee(newEmp)(dispatch, jest.fn(), undefined);

    expect(api.createEmployee).toHaveBeenCalledWith(newEmp);
  });


  // editEmployee thunk success
  test("editEmployee dispatches fulfilled", async () => {
    const updated = { id: "1", name: "Updated" };
    api.updateEmployee.mockResolvedValue({ data: updated });

    const dispatch = jest.fn();

    await editEmployee({ id: "1", data: updated })(
      dispatch,
      jest.fn(),
      undefined
    );

    expect(api.updateEmployee).toHaveBeenCalledWith("1", updated);
  });


  // removeEmployee thunk success
  test("removeEmployee dispatches fulfilled", async () => {
    api.deleteEmployee.mockResolvedValue({});

    const dispatch = jest.fn();

    await removeEmployee("1")(dispatch, jest.fn(), undefined);

    expect(api.deleteEmployee).toHaveBeenCalledWith("1");
  });


  test("fetchEmployeeById dispatches fulfilled on success", async () => {
    const employee = { id: "1", name: "Sample" };
    api.getEmployeeById.mockResolvedValue({ data: employee });

    const dispatch = jest.fn();
    const getState = jest.fn();

    await fetchEmployeeById("1")(dispatch, getState, undefined);

    expect(api.getEmployeeById).toHaveBeenCalledWith("1");
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: fetchEmployeeById.pending.type })
    );
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: fetchEmployeeById.fulfilled.type,
        payload: employee,
      })
    );
  });


  test("editEmployee.fulfilled does nothing if employee not found", () => {
    const updated = { id: "99", name: "Ghost" }; 

    const action = {
      type: editEmployee.fulfilled.type,
      payload: updated,
    };

    const state = reducer(
      { list: [{ id: "1", name: "Sample" }], loading: false, error: null, selectedEmployee: null },
      action
    );

    expect(state.list).toEqual([{ id: "1", name: "Sample" }]);
  });
});