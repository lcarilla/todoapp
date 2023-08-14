package de.lcarilla.todoapp.rest.mappers;

import de.lcarilla.todoapp.persistence.todo.Todo;
import de.lcarilla.todoapp.rest.dto.TodoDto;
import de.lcarilla.todoapp.rest.dto.TodoFullDto;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@AllArgsConstructor
public class TodoMapper {
    private ModelMapper modelMapper;
    public TodoDto dbToWeb(Todo todo){
        return modelMapper.map(todo, TodoDto.class);
    }
    public TodoFullDto dbToWebFull(Todo todo){
        return modelMapper.map(todo, TodoFullDto.class);
    }
    public List<TodoDto> dbToWeb(List<Todo> todos){
        return todos.stream().map(this::dbToWeb).toList();
    }
    public Todo webToDb(TodoDto todoDto){
        return modelMapper.map(todoDto, Todo.class);
    }
}
