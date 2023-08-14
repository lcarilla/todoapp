package de.lcarilla.todoapp.exceptions;

public class CommentNotFoundException extends ResourceNotFoundException{
    public CommentNotFoundException() {
        super("comment not found");
    }
}
