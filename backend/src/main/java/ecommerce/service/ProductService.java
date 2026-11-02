package ecommerce.service;

import ecommerce.entity.Product;
import ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public List<Product> getProductsByCategory(String category) {
        if ("all".equalsIgnoreCase(category)) {
            return productRepository.findAll();
        }
        return productRepository.findByCategoryIgnoreCase(category);
    }

    public List<Product> searchProducts(String query) {
        return productRepository.findByNameContainingIgnoreCase(query);
    }

    public List<Product> getProductsBySeller(Long sellerId) {
        return productRepository.findBySellerId(sellerId);
    }

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product updated) {
        return productRepository.findById(id).map(existing -> {
            if (updated.getName() != null) existing.setName(updated.getName());
            if (updated.getCategory() != null) existing.setCategory(updated.getCategory());
            if (updated.getPrice() != null) existing.setPrice(updated.getPrice());
            if (updated.getOriginalPrice() != null) existing.setOriginalPrice(updated.getOriginalPrice());
            if (updated.getDiscount() != null) existing.setDiscount(updated.getDiscount());
            if (updated.getBadge() != null) existing.setBadge(updated.getBadge());
            if (updated.getImage() != null) existing.setImage(updated.getImage());
            if (updated.getDescription() != null) existing.setDescription(updated.getDescription());
            if (updated.getSpecs() != null) existing.setSpecs(updated.getSpecs());
            if (updated.getVariants() != null) existing.setVariants(updated.getVariants());
            if (updated.getColors() != null) existing.setColors(updated.getColors());
            return productRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    public long getCount() {
        return productRepository.count();
    }
}
