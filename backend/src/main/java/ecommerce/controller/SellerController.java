package ecommerce.controller;

import ecommerce.entity.Product;
import ecommerce.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/seller")
@CrossOrigin(origins = "*")
public class SellerController {

    private final ProductService productService;

    @Autowired
    public SellerController(ProductService productService) {
        this.productService = productService;
    }

    // Get all products listed by this seller
    @GetMapping("/products/{sellerId}")
    public List<Product> getSellerProducts(@PathVariable Long sellerId) {
        return productService.getProductsBySeller(sellerId);
    }

    // Add a new product to the catalog
    @PostMapping("/products")
    public ResponseEntity<?> addProduct(@RequestBody Product product) {
        try {
            if (product.getName() == null || product.getPrice() == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "Product name and price are required"));
            }
            Product saved = productService.saveProduct(product);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // Update product listing
    @PutMapping("/products/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @RequestBody Product product) {
        try {
            Product updated = productService.updateProduct(id, product);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // Delete a product listing
    @DeleteMapping("/products/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        try {
            productService.deleteProduct(id);
            return ResponseEntity.ok(Map.of("message", "Product deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // Get Seller stats
    @GetMapping("/stats/{sellerId}")
    public ResponseEntity<?> getSellerStats(@PathVariable Long sellerId) {
        List<Product> products = productService.getProductsBySeller(sellerId);
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalProducts", products.size());
        stats.put("sellerId", sellerId);
        return ResponseEntity.ok(stats);
    }
}

