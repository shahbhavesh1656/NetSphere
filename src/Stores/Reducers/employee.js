import { createSlice } from "@reduxjs/toolkit";

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    value: {
      name: "",
      email: "",
      password: "",
      address: "",
      area:"",
      mobile: ""
    }
  },
  reducers: {
    getEmployeeData: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { getEmployeeData } = employeeSlice.actions;

export default employeeSlice.reducer;
