package com.example.walletapp.services;

import com.example.walletapp.models.Note;
import com.example.walletapp.repositories.NoteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class NoteService {
    private final NoteRepository noteRepository;
    NoteService(NoteRepository noteRepository){
        this.noteRepository=noteRepository;
    }
    @Transactional
    public Note createNote(Note note) {
        return noteRepository.save(note);
    }
    public Note updateNoteContent(int id, String content) {
        Note note = noteRepository.findNoteById(id);
        if (note != null) {
            note.setContent(content);
            return noteRepository.save(note);
        }
        return null;
    }

    public void deleteNoteById(int id) {
        noteRepository.deleteById(id);
    }

    // Method to retrieve all notes
    public List<Note> getAllNotes() {
        return noteRepository.findAll();
    }

    // Method to retrieve a note by ID
    public Note getNoteById(int id) {
        return noteRepository.findNoteById(id);
    }
    public List<Note> searchNotes(String searchTerm) {
        return noteRepository.searchByTitleOrContent(searchTerm);
    }
}
