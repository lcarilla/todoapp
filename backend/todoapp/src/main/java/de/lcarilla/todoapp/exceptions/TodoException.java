package de.lcarilla.todoapp.exceptions;


import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class TodoException extends RuntimeException{
    private final HttpStatus status;
    private final ErrorMessage errorMessage;
    public TodoException(String message, HttpStatus status) {
        this.status = status;
        this.errorMessage = new ErrorMessage(message);
    }
}