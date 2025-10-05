import { createSlice } from '@reduxjs/toolkit';

export const areaSlice = createSlice({
  name: 'area',
  initialState: { value: '' },
  reducers: {
    setArea: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setArea } = areaSlice.actions;
export default areaSlice.reducer;
