package de.lcarilla.todoapp.service;

import de.lcarilla.todoapp.exceptions.CommentNotFoundException;
import de.lcarilla.todoapp.exceptions.TodoNotFoundException;
import de.lcarilla.todoapp.persistence.comment.Comment;
import de.lcarilla.todoapp.persistence.comment.CommentRepository;
import de.lcarilla.todoapp.persistence.todo.Todo;
import de.lcarilla.todoapp.persistence.todo.TodoRepository;
import de.lcarilla.todoapp.rest.dto.TodoDto;
import de.lcarilla.todoapp.rest.dto.TodoFullDto;
import de.lcarilla.todoapp.rest.mappers.TodoMapper;
import de.lcarilla.todoapp.util.UserContextHolder;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@AllArgsConstructor
public class TodoService {
    private TodoRepository todoRepository;
    private TodoMapper todoMapper;
    private ModelMapper modelMapper;
    private CommentRepository commentRepository;
    private Todo getTodoByIdAndCheckPermission(Long id){
        Optional<Todo> todoOptional = todoRepository.findById(id);
        if(todoOptional.isEmpty()) throw new TodoNotFoundException();
        if(!todoOptional.get().getUser().equals(UserContextHolder.getUser())) throw new TodoNotFoundException();
        return todoOptional.get();
    }
    public List<TodoDto> getTodos(){
        return todoMapper.dbToWeb(
                todoRepository.findByUserId(UserContextHolder.getUser().getId())
        );
    }
    public TodoDto createTodo(TodoDto todoDto){
        Todo todo = todoMapper.webToDb(todoDto);
        todo.setUser(UserContextHolder.getUser());
        return todoMapper.dbToWeb(todoRepository.save(todo));
    }
    @Transactional
    public void deleteTodo(Long id){
        getTodoByIdAndCheckPermission(id);
        todoRepository.deleteById(id);
    }
    @Transactional
    public TodoDto updateTodo(TodoDto todoDto, Long id){
        Todo todo = getTodoByIdAndCheckPermission(id);
        todoDto.setId(id);
        modelMapper.map(todoDto, todo);
        return todoMapper.dbToWeb(todo);
    }
    public TodoFullDto getTodo(Long id){
        Todo todo = getTodoByIdAndCheckPermission(id);
        return todoMapper.dbToWebFull(todo);
    }
    @Transactional
    public TodoFullDto addComment(Long id, Comment comment){
        Todo todo = getTodoByIdAndCheckPermission(id);
        Comment commentDb = commentRepository.save(comment);
        todo.getComments().add(commentDb);
        return todoMapper.dbToWebFull(todo);
    }
    @Transactional
    public void removeComment(Long todoId, Long commentId){
        Todo todo = getTodoByIdAndCheckPermission(todoId);
        if(todo.getComments().stream().noneMatch(comment -> Objects.equals(comment.getId(), commentId))){
            throw new CommentNotFoundException();
        }
        Optional<Comment> commentOptional = commentRepository.findById(commentId);
        if(commentOptional.isEmpty()) throw new CommentNotFoundException();
        todo.getComments().remove(commentOptional.get());
        commentRepository.deleteById(commentId);
    }
}
