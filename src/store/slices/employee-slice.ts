import { EmployeeResponse } from "@/src/types/modules/employee/response";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface EmployeeState {
  data: EmployeeResponse; // nanti bisa ganti type Employee
}

const initialState: EmployeeState = {
  data: {} as EmployeeResponse,
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setEmployee(state, action: PayloadAction<EmployeeResponse>) {
      state.data = action.payload;
    },
    clearEmployee(state) {
      state.data = {} as EmployeeResponse;
    },
  },
});

export const { setEmployee, clearEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
