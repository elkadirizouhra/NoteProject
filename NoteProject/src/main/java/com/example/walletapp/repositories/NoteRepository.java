package com.example.walletapp.repositories;

import com.example.walletapp.models.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface NoteRepository extends JpaRepository<Note, Integer> {


    @Query("SELECT n FROM Note n")
    List<Note> findAllNotes();

    @Query("SELECT n FROM Note n where n.id = :id")
    Note findNoteById(@Param("id") int id);

    @Modifying
    @Transactional
    @Query("UPDATE Note n SET n.content = :content WHERE n.id = :id")
    void changeContent(@Param("id") int id, @Param("content") String content);
    @Modifying
    @Transactional
    @Query("UPDATE Note n SET n.title = :title WHERE n.id = :id")
    void changeTitle(@Param("id") int id, @Param("title") String title);

    @Modifying
    @Transactional
    @Query("DELETE FROM Note n WHERE n.id = :id")
    void deleteById(@Param("id") int id);
    @Query("FROM Note  WHERE title LIKE %:searchTerm% OR content LIKE %:searchTerm%")
    List<Note> searchByTitleOrContent(@Param("searchTerm") String searchTerm);
}
