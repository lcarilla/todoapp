package de.lcarilla.todoapp.util;

import de.lcarilla.todoapp.persistence.user.User;

public class UserContextHolder {
    private static final ThreadLocal<User> userThreadLocal = new ThreadLocal<>();
    public static User getUser() {
        return userThreadLocal.get();
    }
    public static void setUser(User user) {
        userThreadLocal.set(user);
    }
    public static void clearUser() {
        userThreadLocal.remove();
    }
}