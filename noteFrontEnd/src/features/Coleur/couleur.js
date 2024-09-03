import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedColor: "",
  isCardVisible: false,
  noteId: null,
  title: "",
  content: "", 
  isUpdate: false, // New property to distinguish between create and update
};

const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {
    setColor: (state, action) => {
      state.selectedColor = action.payload;
    },
    showCard: (state, action) => {
      state.isCardVisible = true;
      state.noteId = action.payload?.id || null; 
      state.title = action.payload?.title || ""; 
      state.content = action.payload?.content || ""; 
      state.isUpdate = action.payload?.isUpdate || false;
    },
    hideCard: (state) => {
      state.isCardVisible = false;
      state.noteId = null;
      state.title = "";
      state.content = "";
      state.isUpdate = false; 
    },
  },
});

export const { setColor, showCard, hideCard } = colorSlice.actions;
export default colorSlice.reducer;
