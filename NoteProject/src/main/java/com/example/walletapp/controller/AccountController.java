package com.example.walletapp.controller;

import com.example.walletapp.models.Note;
import com.example.walletapp.services.NoteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AccountController {
    private final NoteService noteService;
    AccountController(NoteService noteService){
        this.noteService=noteService;
    }
    @PostMapping("/note")
    public Note createNote(@RequestBody Note note) {
        return noteService.createNote(note);

    }
    @GetMapping("/notes")
    public Iterable<Note> findAllNotes(){
       return  noteService.getAllNotes();}
    @PutMapping("/note/{id}")
    public ResponseEntity<Note> updateNote(@PathVariable int id, @RequestBody Note note) {
        Note updatedNote = noteService.updateNoteContent(id, note.getContent());
        if (updatedNote != null) {
            return ResponseEntity.ok(updatedNote);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/note/{id}")
    public ResponseEntity<Void> deleteNoteById(@PathVariable int id) {
        noteService.deleteNoteById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
    @GetMapping("/api/notes/search")
    public List<Note> searchNotes(@RequestParam("q") String searchTerm) {
        return noteService.searchNotes(searchTerm);
    }
}


