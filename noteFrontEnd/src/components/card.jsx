import * as React from 'react';
import { useEffect, useState } from 'react';
import { IconButton, Fab, Card, CardContent, Typography, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import Modal from './modal'; 
import { showCard } from '../features/Coleur/couleur';
import { fetchNotes, updateNote, deleteNote } from "../features/Notes/noteSlice";

export default function BasicCard() {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.notes.searchTerm); 
  const { notes, loading, error } = useSelector((state) => state.notes);
  const isCardVisible = useSelector((state) => state.color.isCardVisible);
  
  
  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdateNote = (id) => {
    const noteToUpdate = notes.find((note) => note.id === id);
    if (noteToUpdate) {
     
      dispatch(showCard({ id: noteToUpdate.id, title: noteToUpdate.title, content: noteToUpdate.content, isUpdate: true }));
    

    }
  };

  const handleDeleteNote = (id) => {
    dispatch(deleteNote(id));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Grid container spacing={2}>
        {filteredNotes.length === 0 ? (
          <Typography>No notes found</Typography>
        ) : (
          filteredNotes.map((note) => (
            <Grid item key={note.id}>
              <Card
                sx={{
                  backgroundColor: note.color,
                  margin: '20px',
                  width: '300px',
                  height: '200px',
                  borderRadius: '16px',
                  position: 'relative',
                }}
              >
                <CardContent
                  sx={{ display: 'flex', flexDirection: 'column', padding: '16px' }}
                >
                  <IconButton
                    sx={{ position: 'absolute', top: '10px', right: '10px' }}
                    onClick={() => handleDeleteNote(note.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <Typography variant="h5" component="div">
                    {note.title}
                  </Typography>
                  <Typography sx={{ mb: 2, mt: '20px' }}>{note.content}</Typography>

                  <IconButton
                    sx={{ position: 'absolute', bottom: '10px', right: '10px' }}
                    onClick={() => handleUpdateNote(note.id)}
                  >
                    <Fab color="primary" aria-label="edit" size="small">
                      <EditIcon />
                    </Fab>
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
      
    </>
  );
}
