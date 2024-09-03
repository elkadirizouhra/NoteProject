import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Box, IconButton, Typography } from "@mui/material";
import BasicModal from "./components/modal"; // Adjust the path as necessary
import BasicCard from "./components/card";
import SearchBar from "./components/searchBar";

import { showRadio } from "./features/Radio/showRadio";
import ColoredRadioGroup from "./components/colorCard";
import { setSearchTerm } from "./features/Notes/noteSlice"; // Import setSearchTerm action

const App = () => {
  const isCardVisible = useSelector((state) => state.color.isCardVisible);
  const dispatch = useDispatch();
  const isRadioVisible = useSelector((state) => state.radio.isRadioVisible); // Corrected selector
  const searchTerm = useSelector((state) => state.notes.searchTerm); // Added searchTerm selector

  const handleAddClick = () => {
    dispatch(showRadio());
    // Opens the modal as per your feature requirement
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          borderRight: "2px solid grey",
          width: "10%",
          minHeight: "100vh",
          position: "relative",
          display: "flex"
        }}
      >
        <IconButton
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            marginTop: "100px",
          }}
          onClick={handleAddClick}
        >
          <Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </IconButton>
        {isRadioVisible && (
          <Box sx={{ marginTop: "200px" }}> {/* Box wrapper for margin-top */}
            <ColoredRadioGroup />
          </Box>
        )}
      </Box>
      <Box sx={{ width: "90%", marginLeft: "20px" }}>
        <Box sx={{ marginLeft: "20px" }}>
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={(term) => dispatch(setSearchTerm(term))}
          />
        </Box>
        <Box>
          {isCardVisible && <BasicModal isUpdate={false} />}
        </Box>
        <Box sx={{ marginTop: "60px" }}>
          <Typography
            variant="h3"
            sx={{ color: "black", marginLeft: "20px", marginBottom: "50px" }}
          >
            Notes
          </Typography>
          <BasicCard />
        </Box>
      </Box>
    </Box>
  );
};

export default App;
