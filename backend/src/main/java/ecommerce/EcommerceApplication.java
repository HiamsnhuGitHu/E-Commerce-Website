package ecommerce;

import ecommerce.entity.Product;
import ecommerce.entity.User;
import ecommerce.repository.ProductRepository;
import ecommerce.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class EcommerceApplication {

    public static void main(String[] args) {
        SpringApplication.run(EcommerceApplication.class, args);
    }

    /**
     * Automatically seed initial 20 products and sample user if database is empty on startup.
     */
    @Bean
    public CommandLineRunner seedDatabase(ProductRepository productRepo, UserRepository userRepo) {
        return args -> {
            // Seed Demo Users for all 3 Roles (BUYER, SELLER, ADMIN)
            if (userRepo.count() == 0) {
                // 1. Buyer
                userRepo.save(new User(
                        "Himanshu Sharma",
                        "himanshu.sharma@example.com",
                        "password123",
                        "+91 98765 43210",
                        "Flat 402, Green Valley Apartments, Outer Ring Road, Bengaluru",
                        "BUYER"
                ));

                userRepo.save(new User(
                        "John Buyer",
                        "buyer@shophere.com",
                        "buyer123",
                        "+91 98765 11111",
                        "Plot 12, Indiranagar, Bengaluru",
                        "BUYER"
                ));

                // 2. Seller
                userRepo.save(new User(
                        "Apex Retailers Store",
                        "seller@shophere.com",
                        "seller123",
                        "+91 98765 22222",
                        "Commercial Complex, Koramangala, Bengaluru",
                        "SELLER"
                ));

                // 3. Admin
                userRepo.save(new User(
                        "ShopHere Platform Admin",
                        "admin@shophere.com",
                        "admin123",
                        "+91 98765 00000",
                        "HQ Tower, Outer Ring Road, Bengaluru",
                        "ADMIN"
                ));

                System.out.println(">>> [ShopHere] Default users for BUYER, SELLER, and ADMIN seeded successfully!");
            }

            // Seed 20 Catalog Products if none exist
            if (productRepo.count() == 0) {
                System.out.println(">>> [ShopHere] Seeding 20 catalog products into database...");

                // Shoes (4)
                productRepo.save(createProduct(
                        "Nike Air Zoom Pegasus", "Shoes", 4999.0, 7499.0, "33% OFF", "Trending", 4.8, 240,
                        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80",
                        "👟", "#fee2e2", "shoes", "UK 7,UK 8,UK 9,UK 10,UK 11", "Racer Red,Triple Black,Pure White", "UK 9",
                        "Lightweight, ultra-responsive running shoes designed for explosive speed, cushioned comfort, and daily road runs.",
                        "Engineered breathable mesh upper;Responsive Zoom Air cushioning units;High-abrasion rubber waffle outsole;Weight: 260g"
                ));

                productRepo.save(createProduct(
                        "Classic White Low-Top Sneakers", "Shoes", 2499.0, 3999.0, "38% OFF", "Bestseller", 4.6, 180,
                        "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=700&q=80",
                        "👟", "#f1f5f9", "shoes", "UK 7,UK 8,UK 9,UK 10", "Crisp White,White & Navy,Off-White", "UK 8",
                        "Timeless minimalist white sneakers crafted with smooth synthetic leather for clean, versatile everyday styling.",
                        "Premium synthetic leather upper;Memory foam cushioned footbed;Vulcanized anti-skid rubber sole;Reinforced lace eyelets"
                ));

                productRepo.save(createProduct(
                        "High-Top Basketball Shoes", "Shoes", 5499.0, 7999.0, "31% OFF", "New", 4.7, 95,
                        "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?auto=format&fit=crop&w=700&q=80",
                        "🏀", "#fef3c7", "shoes", "UK 8,UK 9,UK 10,UK 11,UK 12", "Volt Gold,Midnight Red,Carbon Black", "UK 9",
                        "Dynamic high-cut court shoes delivering maximum ankle lock-in, lateral support, and high-energy rebound.",
                        "Padded collar for reinforced ankle stability;High-rebound EVA midsole;Multidirectional herringbone grip pattern;Shock absorbing heel cup"
                ));

                productRepo.save(createProduct(
                        "Handcrafted Leather Derby Shoes", "Shoes", 3299.0, 4999.0, "34% OFF", "Handmade", 4.5, 112,
                        "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=700&q=80",
                        "👞", "#fef3c7", "shoes", "UK 7,UK 8,UK 9,UK 10", "Burnished Tan,Classic Black,Espresso Brown", "UK 8",
                        "Sophisticated formal derby shoes tailored from genuine burnished leather for executive meetings and black-tie occasions.",
                        "100% Genuine polished top-grain leather;Breathable leather inner lining;Stacked wooden heel with rubber cap;Classic open-lacing construction"
                ));

                // T-Shirts (4)
                productRepo.save(createProduct(
                        "Oversized Streetwear Graphic T-Shirt", "T-Shirts", 799.0, 1299.0, "38% OFF", "Trending", 4.7, 320,
                        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=700&q=80",
                        "👕", "#ede9fe", "clothing", "S,M,L,XL,XXL", "Vintage Black,Acid Wash Gray,Sand Beige", "L",
                        "Heavyweight streetwear drop-shoulder tee made from 100% combed cotton with screen-printed urban art.",
                        "240 GSM heavy combed cotton;Drop-shoulder relaxed streetwear cut;Pre-shrunk and bio-washed fabric;Ribbed crew collar that retains shape"
                ));

                productRepo.save(createProduct(
                        "Classic Slim-Fit Crew Neck T-Shirt", "T-Shirts", 499.0, 899.0, "44% OFF", "Bestseller", 4.4, 410,
                        "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=700&q=80",
                        "👕", "#e0e7ff", "clothing", "S,M,L,XL", "Classic White,Charcoal Gray,Navy Blue,Jet Black", "M",
                        "Silky-smooth organic cotton crew neck t-shirt tailored for a clean, athletic silhouette.",
                        "100% Organic combed cotton;180 GSM lightweight breathable weave;Fade-resistant color dyes;Tagless itch-free neck label"
                ));

                productRepo.save(createProduct(
                        "Dry-Fit Athletic Gym T-Shirt", "T-Shirts", 899.0, 1499.0, "40% OFF", "Sale", 4.8, 190,
                        "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=700&q=80",
                        "🎽", "#dcfce7", "clothing", "S,M,L,XL,XXL", "Neon Green,Stealth Black,Cobalt Blue", "L",
                        "Sweat-wicking performance athletic tee with 4-way stretch engineered for bodybuilding, crossfit, and running.",
                        "88% Polyester, 12% Spandex quick-dry;4-way flexible stretch construction;Anti-microbial odor resistance;Reflective safety logos on chest and back"
                ));

                productRepo.save(createProduct(
                        "Premium Pique Collar Polo T-Shirt", "T-Shirts", 999.0, 1699.0, "41% OFF", "Classic", 4.6, 215,
                        "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=700&q=80",
                        "👔", "#ffedd5", "clothing", "M,L,XL,XXL", "Royal Navy,Forest Green,Crimson Red,Pure White", "L",
                        "Smart-casual pique polo with ribbed collar, dual-button placket, and subtle tonal embroidery.",
                        "100% Cotton honeycomb pique knit;Side-slit hem for unhindered mobility;Shrink-resistant collar and cuffs;Regular smart fit"
                ));

                // Phones (4)
                productRepo.save(createProduct(
                        "Apple iPhone 15 Pro", "Phones", 124900.0, 134900.0, "7% OFF", "Premium", 4.9, 580,
                        "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=700&q=80",
                        "📱", "#f3f4f6", "storage", "128GB,256GB,512GB,1TB", "Natural Titanium,Blue Titanium,White Titanium,Black Titanium", "256GB",
                        "Aerospace-grade titanium design featuring the groundbreaking 3nm A17 Pro chip and versatile 48MP camera.",
                        "6.1 Super Retina XDR OLED ProMotion 120Hz;A17 Pro chip with 6-core GPU;48MP Main + 3x Telephoto + Ultra-Wide;USB-C connector with 10Gbps USB 3 speeds"
                ));

                productRepo.save(createProduct(
                        "Samsung Galaxy S24 Ultra", "Phones", 119999.0, 129999.0, "8% OFF", "AI Powered", 4.8, 460,
                        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=700&q=80",
                        "📱", "#fef9c3", "storage", "256GB,512GB,1TB", "Titanium Gray,Titanium Black,Titanium Violet,Titanium Yellow", "256GB",
                        "Flagship AI smartphone with built-in S Pen stylus, titanium armor frame, and quad-telephoto zoom.",
                        "6.8 QHD+ Dynamic AMOLED 2X 120Hz;Snapdragon 8 Gen 3 for Galaxy;200MP Quad Camera with Galaxy AI editing;5000mAh Battery with 45W wired charging"
                ));

                productRepo.save(createProduct(
                        "Google Pixel 8", "Phones", 62999.0, 75999.0, "17% OFF", "Best Camera", 4.7, 275,
                        "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=700&q=80",
                        "📱", "#fae8ff", "storage", "128GB,256GB", "Hazel,Rose,Obsidian", "128GB",
                        "Powered by Google Tensor G3 with industry-leading computational photography and 7 years of OS updates.",
                        "6.2 Actua OLED 120Hz display;Google Tensor G3 security coprocessor;50MP Dual Camera with Best Take & Magic Eraser;7 years of direct Android OS and security updates"
                ));

                productRepo.save(createProduct(
                        "OnePlus 12 5G", "Phones", 54999.0, 64999.0, "15% OFF", "Fast Charge", 4.7, 310,
                        "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=700&q=80",
                        "📱", "#ecfccb", "storage", "256GB / 12GB RAM,512GB / 16GB RAM", "Flowy Emerald,Silky Black", "256GB / 12GB RAM",
                        "Supreme speed backed by Snapdragon 8 Gen 3, 4th Gen Hasselblad Camera, and 100W SUPERVOOC charging.",
                        "6.82 2K 120Hz ProXDR display (4500 nits peak);Snapdragon 8 Gen 3 with 16GB LPDDR5X RAM;Hasselblad Camera system with 64MP periscope;5400mAh dual-cell battery with 100W wired charger"
                ));

                // Laptops (4)
                productRepo.save(createProduct(
                        "Apple MacBook Pro 14 (M3)", "Laptops", 159900.0, 169900.0, "6% OFF", "Top Rated", 4.9, 340,
                        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=700&q=80",
                        "💻", "#f1f5f9", "storage", "512GB SSD / 8GB RAM,1TB SSD / 16GB RAM,2TB SSD / 24GB RAM", "Space Gray,Silver", "512GB SSD / 8GB RAM",
                        "Extreme efficiency and unthrottled computing power with Apple M3 chip and Liquid Retina XDR screen.",
                        "14.2 Liquid Retina XDR display (1000 nits sustained);Apple M3 Chip (8-Core CPU, 10-Core GPU);512GB Ultra-fast SSD storage + 8GB Unified Memory;Up to 22 hours continuous battery life"
                ));

                productRepo.save(createProduct(
                        "Dell XPS 15 OLED Touch", "Laptops", 145000.0, 165000.0, "12% OFF", "Creator Choice", 4.6, 145,
                        "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=700&q=80",
                        "💻", "#e2e8f0", "storage", "16GB RAM / 1TB SSD,32GB RAM / 1TB SSD,64GB RAM / 2TB SSD", "Platinum Silver with Black Interior", "16GB RAM / 1TB SSD",
                        "Breathtaking 3.5K OLED touchscreen display encased in CNC machined aluminum and carbon fiber palm rest.",
                        "15.6 3.5K (3456x2160) OLED InfinityEdge Touch;13th Gen Intel Core i7-13700H (14 cores, 5.0 GHz);NVIDIA GeForce RTX 4050 6GB GDDR6;16GB DDR5 4800MHz + 1TB NVMe PCIe SSD"
                ));

                productRepo.save(createProduct(
                        "ASUS ROG Zephyrus G16 Gaming", "Laptops", 134990.0, 159990.0, "16% OFF", "Gaming Beast", 4.8, 180,
                        "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=700&q=80",
                        "💻", "#fbcfe8", "storage", "16GB / RTX 4060,32GB / RTX 4070,32GB / RTX 4080", "Eclipse Gray,Platinum White", "32GB / RTX 4070",
                        "Ultra-slim 1.85kg gaming powerhouse featuring 2.5K 240Hz OLED Nebula display and NVIDIA RTX 4070.",
                        "16 2.5K 240Hz 0.2ms OLED ROG Nebula display;Intel Core Ultra 9 185H with dedicated AI NPU;NVIDIA GeForce RTX 4070 8GB GDDR6 (105W TGP);32GB LPDDR5X RAM + 1TB PCIe 4.0 NVMe SSD"
                ));

                productRepo.save(createProduct(
                        "Lenovo ThinkPad E14 Gen 5", "Laptops", 58990.0, 72990.0, "19% OFF", "Business", 4.5, 205,
                        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=700&q=80",
                        "💻", "#e2e8f0", "storage", "8GB / 256GB SSD,16GB / 512GB SSD,16GB / 1TB SSD", "Thunder Black", "16GB / 512GB SSD",
                        "Legendary ThinkPad rugged reliability, MIL-STD-810H durability, and world-class spill-resistant keyboard.",
                        "14 WUXGA (1920x1200) IPS Anti-glare display;AMD Ryzen 5 7530U 6-core processor;16GB DDR4 3200MHz RAM + 512GB PCIe SSD;Integrated Fingerprint scanner & Privacy webcam shutter"
                ));

                // Accessories (4)
                productRepo.save(createProduct(
                        "Sony WH-1000XM5 ANC Headphones", "Accessories", 26990.0, 34990.0, "23% OFF", "Bestseller", 4.9, 512,
                        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80",
                        "🎧", "#f3f4f6", "color", "Standard Edition", "Midnight Black,Platinum Silver,Midnight Blue", "Standard Edition",
                        "World-class active noise cancellation with 8 microphones, LDAC high-res audio, and crystal-clear calls.",
                        "Dual processors (V1 + QN1) for advanced ANC;30-hour battery life with 3-minute quick charge (3 hrs);Multipoint Bluetooth connection to 2 devices;Precise voice pickup with 4 beamforming mics"
                ));

                productRepo.save(createProduct(
                        "Smart Fitness Watch AMOLED", "Accessories", 4499.0, 7999.0, "44% OFF", "Trending", 4.5, 380,
                        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80",
                        "⌚", "#fee2e2", "size", "42mm Dial,46mm Dial", "Carbon Black,Silver Frost,Rose Gold", "46mm Dial",
                        "Brilliant 1.43 AMOLED always-on display smartwatch with heart-rate, SpO2 monitor, and Bluetooth calling.",
                        "1.43 HD AMOLED Always-On screen (466x466);Bluetooth Calling with built-in mic and speaker;100+ Sports modes & IP68 water & dust resistance;Up to 7 days battery endurance on normal use"
                ));

                productRepo.save(createProduct(
                        "Mechanical Wireless RGB Keyboard", "Accessories", 3999.0, 5999.0, "33% OFF", "Hot", 4.7, 220,
                        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=700&q=80",
                        "⌨️", "#e0e7ff", "switch", "Red Linear Switch (Quiet),Blue Clicky Switch (Tactile),Brown Switch (Balanced)", "Classic Retro Gray,Obsidian Black", "Red Linear Switch (Quiet)",
                        "Compact 75% mechanical keyboard with hot-swappable switches, PBT double-shot keycaps, and vibrant RGB.",
                        "Pre-lubed Gateron Red linear mechanical switches;Tri-Mode: Bluetooth 5.0, 2.4GHz wireless & Type-C;Internal silicone sound-dampening foam pads;Per-key customizable 16.8M RGB backlighting"
                ));

                productRepo.save(createProduct(
                        "Ergonomic 26K DPI Gaming Mouse", "Accessories", 2199.0, 3499.0, "37% OFF", "Pro Gear", 4.6, 290,
                        "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=700&q=80",
                        "🖱️", "#dbeafe", "color", "Wireless Standard", "Matte Black,Arctic White", "Wireless Standard",
                        "Ultra-lightweight 58g wireless gaming mouse equipped with flawless 26,000 DPI optical sensor and PTFE skates.",
                        "Featherlight 58-gram honeycomb frame;PixArt 26,000 DPI optical sensor with 650 IPS;100% Virgin grade PTFE low-friction mouse feet;Up to 80 hours continuous rechargeable battery"
                ));

                System.out.println(">>> [ShopHere] 20 Catalog products seeded successfully!");
            }
        };
    }

    private static Product createProduct(
            String name, String category, Double price, Double originalPrice, String discount, String badge,
            Double rating, Integer reviews, String image, String icon, String color, String variantType,
            String variants, String colors, String defaultVariant, String description, String specs) {

        Product p = new Product();
        p.setName(name);
        p.setCategory(category);
        p.setPrice(price);
        p.setOriginalPrice(originalPrice);
        p.setDiscount(discount);
        p.setBadge(badge);
        p.setRating(rating);
        p.setReviews(reviews);
        p.setImage(image);
        p.setIcon(icon);
        p.setColor(color);
        p.setVariantType(variantType);
        p.setVariants(variants);
        p.setColors(colors);
        p.setDefaultVariant(defaultVariant);
        p.setDescription(description);
        p.setSpecs(specs);
        return p;
    }
}

