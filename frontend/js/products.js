// 20 E-Commerce Products with Variants, Real Photos, and Specs
const productsData = [
  // Shoes (4)
  {
    id: 1,
    name: "Nike Air Zoom Pegasus",
    category: "Shoes",
    price: 4999,
    originalPrice: 7499,
    discount: "33% OFF",
    badge: "Trending",
    rating: 4.8,
    reviews: 240,
    image: "images/products/product-1.jpg",
    icon: "👟",
    color: "#fee2e2",
    variantType: "shoes",
    variants: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    defaultVariant: "UK 9",
    colors: ["Racer Red", "Triple Black", "Pure White"],
    description: "Lightweight, ultra-responsive running shoes designed for explosive speed, cushioned comfort, and daily road runs.",
    specs: ["Engineered breathable mesh upper", "Responsive Zoom Air cushioning units", "High-abrasion rubber waffle outsole", "Weight: 260g (Men's size 9)"]
  },
  {
    id: 2,
    name: "Classic White Low-Top Sneakers",
    category: "Shoes",
    price: 2499,
    originalPrice: 3999,
    discount: "38% OFF",
    badge: "Bestseller",
    rating: 4.6,
    reviews: 180,
    image: "images/products/product-2.jpg",
    icon: "👟",
    color: "#f1f5f9",
    variantType: "shoes",
    variants: ["UK 7", "UK 8", "UK 9", "UK 10"],
    defaultVariant: "UK 8",
    colors: ["Crisp White", "White & Navy", "Off-White"],
    description: "Timeless minimalist white sneakers crafted with smooth synthetic leather for clean, versatile everyday styling.",
    specs: ["Premium synthetic leather upper", "Memory foam cushioned footbed", "Vulcanized anti-skid rubber sole", "Reinforced lace eyelets"]
  },
  {
    id: 3,
    name: "High-Top Basketball Shoes",
    category: "Shoes",
    price: 5499,
    originalPrice: 7999,
    discount: "31% OFF",
    badge: "New",
    rating: 4.7,
    reviews: 95,
    image: "images/products/product-3.jpg",
    icon: "🏀",
    color: "#fef3c7",
    variantType: "shoes",
    variants: ["UK 8", "UK 9", "UK 10", "UK 11", "UK 12"],
    defaultVariant: "UK 9",
    colors: ["Volt Gold", "Midnight Red", "Carbon Black"],
    description: "Dynamic high-cut court shoes delivering maximum ankle lock-in, lateral support, and high-energy rebound.",
    specs: ["Padded collar for reinforced ankle stability", "High-rebound EVA midsole", "Multidirectional herringbone grip pattern", "Shock absorbing heel cup"]
  },
  {
    id: 4,
    name: "Handcrafted Leather Derby Shoes",
    category: "Shoes",
    price: 3299,
    originalPrice: 4999,
    discount: "34% OFF",
    badge: "Handmade",
    rating: 4.5,
    reviews: 112,
    image: "images/products/product-4.jpg",
    icon: "👞",
    color: "#fef3c7",
    variantType: "shoes",
    variants: ["UK 7", "UK 8", "UK 9", "UK 10"],
    defaultVariant: "UK 8",
    colors: ["Burnished Tan", "Classic Black", "Espresso Brown"],
    description: "Sophisticated formal derby shoes tailored from genuine burnished leather for executive meetings and black-tie occasions.",
    specs: ["100% Genuine polished top-grain leather", "Breathable leather inner lining", "Stacked wooden heel with rubber cap", "Classic open-lacing construction"]
  },

  // T-Shirts (4)
  {
    id: 5,
    name: "Oversized Streetwear Graphic T-Shirt",
    category: "T-Shirts",
    price: 799,
    originalPrice: 1299,
    discount: "38% OFF",
    badge: "Trending",
    rating: 4.7,
    reviews: 320,
    image: "images/products/product-5.jpg",
    icon: "👕",
    color: "#ede9fe",
    variantType: "clothing",
    variants: ["S", "M", "L", "XL", "XXL"],
    defaultVariant: "L",
    colors: ["Vintage Black", "Acid Wash Gray", "Sand Beige"],
    description: "Heavyweight streetwear drop-shoulder tee made from 100% combed cotton with screen-printed urban art.",
    specs: ["240 GSM heavy combed cotton", "Drop-shoulder relaxed streetwear cut", "Pre-shrunk and bio-washed fabric", "Ribbed crew collar that retains shape"]
  },
  {
    id: 6,
    name: "Classic Slim-Fit Crew Neck T-Shirt",
    category: "T-Shirts",
    price: 499,
    originalPrice: 899,
    discount: "44% OFF",
    badge: "Bestseller",
    rating: 4.4,
    reviews: 410,
    image: "images/products/product-6.jpg",
    icon: "👕",
    color: "#e0e7ff",
    variantType: "clothing",
    variants: ["S", "M", "L", "XL"],
    defaultVariant: "M",
    colors: ["Classic White", "Charcoal Gray", "Navy Blue", "Jet Black"],
    description: "Silky-smooth organic cotton crew neck t-shirt tailored for a clean, athletic silhouette.",
    specs: ["100% Organic combed cotton", "180 GSM lightweight breathable weave", "Fade-resistant color dyes", "Tagless itch-free neck label"]
  },
  {
    id: 7,
    name: "Dry-Fit Athletic Gym T-Shirt",
    category: "T-Shirts",
    price: 899,
    originalPrice: 1499,
    discount: "40% OFF",
    badge: "Sale",
    rating: 4.8,
    reviews: 190,
    image: "images/products/product-7.jpg",
    icon: "🎽",
    color: "#dcfce7",
    variantType: "clothing",
    variants: ["S", "M", "L", "XL", "XXL"],
    defaultVariant: "L",
    colors: ["Neon Green", "Stealth Black", "Cobalt Blue"],
    description: "Sweat-wicking performance athletic tee with 4-way stretch engineered for bodybuilding, crossfit, and running.",
    specs: ["88% Polyester, 12% Spandex quick-dry", "4-way flexible stretch construction", "Anti-microbial odor resistance", "Reflective safety logos on chest and back"]
  },
  {
    id: 8,
    name: "Premium Pique Collar Polo T-Shirt",
    category: "T-Shirts",
    price: 999,
    originalPrice: 1699,
    discount: "41% OFF",
    badge: "Classic",
    rating: 4.6,
    reviews: 215,
    image: "images/products/product-8.jpg",
    icon: "👔",
    color: "#ffedd5",
    variantType: "clothing",
    variants: ["M", "L", "XL", "XXL"],
    defaultVariant: "L",
    colors: ["Royal Navy", "Forest Green", "Crimson Red", "Pure White"],
    description: "Smart-casual pique polo with ribbed collar, dual-button placket, and subtle tonal embroidery.",
    specs: ["100% Cotton honeycomb pique knit", "Side-slit hem for unhindered mobility", "Shrink-resistant collar and cuffs", "Regular smart fit"]
  },

  // Phones (4)
  {
    id: 9,
    name: "Apple iPhone 15 Pro",
    category: "Phones",
    price: 124900,
    originalPrice: 134900,
    discount: "7% OFF",
    badge: "Premium",
    rating: 4.9,
    reviews: 580,
    image: "images/products/product-9.jpg",
    icon: "📱",
    color: "#f3f4f6",
    variantType: "storage",
    variants: ["128GB", "256GB", "512GB", "1TB"],
    defaultVariant: "256GB",
    colors: ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"],
    description: "Aerospace-grade titanium design featuring the groundbreaking 3nm A17 Pro chip and versatile 48MP camera.",
    specs: ["6.1\" Super Retina XDR OLED ProMotion 120Hz", "A17 Pro chip with 6-core GPU", "48MP Main + 3x Telephoto + Ultra-Wide", "USB-C connector with 10Gbps USB 3 speeds"]
  },
  {
    id: 10,
    name: "Samsung Galaxy S24 Ultra",
    category: "Phones",
    price: 119999,
    originalPrice: 129999,
    discount: "8% OFF",
    badge: "AI Powered",
    rating: 4.8,
    reviews: 460,
    image: "images/products/product-10.jpg",
    icon: "📱",
    color: "#fef9c3",
    variantType: "storage",
    variants: ["256GB", "512GB", "1TB"],
    defaultVariant: "256GB",
    colors: ["Titanium Gray", "Titanium Black", "Titanium Violet", "Titanium Yellow"],
    description: "Flagship AI smartphone with built-in S Pen stylus, titanium armor frame, and quad-telephoto zoom.",
    specs: ["6.8\" QHD+ Dynamic AMOLED 2X 120Hz (2600 nits)", "Snapdragon 8 Gen 3 for Galaxy", "200MP Quad Camera with Galaxy AI editing", "5000mAh Battery with 45W wired charging"]
  },
  {
    id: 11,
    name: "Google Pixel 8",
    category: "Phones",
    price: 62999,
    originalPrice: 75999,
    discount: "17% OFF",
    badge: "Best Camera",
    rating: 4.7,
    reviews: 275,
    image: "images/products/product-11.jpg",
    icon: "📱",
    color: "#fae8ff",
    variantType: "storage",
    variants: ["128GB", "256GB"],
    defaultVariant: "128GB",
    colors: ["Hazel", "Rose", "Obsidian"],
    description: "Powered by Google Tensor G3 with industry-leading computational photography and 7 years of OS updates.",
    specs: ["6.2\" Actua OLED 120Hz display", "Google Tensor G3 security coprocessor", "50MP Dual Camera with Best Take & Magic Eraser", "7 years of direct Android OS and security updates"]
  },
  {
    id: 12,
    name: "OnePlus 12 5G",
    category: "Phones",
    price: 54999,
    originalPrice: 64999,
    discount: "15% OFF",
    badge: "Fast Charge",
    rating: 4.7,
    reviews: 310,
    image: "images/products/product-12.jpg",
    icon: "📱",
    color: "#ecfccb",
    variantType: "storage",
    variants: ["256GB / 12GB RAM", "512GB / 16GB RAM"],
    defaultVariant: "256GB / 12GB RAM",
    colors: ["Flowy Emerald", "Silky Black"],
    description: "Supreme speed backed by Snapdragon 8 Gen 3, 4th Gen Hasselblad Camera, and 100W SUPERVOOC charging.",
    specs: ["6.82\" 2K 120Hz ProXDR display (4500 nits peak)", "Snapdragon 8 Gen 3 with 16GB LPDDR5X RAM", "Hasselblad Camera system with 64MP periscope", "5400mAh dual-cell battery with 100W wired charger"]
  },

  // Laptops (4)
  {
    id: 13,
    name: "Apple MacBook Pro 14\" (M3)",
    category: "Laptops",
    price: 159900,
    originalPrice: 169900,
    discount: "6% OFF",
    badge: "Top Rated",
    rating: 4.9,
    reviews: 340,
    image: "images/products/product-13.jpg",
    icon: "💻",
    color: "#f1f5f9",
    variantType: "storage",
    variants: ["512GB SSD / 8GB RAM", "1TB SSD / 16GB RAM", "2TB SSD / 24GB RAM"],
    defaultVariant: "512GB SSD / 8GB RAM",
    colors: ["Space Gray", "Silver"],
    description: "Extreme efficiency and unthrottled computing power with Apple M3 chip and Liquid Retina XDR screen.",
    specs: ["14.2\" Liquid Retina XDR display (1000 nits sustained)", "Apple M3 Chip (8-Core CPU, 10-Core GPU)", "512GB Ultra-fast SSD storage + 8GB Unified Memory", "Up to 22 hours continuous battery life"]
  },
  {
    id: 14,
    name: "Dell XPS 15 OLED Touch",
    category: "Laptops",
    price: 145000,
    originalPrice: 165000,
    discount: "12% OFF",
    badge: "Creator Choice",
    rating: 4.6,
    reviews: 145,
    image: "images/products/product-14.jpg",
    icon: "💻",
    color: "#e2e8f0",
    variantType: "storage",
    variants: ["16GB RAM / 1TB SSD", "32GB RAM / 1TB SSD", "64GB RAM / 2TB SSD"],
    defaultVariant: "16GB RAM / 1TB SSD",
    colors: ["Platinum Silver with Black Interior"],
    description: "Breathtaking 3.5K OLED touchscreen display encased in CNC machined aluminum and carbon fiber palm rest.",
    specs: ["15.6\" 3.5K (3456x2160) OLED InfinityEdge Touch", "13th Gen Intel Core i7-13700H (14 cores, 5.0 GHz)", "NVIDIA GeForce RTX 4050 6GB GDDR6", "16GB DDR5 4800MHz + 1TB NVMe PCIe SSD"]
  },
  {
    id: 15,
    name: "ASUS ROG Zephyrus G16 Gaming",
    category: "Laptops",
    price: 134990,
    originalPrice: 159990,
    discount: "16% OFF",
    badge: "Gaming Beast",
    rating: 4.8,
    reviews: 180,
    image: "images/products/product-15.jpg",
    icon: "💻",
    color: "#fbcfe8",
    variantType: "storage",
    variants: ["16GB / RTX 4060", "32GB / RTX 4070", "32GB / RTX 4080"],
    defaultVariant: "32GB / RTX 4070",
    colors: ["Eclipse Gray", "Platinum White"],
    description: "Ultra-slim 1.85kg gaming powerhouse featuring 2.5K 240Hz OLED Nebula display and NVIDIA RTX 4070.",
    specs: ["16\" 2.5K 240Hz 0.2ms OLED ROG Nebula display", "Intel Core Ultra 9 185H with dedicated AI NPU", "NVIDIA GeForce RTX 4070 8GB GDDR6 (105W TGP)", "32GB LPDDR5X RAM + 1TB PCIe 4.0 NVMe SSD"]
  },
  {
    id: 16,
    name: "Lenovo ThinkPad E14 Gen 5",
    category: "Laptops",
    price: 58990,
    originalPrice: 72990,
    discount: "19% OFF",
    badge: "Business",
    rating: 4.5,
    reviews: 205,
    image: "images/products/product-16.jpg",
    icon: "💻",
    color: "#e2e8f0",
    variantType: "storage",
    variants: ["8GB / 256GB SSD", "16GB / 512GB SSD", "16GB / 1TB SSD"],
    defaultVariant: "16GB / 512GB SSD",
    colors: ["Thunder Black"],
    description: "Legendary ThinkPad rugged reliability, MIL-STD-810H durability, and world-class spill-resistant keyboard.",
    specs: ["14\" WUXGA (1920x1200) IPS Anti-glare display", "AMD Ryzen 5 7530U 6-core processor", "16GB DDR4 3200MHz RAM + 512GB PCIe SSD", "Integrated Fingerprint scanner & Privacy webcam shutter"]
  },

  // Accessories (4)
  {
    id: 17,
    name: "Sony WH-1000XM5 ANC Headphones",
    category: "Accessories",
    price: 26990,
    originalPrice: 34990,
    discount: "23% OFF",
    badge: "Bestseller",
    rating: 4.9,
    reviews: 512,
    image: "images/products/product-17.jpg",
    icon: "🎧",
    color: "#f3f4f6",
    variantType: "color",
    variants: ["Standard Edition"],
    defaultVariant: "Standard Edition",
    colors: ["Midnight Black", "Platinum Silver", "Midnight Blue"],
    description: "World-class active noise cancellation with 8 microphones, LDAC high-res audio, and crystal-clear calls.",
    specs: ["Dual processors (V1 + QN1) for advanced ANC", "30-hour battery life with 3-minute quick charge (3 hrs)", "Multipoint Bluetooth connection to 2 devices", "Precise voice pickup with 4 beamforming mics"]
  },
  {
    id: 18,
    name: "Smart Fitness Watch AMOLED",
    category: "Accessories",
    price: 4499,
    originalPrice: 7999,
    discount: "44% OFF",
    badge: "Trending",
    rating: 4.5,
    reviews: 380,
    image: "images/products/product-18.jpg",
    icon: "⌚",
    color: "#fee2e2",
    variantType: "size",
    variants: ["42mm Dial", "46mm Dial"],
    defaultVariant: "46mm Dial",
    colors: ["Carbon Black", "Silver Frost", "Rose Gold"],
    description: "Brilliant 1.43\" AMOLED always-on display smartwatch with heart-rate, SpO2 monitor, and Bluetooth calling.",
    specs: ["1.43\" HD AMOLED Always-On screen (466x466)", "Bluetooth Calling with built-in mic and speaker", "100+ Sports modes & IP68 water & dust resistance", "Up to 7 days battery endurance on normal use"]
  },
  {
    id: 19,
    name: "Mechanical Wireless RGB Keyboard",
    category: "Accessories",
    price: 3999,
    originalPrice: 5999,
    discount: "33% OFF",
    badge: "Hot",
    rating: 4.7,
    reviews: 220,
    image: "images/products/product-19.jpg",
    icon: "⌨️",
    color: "#e0e7ff",
    variantType: "switch",
    variants: ["Red Linear Switch (Quiet)", "Blue Clicky Switch (Tactile)", "Brown Switch (Balanced)"],
    defaultVariant: "Red Linear Switch (Quiet)",
    colors: ["Classic Retro Gray", "Obsidian Black"],
    description: "Compact 75% mechanical keyboard with hot-swappable switches, PBT double-shot keycaps, and vibrant RGB.",
    specs: ["Pre-lubed Gateron Red linear mechanical switches", "Tri-Mode: Bluetooth 5.0, 2.4GHz wireless & Type-C", "Internal silicone sound-dampening foam pads", "Per-key customizable 16.8M RGB backlighting"]
  },
  {
    id: 20,
    name: "Ergonomic 26K DPI Gaming Mouse",
    category: "Accessories",
    price: 2199,
    originalPrice: 3499,
    discount: "37% OFF",
    badge: "Pro Gear",
    rating: 4.6,
    reviews: 290,
    image: "images/products/product-20.jpg",
    icon: "🖱️",
    color: "#dbeafe",
    variantType: "color",
    variants: ["Wireless Standard"],
    defaultVariant: "Wireless Standard",
    colors: ["Matte Black", "Arctic White"],
    description: "Ultra-lightweight 58g wireless gaming mouse equipped with flawless 26,000 DPI optical sensor and PTFE skates.",
    specs: ["Featherlight 58-gram honeycomb frame", "PixArt 26,000 DPI optical sensor with 650 IPS", "100% Virgin grade PTFE low-friction mouse feet", "Up to 80 hours continuous rechargeable battery"]
  }
];

