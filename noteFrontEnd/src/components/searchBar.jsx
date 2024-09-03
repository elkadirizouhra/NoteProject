// src/components/SearchBar.jsx
import React from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { searchNotes, setSearchTerm } from '../features/Notes/noteSlice'; // Adjust path as necessary

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.notes.searchTerm);

  const handleSearch = (event) => {
    event.preventDefault();
    dispatch(searchNotes(searchTerm));
  };

  return (
    <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
      <TextField
        variant="outlined"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        sx={{ flexGrow: 1, marginRight: 1 }}
      />
      <IconButton type="submit" color="primary">
        <SearchIcon />
      </IconButton>
    </Box>
  );
};

export default SearchBar;
