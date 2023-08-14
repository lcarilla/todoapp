package de.lcarilla.todoapp.rest.controllers;

import de.lcarilla.todoapp.persistence.comment.Comment;
import de.lcarilla.todoapp.rest.dto.TodoDto;
import de.lcarilla.todoapp.rest.dto.TodoFullDto;
import de.lcarilla.todoapp.service.TodoService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/todos")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class TodoController {
    private TodoService todoService;
    @GetMapping
    public List<TodoDto> getTodos(){
        return todoService.getTodos();
    }
    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public TodoDto postTodo(@RequestBody TodoDto todo){
        return todoService.createTodo(todo);
    }
    @DeleteMapping(path = "/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void deleteTodo(@PathVariable Long id){
        todoService.deleteTodo(id);
    }
    @PutMapping(path = "/{id}")
    public TodoDto putTodo(
            @RequestBody TodoDto todoDto,
            @PathVariable Long id
    ){
        return todoService.updateTodo(todoDto, id);
    }
    @GetMapping(path = "/{id}")
    public TodoFullDto getTodo(@PathVariable Long id){
        return todoService.getTodo(id);
    }
    @PostMapping(path = "/{id}/comments")
    @ResponseStatus(code = HttpStatus.CREATED)
    public TodoFullDto postComment(
            @PathVariable Long id,
            @RequestBody Comment comment
    ){
        return todoService.addComment(id, comment);
    }
    @DeleteMapping(path = "/{todoId}/comments/{commentId}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void deleteComment(
            @PathVariable Long todoId,
            @PathVariable Long commentId
    ){
        todoService.removeComment(todoId, commentId);
    }
}
