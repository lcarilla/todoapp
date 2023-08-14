package de.lcarilla.todoapp.persistence.todo;

import de.lcarilla.todoapp.persistence.comment.Comment;
import de.lcarilla.todoapp.persistence.user.User;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Entity
@Data
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    private String name;
    private Date date;
    private String description;
    private Long progress;
    @OneToMany(fetch = FetchType.LAZY)
    List<Comment> comments;
}
