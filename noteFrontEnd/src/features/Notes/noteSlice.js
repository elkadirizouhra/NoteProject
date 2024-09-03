import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

// Existing async thunks
export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
  const response = await axios.get(`${BASE_URL}/notes`);
  return response.data;
});

export const createNote = createAsyncThunk('notes/createNote', async (note) => {
  const response = await axios.post(`${BASE_URL}/note`, note);
  return response.data;
});

export const updateNote = createAsyncThunk('notes/updateNote', async ({ id, content }) => {
  const response = await axios.put(`${BASE_URL}/note/${id}`, { content });
  return response.data;
});

export const deleteNote = createAsyncThunk('notes/deleteNote', async (id) => {
  await axios.delete(`${BASE_URL}/note/${id}`);
  return id;
});

// New async thunk for search
export const searchNotes = createAsyncThunk('notes/searchNotes', async (searchTerm) => {
  const response = await axios.get(`${BASE_URL}/notes/search`, {
    params: { q: searchTerm }
  });
  return response.data;
});

const noteSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: [],
    loading: false,
    error: null,
    searchTerm: '',  // Added searchTerm to the state
  },
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        const index = state.notes.findIndex((note) => note.id === action.payload.id);
        if (index !== -1) {
          state.notes[index] = action.payload;
        }
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter((note) => note.id !== action.payload);
      })
      .addCase(searchNotes.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
      })
      .addCase(searchNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { setSearchTerm } = noteSlice.actions;
export default noteSlice.reducer;
