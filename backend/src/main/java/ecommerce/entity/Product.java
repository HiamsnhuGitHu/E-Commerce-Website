package ecommerce.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, length = 60)
    private String category;

    @Column(nullable = false)
    private Double price;

    private Double originalPrice;

    private String discount;

    private String badge;

    private Double rating = 4.5;

    private Integer reviews = 0;

    @Column(columnDefinition = "TEXT")
    private String image;

    private String icon;

    private String color;

    private String variantType;

    @Column(columnDefinition = "TEXT")
    private String variants;

    @Column(columnDefinition = "TEXT")
    private String colors;

    private String defaultVariant;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String specs;

    // Role-based association: which Seller listed this product
    private Long sellerId = 1L;

    private String sellerName = "ShopHere Official";

    public Product() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public Double getOriginalPrice() { return originalPrice; }
    public void setOriginalPrice(Double originalPrice) { this.originalPrice = originalPrice; }

    public String getDiscount() { return discount; }
    public void setDiscount(String discount) { this.discount = discount; }

    public String getBadge() { return badge; }
    public void setBadge(String badge) { this.badge = badge; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public Integer getReviews() { return reviews; }
    public void setReviews(Integer reviews) { this.reviews = reviews; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }

    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }

    public String getVariantType() { return variantType; }
    public void setVariantType(String variantType) { this.variantType = variantType; }

    public String getVariants() { return variants; }
    public void setVariants(String variants) { this.variants = variants; }

    public String getColors() { return colors; }
    public void setColors(String colors) { this.colors = colors; }

    public String getDefaultVariant() { return defaultVariant; }
    public void setDefaultVariant(String defaultVariant) { this.defaultVariant = defaultVariant; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getSpecs() { return specs; }
    public void setSpecs(String specs) { this.specs = specs; }

    public Long getSellerId() { return sellerId; }
    public void setSellerId(Long sellerId) { this.sellerId = sellerId; }

    public String getSellerName() { return sellerName; }
    public void setSellerName(String sellerName) { this.sellerName = sellerName; }
}
