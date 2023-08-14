package de.lcarilla.todoapp.rest.dto;

import de.lcarilla.todoapp.persistence.comment.Comment;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;
@EqualsAndHashCode(callSuper = true)
@Data
public class TodoFullDto extends TodoDto{
    private List<Comment> comments;
}
