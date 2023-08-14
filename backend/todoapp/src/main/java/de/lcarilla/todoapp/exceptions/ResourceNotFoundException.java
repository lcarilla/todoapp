package de.lcarilla.todoapp.exceptions;

import org.springframework.http.HttpStatus;

public class ResourceNotFoundException extends TodoException{
    public ResourceNotFoundException(String message) {
        super(message, HttpStatus.NOT_FOUND);
    }
}
