import { createSlice } from "@reduxjs/toolkit";

const customerSlice = createSlice({
  name: "customer",
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
    getCustomerData: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { getCustomerData } = customerSlice.actions;

export default customerSlice.reducer;
