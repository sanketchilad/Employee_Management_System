import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EmployeeForm from "../components/EmployeeForm";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { act } from "@testing-library/react";


describe("EmployeeForm", () => {
  test("does not submit when empty", async () => {
    const onSubmit = jest.fn();

    render(
      <EmployeeForm
        onSubmit={onSubmit}
        employee={null}
        countries={[{ id: 1, country: "India" }]}
      />
    );

    await act(async () => { await userEvent.click(screen.getByRole("button", { name: /create/i })); });
    expect(onSubmit).not.toHaveBeenCalled();

    expect(await screen.findByText("Name is required"))
      .toBeInTheDocument();
  });


  test("loads employee data into form when editing", async () => {
    const existingEmployee = {
      name: "Test",
      email: "test@test.com",
      mobile: "9876543210",
      state: "Maharashtra",
      district: "Pune",
      country: "India",
    };

    render(
      <EmployeeForm
        onSubmit={jest.fn()}
        employee={existingEmployee}
        countries={[{ id: 1, country: "India" }]}
      />
    );

    expect(screen.getByLabelText("Name")).toHaveValue("Test");
    expect(screen.getByLabelText("Email")).toHaveValue("test@test.com");
    expect(screen.getByLabelText("Mobile")).toHaveValue("9876543210");
    expect(screen.getByLabelText("State")).toHaveValue("Maharashtra");
    expect(screen.getByLabelText("District")).toHaveValue("Pune");
    expect(screen.getByLabelText("Country")).toHaveTextContent("India");
  });
});