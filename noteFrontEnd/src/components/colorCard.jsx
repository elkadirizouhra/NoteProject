import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { setColor, showCard } from "../features/Coleur/couleur"; // Import des actions setColor et showCard

const colorOptions = [
  { label: "Orange", value: "#FFAB91" },
  { label: "Green", value: "#81C784" },
  { label: "Blue", value: "#4FC3F7" },
  { label: "Purple", value: "#9575CD" },
 
];

const ColoredRadioGroup = () => {
  const dispatch = useDispatch();
  const selectedColor = useSelector((state) => state.color.selectedColor);

  const handleColorChange = (event) => {
    dispatch(setColor(event.target.value)); // Définir la couleur sélectionnée
    dispatch(showCard()); // Afficher la carte lorsque la couleur est sélectionnée
  };

  return (
    <Box sx={{ textAlign: "center", paddingTop: 4 }}>
      <RadioGroup
        row
        value={selectedColor}
        onChange={handleColorChange}
        sx={{marginLeft:"30px" }}
      >
        {colorOptions.map((colorOption) => (
          <FormControlLabel
            key={colorOption.value}
            value={colorOption.value}
            control={
              <Radio
                sx={{
                  color: colorOption.value,
                  "&.Mui-checked": {
                    color: colorOption.value,
                  },
                }}
              />
            }
            label={colorOption.label}
          />
        ))}
      </RadioGroup>
    </Box>
  );
};

export default ColoredRadioGroup
