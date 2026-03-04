import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EmployeeForm from "../components/EmployeeForm";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";


describe("EmployeeForm", () => {

  test("submits valid form", async () => {
    const onSubmit = jest.fn();

    render(
      <EmployeeForm
        onSubmit={onSubmit}
        employee={null}
        countries={[{ id: 1, country: "India" }]}
      />
    );

    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Sample" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "sample@test.com" } });
    fireEvent.change(screen.getByLabelText("Mobile"), { target: { value: "1234567890" } });
    fireEvent.change(screen.getByLabelText("State"), { target: { value: "Maharashtra" } });
    fireEvent.change(screen.getByLabelText("District"), { target: { value: "Pune" } });

    await userEvent.click(screen.getByLabelText("Country"));
    await userEvent.click(screen.getByRole("option", { name: "India" }));
    fireEvent.click(screen.getByText("Create"));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });
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