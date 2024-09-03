import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isRadioVisible: false,
};

const radioSlice = createSlice({
  name: "radio",
  initialState,
  reducers: {
    showRadio: (state) => {
      state.isRadioVisible = true;
    },
    hideRadio: (state) => {
      state.isRadioVisible = false;
    },
  },
});

export default radioSlice.reducer;

export const { showRadio, hideRadio } = radioSlice.actions;
