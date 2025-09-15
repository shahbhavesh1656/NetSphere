import { createSlice } from "@reduxjs/toolkit";

const operatorSlice = createSlice({
  name: "operator",
  initialState: {
    value: {
      name: "",
      email: "",
      password: "",
      address: "",
      mobile: ""
    }
  },
  reducers: {
    getOperatorData: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { getOperatorData } = operatorSlice.actions;

export default operatorSlice.reducer;
