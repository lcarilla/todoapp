package de.lcarilla.todoapp.exceptions;

public class TodoNotFoundException extends ResourceNotFoundException{
    public TodoNotFoundException() {
        super("todo not found");
    }
}
