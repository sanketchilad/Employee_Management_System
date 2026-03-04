import reducer, { fetchCountries } from "../features/countries/countriesSlice";
import * as api from "../api/api";

jest.mock("../api/api");

describe("countriesSlice", () => {
  const initialState = {
    list: [],
    loading: false,
    error: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test Initial State
  test("should return the initial state", () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  // Test Pending State
  test("should handle fetchCountries.pending", () => {
    const action = { type: fetchCountries.pending.type };
    const state = reducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  // Test Fulfilled State
  test("should handle fetchCountries.fulfilled", () => {
    const mockCountries = [
      { id: 1, country: "USA" },
      { id: 2, country: "India" },
    ];

    const action = {
      type: fetchCountries.fulfilled.type,
      payload: mockCountries,
    };

    const state = reducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.list).toEqual(mockCountries);
  });

  // Test Rejected State
  test("should handle fetchCountries.rejected", () => {
    const action = {
      type: fetchCountries.rejected.type,
      error: { message: "Network Error" },
    };

    const state = reducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe("Network Error");
  });

  //  Test Async Thunk (API Call)
  test("fetchCountries thunk dispatches fulfilled on success", async () => {
    const mockData = [{ id: 1, country: "USA" }];
    api.getCountries.mockResolvedValue({ data: mockData });

    const dispatch = jest.fn();
    const getState = jest.fn();

    await fetchCountries()(dispatch, getState, undefined);

    expect(api.getCountries).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: fetchCountries.pending.type,
      })
    );
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: fetchCountries.fulfilled.type,
        payload: mockData,
      })
    );
  });
});