package de.lcarilla.todoapp.rest.dto;

import de.lcarilla.todoapp.persistence.comment.Comment;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class TodoDto {
    private Long id;
    private String name;
    private Date date;
    private String description;
    private Long progress;
}
