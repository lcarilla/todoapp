package de.lcarilla.todoapp.util;

import de.lcarilla.todoapp.persistence.todo.Todo;
import de.lcarilla.todoapp.persistence.user.User;
import de.lcarilla.todoapp.persistence.user.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;
import java.util.Optional;

@Component
@AllArgsConstructor
public class UserInterceptor implements HandlerInterceptor {
    private final UserRepository userRepository;
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String sub = SecurityContextHolder.getContext()
                .getAuthentication().getName();
        Optional<User> optionalUser = userRepository.findBySub(sub);
        if (optionalUser.isPresent()) {
            UserContextHolder.setUser(optionalUser.get());
        } else {
            User user = userRepository.save(new User(0L, sub));
            UserContextHolder.setUser(user);
        }
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        UserContextHolder.clearUser();
    }
}