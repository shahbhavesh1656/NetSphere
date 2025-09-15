import { createSlice } from "@reduxjs/toolkit";

const BookConnectionSlice = createSlice({
  name: "bookconnection",
  initialState: {
    value: {
      name: "",
      email: "",
      address: "",
      area:"",
      mobile: "",
      connection_name:"",
      connection_mode:"",
      plan_name:"",
      subscription:"",
      package:"",
      amount:"",
      payment_status:"",
      connection_status:"",
    }
  },
  reducers: {
    getBookedConnectionData: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { getBookedConnectionData } = BookConnectionSlice.actions;

export default BookConnectionSlice.reducer;
