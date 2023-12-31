package de.lcarilla.todoapp.config;

import de.lcarilla.todoapp.persistence.user.UserRepository;
import de.lcarilla.todoapp.util.UserInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfiguration implements WebMvcConfigurer {
    private final ApplicationContext applicationContext;
    @Autowired
    public WebConfiguration(ApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
    }
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        UserRepository userRepository = applicationContext.getBean(
                UserRepository.class
        );
        registry.addInterceptor(new UserInterceptor(userRepository))
                .addPathPatterns("/**")
                .excludePathPatterns("/api/public/**", "/swagger-ui/**", "/v3/api-docs/**");
    }
}
