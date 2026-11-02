// Cart & Wishlist Management with localStorage
const CART_STORAGE_KEY = 'ecommerce_cart';
const WISHLIST_STORAGE_KEY = 'ecommerce_wishlist';

/* ==========================================================================
   Cart Functions
   ========================================================================== */

// Retrieve cart from storage
function getCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to parse cart:', e);
    return [];
  }
}

// Save cart to storage
function saveCart(cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartBadge();
  } catch (e) {
    console.error('Failed to save cart:', e);
  }
}

// Update header badge with total quantity
function updateCartBadge() {
  const cart = getCart();
  const totalCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const badges = document.querySelectorAll('.cart-count, #cart-count');
  badges.forEach((b) => {
    b.textContent = totalCount;
  });
}

// Show a temporary toast message
function showToast(message) {
  let toast = document.getElementById('app-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'app-toast';
    toast.className = 'app-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2400);
}

// Add item to cart with variant support (size, storage, color)
function addToCart(productId, quantity = 1, variant = null) {
  if (typeof productsData === 'undefined') {
    console.error('productsData not loaded');
    return;
  }
  const product = productsData.find((p) => p.id === productId);
  if (!product) return;

  const cart = getCart();
  const variantText = variant || product.defaultVariant || '';
  
  // Find item with matching ID AND variant
  const existingIndex = cart.findIndex((item) => item.id === productId && item.variant === variantText);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
      icon: product.icon,
      color: product.color,
      quantity: quantity,
      variant: variantText
    });
  }

  saveCart(cart);
  const msg = variantText 
    ? `Added "${product.name} (${variantText})" to Cart!` 
    : `Added "${product.name}" to Cart!`;
  showToast(msg);
}

// Remove item from cart
function removeFromCart(productId, variant = null) {
  let cart = getCart();
  if (variant !== null) {
    cart = cart.filter((item) => !(item.id === productId && item.variant === variant));
  } else {
    cart = cart.filter((item) => item.id !== productId);
  }
  saveCart(cart);
  renderCartPage();
}

// Update quantity
function updateQuantity(productId, delta, variant = null) {
  const cart = getCart();
  const item = cart.find((i) => {
    if (variant !== null) {
      return i.id === productId && i.variant === variant;
    }
    return i.id === productId;
  });
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(productId, item.variant);
    return;
  }
  saveCart(cart);
  renderCartPage();
}

// Render cart page if on cart.html
function renderCartPage() {
  const cartContainer = document.getElementById('cart-items-container');
  const cartEmpty = document.getElementById('cart-empty');
  const cartSummary = document.getElementById('cart-summary');
  const subtotalEl = document.getElementById('cart-subtotal');
  const totalEl = document.getElementById('cart-total');

  if (!cartContainer) return;

  const cart = getCart();
  const currencyFormatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  });

  if (cart.length === 0) {
    cartContainer.innerHTML = '';
    if (cartEmpty) cartEmpty.hidden = false;
    if (cartSummary) cartSummary.style.display = 'none';
    return;
  }

  if (cartEmpty) cartEmpty.hidden = true;
  if (cartSummary) cartSummary.style.display = 'block';

  cartContainer.innerHTML = '';
  let subtotal = 0;

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    const variantHtml = item.variant 
      ? `<span class="cart-item-variant-tag">${item.variant}</span>` 
      : '';

    const row = document.createElement('div');
    row.className = 'cart-item-row';
    row.innerHTML = `
      <div class="cart-item-visual">
        <img 
          src="${item.image || ''}" 
          alt="${item.name}" 
          class="cart-real-img"
          onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
        />
        <div class="cart-fallback-visual" style="display:none; background-color: #f1f5f9;">
          <span class="logo-badge" style="width:36px;height:36px;font-size:0.9rem;">SH</span>
        </div>
      </div>
      <div class="cart-item-details">
        <h4 class="cart-item-title"><a href="product-details.html?id=${item.id}">${item.name}</a></h4>
        <div class="cart-item-meta">
          <span class="cart-item-category">${item.category || ''}</span>
          ${variantHtml}
        </div>
        <p class="cart-item-price">${currencyFormatter.format(item.price)} each</p>
      </div>
      <div class="cart-item-quantity">
        <button type="button" class="qty-btn" onclick="updateQuantity(${item.id}, -1, '${item.variant || ''}')">−</button>
        <span class="qty-number">${item.quantity}</span>
        <button type="button" class="qty-btn" onclick="updateQuantity(${item.id}, 1, '${item.variant || ''}')">+</button>
      </div>
      <div class="cart-item-total">
        ${currencyFormatter.format(itemTotal)}
      </div>
      <button type="button" class="cart-remove-btn" onclick="removeFromCart(${item.id}, '${item.variant || ''}')" title="Remove item">✕</button>
    `;
    cartContainer.appendChild(row);
  });

  if (subtotalEl) subtotalEl.textContent = currencyFormatter.format(subtotal);
  if (totalEl) totalEl.textContent = currencyFormatter.format(subtotal);
}

/* ==========================================================================
   Wishlist Functions
   ========================================================================== */

// Retrieve wishlist from storage
function getWishlist() {
  try {
    const raw = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

// Save wishlist
function saveWishlist(list) {
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(list));
    updateWishlistBadge();
  } catch (e) {
    console.error('Failed to save wishlist:', e);
  }
}

// Update wishlist badge in header
function updateWishlistBadge() {
  const list = getWishlist();
  const badges = document.querySelectorAll('.wishlist-count, #wishlist-count');
  badges.forEach((b) => {
    b.textContent = list.length;
  });
}

// Toggle product in wishlist
function toggleWishlist(e, productId) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }

  let list = getWishlist();
  const index = list.indexOf(productId);
  let isSaved = false;

  if (index > -1) {
    list.splice(index, 1);
    isSaved = false;
    showToast('Removed item from your Wishlist');
  } else {
    list.push(productId);
    isSaved = true;
    showToast('Saved item to your Wishlist!');
  }

  saveWishlist(list);

  // Sync button active classes if on page
  const buttons = document.querySelectorAll(`.wishlist-btn[data-id="${productId}"]`);
  buttons.forEach((btn) => {
    if (isSaved) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // If on wishlist page, re-render
  if (typeof renderWishlistPage === 'function') {
    renderWishlistPage();
  }
}

// Remove specifically from wishlist
function removeFromWishlist(productId) {
  let list = getWishlist();
  list = list.filter((id) => id !== productId);
  saveWishlist(list);
  if (typeof renderWishlistPage === 'function') {
    renderWishlistPage();
  }
  showToast('Item removed from Wishlist');
}

// Move from wishlist to cart
function moveWishlistToCart(productId) {
  addToCart(productId, 1);
  removeFromWishlist(productId);
}

// Window bindings
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.showToast = showToast;
window.getWishlist = getWishlist;
window.toggleWishlist = toggleWishlist;
window.removeFromWishlist = removeFromWishlist;
window.moveWishlistToCart = moveWishlistToCart;

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  updateWishlistBadge();
  renderCartPage();
});
