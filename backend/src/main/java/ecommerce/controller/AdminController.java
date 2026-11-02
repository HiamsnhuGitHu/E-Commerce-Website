package ecommerce.controller;

import ecommerce.entity.Order;
import ecommerce.entity.User;
import ecommerce.service.AuthService;
import ecommerce.service.OrderService;
import ecommerce.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    private final AuthService authService;
    private final ProductService productService;
    private final OrderService orderService;

    @Autowired
    public AdminController(AuthService authService, ProductService productService, OrderService orderService) {
        this.authService = authService;
        this.productService = productService;
        this.orderService = orderService;
    }

    // 1. Get all registered users
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return authService.getAllUsers();
    }

    // 2. Change a user's role (BUYER, SELLER, ADMIN)
    @PutMapping("/users/{id}/role")
    public ResponseEntity<?> updateUserRole(@PathVariable Long id, @RequestParam("role") String role) {
        try {
            User updated = authService.updateUserRole(id, role);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // 3. Delete a user account
    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        try {
            authService.deleteUser(id);
            return ResponseEntity.ok(Map.of("message", "User deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // 4. View all orders placed across the whole platform
    @GetMapping("/orders")
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    // 5. Update order status (Processing, Shipped, Delivered, Cancelled)
    @PutMapping("/orders/{id}/status")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long id, @RequestParam("status") String status) {
        try {
            Order updated = orderService.updateOrderStatus(id, status);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // 6. Delete any product from the catalog
    @DeleteMapping("/products/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        try {
            productService.deleteProduct(id);
            return ResponseEntity.ok(Map.of("message", "Product deleted by Admin successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // 7. Overall platform statistics
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getPlatformStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", authService.getTotalUserCount());
        stats.put("totalProducts", productService.getCount());
        stats.put("totalOrders", orderService.getTotalOrdersCount());
        stats.put("totalRevenue", orderService.getTotalRevenue());
        return ResponseEntity.ok(stats);
    }
}

