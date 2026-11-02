package ecommerce.service;

import ecommerce.entity.User;
import ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;

    @Autowired
    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User register(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already registered: " + user.getEmail());
        }
        if (user.getRole() == null || user.getRole().trim().isEmpty()) {
            user.setRole("BUYER");
        }
        return userRepository.save(user);
    }

    public Optional<User> login(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent() && userOpt.get().getPassword().equals(password)) {
            return userOpt;
        }
        return Optional.empty();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User updateProfile(Long id, User updatedInfo) {
        return userRepository.findById(id).map(user -> {
            if (updatedInfo.getName() != null) user.setName(updatedInfo.getName());
            if (updatedInfo.getPhone() != null) user.setPhone(updatedInfo.getPhone());
            if (updatedInfo.getAddress() != null) user.setAddress(updatedInfo.getAddress());
            return userRepository.save(user);
        }).orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    // Admin: Change user role (BUYER, SELLER, ADMIN)
    public User updateUserRole(Long id, String newRole) {
        return userRepository.findById(id).map(user -> {
            user.setRole(newRole.toUpperCase());
            return userRepository.save(user);
        }).orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    // Admin: Delete user
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public long getTotalUserCount() {
        return userRepository.count();
    }
}
