import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EmployeesPage from "../pages/EmployeesPage";
import { useDispatch, useSelector } from "react-redux";
import "@testing-library/jest-dom";
import { toast } from "react-toastify";

jest.mock("react-redux");

jest.mock("@mui/material/Dialog", () => (props) => (
  props.open ? <div>{props.children}</div> : null
));

jest.mock("@mui/material/Dialog", () => (props) => (
  props.open ? (
    <div data-testid="dialog" onClick={props.onClose}>
      {props.children}
    </div>
  ) : null
));


jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock child components to isolate EmployeesPage
jest.mock("../components/EmployeeList", () => (props) => (
  <div>
    EmployeeList Component
    <button onClick={() => props.onEdit({ id: 1, name: "Sample" })}>
      Mock Edit
    </button>
    <button onClick={() => props.onDelete(1)}>
      Mock Delete
    </button>
  </div>
));

jest.mock("../components/EmployeeForm", () => (props) => (
  <div>
    EmployeeForm Component
    <button onClick={() => props.onSubmit({ name: "New Employee" })}>
      Submit Form
    </button>
    <button onClick={props.onCancel}>Cancel</button>
  </div>
));

jest.mock("../components/SearchBar", () => (props) => (
  <input
    data-testid="search-input"
    value={props.searchTerm}
    onChange={(e) => props.setSearchTerm(e.target.value)}
  />
));

jest.mock("../components/Pagination", () => () => (
  <div>Pagination Component</div>
));

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  console.error.mockRestore();
});

describe("EmployeesPage", () => {
  const mockDispatch = jest.fn();

  const mockState = {
    employees: {
      list: [
        { id: 1, name: "Sample", email: "sample@test.com" },
        { id: 2, name: "Test", email: "test@test.com" },
      ],
      loading: false,
    },
    countries: {
      list: [{ id: 1, country: "India" }],
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockImplementation((selector) => selector(mockState));
  });


  // BASIC RENDER
  test("renders page title", () => {
    render(<EmployeesPage />);
    expect(screen.getByText("Employees")).toBeInTheDocument();
  });


  test("shows loading state", () => {
    useSelector.mockImplementation((selector) =>
      selector({
        employees: { list: [], loading: true },
        countries: { list: [] },
      })
    );

    render(<EmployeesPage />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });


  // ADD FLOW
  test("opens Add Employee modal", () => {
    render(<EmployeesPage />);
    fireEvent.click(screen.getByText(/Add/i));
    expect(screen.getByText("EmployeeForm Component")).toBeInTheDocument();
  });


  test("creates employee on form submit", async () => {
    render(<EmployeesPage />);
    fireEvent.click(screen.getByText(/Add/i));
    fireEvent.click(screen.getByText("Submit Form"));
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalled();
    });
  });


  // EDIT FLOW
  test("opens edit modal when edit clicked", () => {
    render(<EmployeesPage />);
    fireEvent.click(screen.getByText("Mock Edit"));
    expect(screen.getByText("EmployeeForm Component")).toBeInTheDocument();
  });


  test("updates employee on form submit when editingEmployee is set", async () => {
    render(<EmployeesPage />);
    fireEvent.click(screen.getByText("Mock Edit"));
    expect(screen.getByText("EmployeeForm Component")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Submit Form"));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
      expect(toast.success).toHaveBeenCalledWith("Employee updated successfully!");
    });
  });


  // DELETE FLOW
  test("opens delete confirmation dialog", () => {
    render(<EmployeesPage />);
    fireEvent.click(screen.getByText("Mock Delete"));

    expect(
      screen.getByText("Are you sure you want to delete this employee?")
    ).toBeInTheDocument();
  });


  test("confirms delete", async () => {
    render(<EmployeesPage />);
    fireEvent.click(screen.getByText("Mock Delete"));
    fireEvent.click(screen.getByText("Delete"));
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalled();
    });
  });


  test("cancels delete dialog", () => {
    render(<EmployeesPage />);
    fireEvent.click(screen.getByText("Mock Delete"));
    fireEvent.click(screen.getByText("Cancel"));

    expect(
      screen.queryByText("Are you sure you want to delete this employee?")
    ).not.toBeInTheDocument();
  });


  test("closes modal when cancel is clicked", async () => {
    render(<EmployeesPage />);
    fireEvent.click(screen.getByText(/Add/i));
    expect(screen.getByText("EmployeeForm Component")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Cancel"));

    await waitFor(() => {
      expect(
        screen.queryByText("EmployeeForm Component")
      ).not.toBeInTheDocument();
    });
  });


  // SEARCH FUNCTIONALITY
  test("filters employees via search", () => {
    render(<EmployeesPage />);
    const input = screen.getByTestId("search-input");
    fireEvent.change(input, { target: { value: "Jane" } });
    expect(input.value).toBe("Jane");
  });


  test("covers Dialog onClose", async () => {
    render(<EmployeesPage />);
    fireEvent.click(screen.getByText(/Add/i));
    expect(screen.getByTestId("dialog")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("dialog"));

    await waitFor(() =>
      expect(screen.queryByTestId("dialog")).not.toBeInTheDocument()
    );
  });


  test("closes modal when close icon is clicked", async () => {
    render(<EmployeesPage />);
    fireEvent.click(screen.getByText(/Add/i));
    expect(screen.getByText("EmployeeForm Component")).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText("close"));

    await waitFor(() => {
      expect(
        screen.queryByText("EmployeeForm Component")
      ).not.toBeInTheDocument();
    });
  });
});