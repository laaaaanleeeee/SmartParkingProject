package com.data.controller;

import com.data.dto.LoginRequest;
import com.data.dto.UserResponseDTO;
import com.data.entity.User;
import com.data.security.JwtUtil;
import com.data.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> register(@RequestBody User user) {
        if (userService.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().build();
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setCreatedAt(LocalDateTime.now());
        User saved = userService.saveUser(user);
        return ResponseEntity.ok(new UserResponseDTO(saved));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(req.getUsername(), req.getPassword()));

            User user = (User) auth.getPrincipal();
            String access = jwtUtil.generateAccessToken(user.getUsername(), user.getUserRole().name());
            String refresh = jwtUtil.generateRefreshToken(user.getUsername());

            var resp = new com.data.dto.AuthResponse(access, refresh, 3600000L, new UserResponseDTO(user));
            return ResponseEntity.ok(resp);
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestBody String refreshToken) {
        try {
            String username = jwtUtil.getUsername(refreshToken);
            if (jwtUtil.isExpired(refreshToken)) return ResponseEntity.status(401).body("Refresh token expired");

            var user = (User) userService.loadUserByUsername(username);
            String newAccess = jwtUtil.generateAccessToken(user.getUsername(), user.getUserRole().name());
            var resp = new com.data.dto.AuthResponse(newAccess, refreshToken, 3600000L, new UserResponseDTO(user));
            return ResponseEntity.ok(resp);
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid refresh token");
        }
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponseDTO> me(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(new UserResponseDTO(user));
    }
}
