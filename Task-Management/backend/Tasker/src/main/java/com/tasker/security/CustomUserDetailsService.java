package com.tasker.security;

import com.tasker.entity.Person;
import com.tasker.service.TaskerService;

import java.util.List;

import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final TaskerService service;

    public CustomUserDetailsService(TaskerService service) {
        this.service = service;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Person p = service.findByEmail(email);
        if (p == null) throw new UsernameNotFoundException("User not found");
        return new User(p.getEmail(), p.getPassword(), List.of());
    }
}
