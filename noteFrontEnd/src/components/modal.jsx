import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNote, updateNote } from "../features/Notes/noteSlice";
import { TextField, Box, Button, Typography, Modal } from "@mui/material";
import { hideCard } from "../features/Coleur/couleur";
import { hideRadio } from "../features/Radio/showRadio";

export default function BasicModal() {
  const dispatch = useDispatch();
  const selectedColor = useSelector((state) => state.color.selectedColor);
  const isCardVisible = useSelector((state) => state.color.isCardVisible);
  const isUpdate = useSelector((state) => state.color.isUpdate);
  const noteId = useSelector((state) => state.color.noteId);
  const initialTitle = useSelector((state) => state.color.title);
  const initialContent = useSelector((state) => state.color.content);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
  }, [initialTitle, initialContent]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: selectedColor || "#f5f5f5",
    border: "1px solid #ccc",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    p: 3,
    borderRadius: "4px",
    display: 'flex',
    flexDirection: 'column'
  };

  const handleSaveOrUpdateNote = () => {
    if (title.trim() && content.trim()) {
      if (isUpdate) {
        dispatch(updateNote({ id: noteId, title, content })) 
      } else {
        dispatch(createNote({ title, content, color: selectedColor }));
        dispatch(hideRadio());
      }
      dispatch(hideCard());
    }
  };

  const Close = () => {
    dispatch(hideCard());
    dispatch(hideRadio());
  };

  return (
    <>
      {isCardVisible && (
        <Modal
          open={isCardVisible}
          onClose={Close}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {isUpdate ? "Update Note" : "Add a New Note"}
            </Typography>
            <TextField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              label="Title"
              variant="outlined"
              sx={{ width: "100%", marginTop: 2 }}
            />
            <TextField
              multiline
              minRows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              sx={{ paddingTop: 2, width: "100%" }}
            />
            <Button
              onClick={handleSaveOrUpdateNote}
              variant="contained"
              sx={{ width: "100px", marginTop: 2, alignSelf: 'flex-end' }}
            >
              {isUpdate ? "Update" : "Save"}
            </Button>
          </Box>
        </Modal>
      )}
    </>
  );
}
