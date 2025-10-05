import { createSlice } from '@reduxjs/toolkit';

export const connectionModeSlice = createSlice({
  name: 'connectionMode',
  initialState: { value: '' },
  reducers: {
    setConnectionMode: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setConnectionMode } = connectionModeSlice.actions;
export default connectionModeSlice.reducer;
