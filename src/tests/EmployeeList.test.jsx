import { render, screen, fireEvent } from "@testing-library/react";
import EmployeeList from "../components/EmployeeList";
import "@testing-library/jest-dom";

jest.mock("../pages/EmployeeDetailPage", () => () => (
  <div>EmployeeDetailPage Component</div>
));



describe("EmployeeList", () => {
  const employees = [
    {
      id: 1,
      name: "Sample Test",
      email: "sample@test.com",
      mobile: "1234567890",
      country: "India",
    },
  ];

  test("renders employee data", () => {
    render(
      <EmployeeList
        employees={employees}
        countries={[]}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
      />
    );

    expect(screen.getByText("Sample Test")).toBeInTheDocument();
    expect(screen.getByText("sample@test.com")).toBeInTheDocument();
  });


  test("calls onEdit when edit button clicked", async () => {
    const onEdit = jest.fn();

    render(
      <EmployeeList
        employees={employees}
        countries={[]}
        onEdit={onEdit}
        onDelete={jest.fn()}
      />
    );

    const editButtons = screen.getAllByTestId("EditOutlinedIcon");
    fireEvent.click(editButtons[0]);

    expect(onEdit).toHaveBeenCalledWith(employees[0]);
  });


  test("calls onDelete when delete button clicked", async () => {
    const onDelete = jest.fn();

    render(
      <EmployeeList
        employees={employees}
        countries={[]}
        onEdit={jest.fn()}
        onDelete={onDelete}
      />
    );

    const deleteButtons = screen.getAllByTestId("DeleteOutlineIcon");
    fireEvent.click(deleteButtons[0]);
    expect(onDelete).toHaveBeenCalledWith(1);
  });


  test("shows empty state when no employees", () => {
    render(
      <EmployeeList
        employees={[]}
        countries={[]}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
      />
    );

    expect(screen.getByText("No employees found")).toBeInTheDocument();
  });


  test("opens EmployeeDetailPage when name cell clicked", async () => {
    render(
      <EmployeeList
        employees={employees}
        countries={[]}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
      />
    );

    fireEvent.click(screen.getByText("Sample Test"));
    expect(screen.getByText("EmployeeDetailPage Component")).toBeInTheDocument();
  });
});