// Currency formatter for Indian Rupees
const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0
});

// Render the products in the catalog grid
function renderProductsGrid(items) {
  const grid = document.getElementById('product-grid');
  const countEl = document.getElementById('product-count');
  const noProductsEl = document.getElementById('no-products');

  if (!grid) return;

  grid.innerHTML = '';

  if (!items || items.length === 0) {
    if (noProductsEl) noProductsEl.hidden = false;
    if (countEl) countEl.textContent = '0 products found';
    return;
  }

  if (noProductsEl) noProductsEl.hidden = true;
  if (countEl) countEl.textContent = `Showing ${items.length} product${items.length === 1 ? '' : 's'}`;

  const wishlist = typeof window.getWishlist === 'function' ? window.getWishlist() : [];

  items.forEach((product) => {
    const card = document.createElement('article');
    card.className = 'product-card';

    const originalPriceHtml = product.originalPrice
      ? `<span class="product-original-price">${currencyFormatter.format(product.originalPrice)}</span>`
      : '';
    const discountHtml = product.discount
      ? `<span class="product-discount-pill">${product.discount}</span>`
      : '';
    const badgeClass = product.badge
      ? `product-badge badge-${product.badge.toLowerCase().replace(/\s+/g, '-')}`
      : 'product-badge';
    const badgeHtml = product.badge
      ? `<span class="${badgeClass}">${product.badge}</span>`
      : '';

    const isWishlisted = wishlist.includes(product.id) ? 'active' : '';

    card.innerHTML = `
      <div class="product-visual-wrapper">
        ${badgeHtml}
        <button type="button" class="wishlist-btn ${isWishlisted}" data-id="${product.id}" onclick="toggleWishlist(event, ${product.id})" title="Save to wishlist">
          <svg class="wishlist-svg" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        </button>
        <a href="product-details.html?id=${product.id}" class="product-img-link">
          <img 
            src="${product.image}" 
            alt="${product.name}" 
            class="product-real-img"
            loading="lazy"
            onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
          />
          <div class="product-fallback-visual" style="display:none; background-color: #f1f5f9;">
            <span class="logo-badge" style="width:52px;height:52px;font-size:1.3rem;">SH</span>
          </div>
        </a>
      </div>
      <div class="product-body">
        <div class="product-meta">
          <span class="product-category-label">${product.category}</span>
          <span class="product-rating">★ ${product.rating} <span class="rating-count">(${product.reviews})</span></span>
        </div>
        <h3 class="product-title">
          <a href="product-details.html?id=${product.id}">${product.name}</a>
        </h3>
        <p class="product-description">${product.description}</p>
        <div class="product-footer">
          <div class="price-stack">
            <span class="product-price">${currencyFormatter.format(product.price)}</span>
            <div class="discount-row">
              ${originalPriceHtml}
              ${discountHtml}
            </div>
          </div>
          <button type="button" class="btn-add-cart" data-id="${product.id}">
            <svg class="btn-cart-svg" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg> Add to Cart
          </button>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });

  // Attach Add to Cart event listeners
  grid.querySelectorAll('.btn-add-cart').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.getAttribute('data-id'), 10);
      if (typeof window.addToCart === 'function') {
        window.addToCart(id, 1);
        btn.classList.add('added');
        btn.innerHTML = '<svg class="btn-cart-svg" viewBox="0 0 24 24" style="stroke-width:2.5;"><polyline points="20 6 9 17 4 12"></polyline></svg> Added';
        setTimeout(() => {
          btn.classList.remove('added');
          btn.innerHTML = '<svg class="btn-cart-svg" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg> Add to Cart';
        }, 1500);
      }
    });
  });
}

// State for filtering & sorting
let currentCategory = 'all';
let currentSearch = '';
let currentSort = 'featured';
let minPriceFilter = 0;
let maxPriceFilter = Infinity;

// Main apply filter & sort function
function applyFilters() {
  // 1. Filter
  let filtered = productsData.filter((item) => {
    const matchCategory =
      currentCategory === 'all' || item.category.toLowerCase() === currentCategory.toLowerCase();
    
    const matchSearch =
      item.name.toLowerCase().includes(currentSearch) ||
      item.category.toLowerCase().includes(currentSearch) ||
      item.description.toLowerCase().includes(currentSearch);

    const matchPrice = item.price >= minPriceFilter && item.price <= maxPriceFilter;

    return matchCategory && matchSearch && matchPrice;
  });

  // 2. Sort
  if (currentSort === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentSort === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (currentSort === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (currentSort === 'name') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    // Featured (original id order)
    filtered.sort((a, b) => a.id - b.id);
  }

  renderProductsGrid(filtered);
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('header-search');
  const categoryChips = document.querySelectorAll('.category-chip');
  const sortSelect = document.getElementById('product-sort');
  const priceChips = document.querySelectorAll('.price-chip');

  // Query parameter support
  const urlParams = new URLSearchParams(window.location.search);
  const searchParam = urlParams.get('search');
  const catParam = urlParams.get('category');
  if (searchParam) {
    currentSearch = searchParam.trim().toLowerCase();
    if (searchInput) searchInput.value = searchParam;
  }
  if (catParam) {
    currentCategory = catParam;
    if (categoryChips) {
      categoryChips.forEach((c) => {
        if (c.getAttribute('data-category').toLowerCase() === catParam.toLowerCase()) {
          categoryChips.forEach((ch) => ch.classList.remove('active'));
          c.classList.add('active');
        }
      });
    }
  }

  applyFilters();

  // Search input event
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.trim().toLowerCase();
      applyFilters();
    });
  }

  // Category chips clicks
  if (categoryChips) {
    categoryChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        categoryChips.forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
        currentCategory = chip.getAttribute('data-category');
        applyFilters();
      });
    });
  }

  // Sorting Dropdown Change Event
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      applyFilters();
    });
  }

  // Price Budget Chips Filter
  if (priceChips) {
    priceChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        priceChips.forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');

        const min = chip.getAttribute('data-min');
        const max = chip.getAttribute('data-max');

        minPriceFilter = min ? parseInt(min, 10) : 0;
        maxPriceFilter = max && max !== 'all' ? parseInt(max, 10) : Infinity;

        applyFilters();
      });
    });
  }
});
