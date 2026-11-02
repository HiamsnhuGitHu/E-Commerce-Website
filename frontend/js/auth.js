// Authentication, Role-Based Access (BUYER, SELLER, ADMIN), and Profile Management

// Default user profile if none set
const DEFAULT_USER = {
  id: 1,
  name: "Himanshu Sharma",
  email: "himanshu.sharma@example.com",
  phone: "+91 98765 43210",
  address: "Flat 402, Green Valley Apartments, Outer Ring Road, Bengaluru, Karnataka - 560103",
  memberSince: "October 2024",
  role: "BUYER", // Roles: BUYER, SELLER, ADMIN
  orders: [
    {
      id: "ORD-9842",
      date: "Oct 24, 2026",
      items: "Nike Air Zoom Pegasus (1)",
      total: "₹4,999",
      status: "Delivered",
      statusColor: "status-delivered"
    },
    {
      id: "ORD-9710",
      date: "Oct 12, 2026",
      items: "Sony WH-1000XM5 ANC Headphones (1)",
      total: "₹26,990",
      status: "Shipped",
      statusColor: "status-shipped"
    }
  ]
};

// Retrieve current logged in user
function getUser() {
  try {
    const raw = localStorage.getItem('ecommerce_user');
    if (!raw) {
      localStorage.setItem('ecommerce_user', JSON.stringify(DEFAULT_USER));
      return DEFAULT_USER;
    }
    const user = JSON.parse(raw);
    if (!user || !user.name) {
      localStorage.setItem('ecommerce_user', JSON.stringify(DEFAULT_USER));
      return DEFAULT_USER;
    }
    if (!user.role) user.role = 'BUYER';
    return user;
  } catch (e) {
    return DEFAULT_USER;
  }
}

// Save user data
function saveUser(user) {
  try {
    localStorage.setItem('ecommerce_user', JSON.stringify(user));
    syncAccountUI();
  } catch (e) {
    console.error('Failed to save user:', e);
  }
}

// Sync UI header with user name, role badge, and sign out button
function syncAccountUI() {
  const user = getUser();
  const label = document.getElementById('account-btn-label');
  const accountBtn = document.getElementById('header-account-btn');
  const signOutBtn = document.getElementById('header-signout-btn');

  if (label && user && user.name) {
    const firstName = user.name.split(' ')[0];
    const roleTag = user.role === 'ADMIN' ? ' (Admin)' : user.role === 'SELLER' ? ' (Seller)' : '';
    label.textContent = `${firstName}${roleTag}`;
  }
  if (accountBtn && user && user.name) {
    accountBtn.title = `Logged in as ${user.name} (${user.role || 'BUYER'})`;
  }
  if (signOutBtn) {
    signOutBtn.style.display = 'inline-flex';
  }
}

// Open Account Modal
function openAccountModal() {
  let modal = document.getElementById('account-modal');
  if (!modal) {
    createAccountModalDOM();
    modal = document.getElementById('account-modal');
  }

  const user = getUser();
  if (!user || !user.name) return;

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const avatarEl = document.getElementById('acc-avatar');
  if (avatarEl) avatarEl.textContent = initials || 'U';

  const nameEl = document.getElementById('acc-name');
  if (nameEl) nameEl.textContent = user.name;

  const emailEl = document.getElementById('acc-email');
  if (emailEl) emailEl.textContent = user.email;

  const phoneEl = document.getElementById('acc-phone');
  if (phoneEl) phoneEl.textContent = user.phone || '+91 98765 43210';

  const memberEl = document.getElementById('acc-member');
  if (memberEl) memberEl.textContent = user.memberSince || 'October 2024';

  const addressEl = document.getElementById('acc-address');
  if (addressEl) addressEl.textContent = user.address || 'Bengaluru, Karnataka - 560103';

  // Role Badge in Profile Banner
  const roleBadgeEl = document.getElementById('acc-role-badge');
  if (roleBadgeEl) {
    if (user.role === 'ADMIN') {
      roleBadgeEl.className = 'verified-badge badge-admin';
      roleBadgeEl.textContent = 'System Administrator';
    } else if (user.role === 'SELLER') {
      roleBadgeEl.className = 'verified-badge badge-seller';
      roleBadgeEl.textContent = 'Verified Merchant';
    } else {
      roleBadgeEl.className = 'verified-badge';
      roleBadgeEl.textContent = 'Verified Customer';
    }
  }

  // Role-specific Panel (Seller / Admin tools)
  const rolePanel = document.getElementById('acc-role-panel');
  if (rolePanel) {
    if (user.role === 'SELLER') {
      rolePanel.style.display = 'block';
      rolePanel.innerHTML = `
        <div class="role-action-box">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <strong>Seller Portal Tools</strong>
            <button type="button" class="btn-primary" style="margin-top:0; width:auto; padding:6px 14px; font-size:0.8rem;" onclick="promptAddSellerProduct()">+ Add Product</button>
          </div>
          <p style="font-size:0.8rem; color:#64748b; margin-top:6px;">You can list new products, update stock, and track sales for your store.</p>
        </div>
      `;
    } else if (user.role === 'ADMIN') {
      rolePanel.style.display = 'block';
      rolePanel.innerHTML = `
        <div class="role-action-box" style="background:#fef2f2; border-color:#fecaca;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <strong style="color:#b91c1c;">Admin Control Center</strong>
            <span style="font-size:0.75rem; background:#fee2e2; color:#b91c1c; padding:3px 8px; border-radius:6px; font-weight:700;">Full Access</span>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-top:10px; font-size:0.82rem;">
            <div>Users: <strong>4 Registered</strong></div>
            <div>Products: <strong>20 Active</strong></div>
            <div>Orders: <strong>2 Total</strong></div>
            <div>Revenue: <strong>₹31,989</strong></div>
          </div>
        </div>
      `;
    } else {
      rolePanel.style.display = 'none';
    }
  }

  // Render recent orders
  const ordersContainer = document.getElementById('acc-orders-list');
  if (ordersContainer && user.orders) {
    ordersContainer.innerHTML = '';
    user.orders.forEach((ord) => {
      const item = document.createElement('div');
      item.className = 'acc-order-item';
      item.innerHTML = `
        <div class="acc-order-header">
          <span class="acc-order-id">${ord.id}</span>
          <span class="acc-order-date">${ord.date}</span>
        </div>
        <div class="acc-order-body">
          <span class="acc-order-items">${ord.items}</span>
          <span class="acc-order-status ${ord.statusColor}">${ord.status}</span>
        </div>
        <div class="acc-order-total">${ord.total}</div>
      `;
      ordersContainer.appendChild(item);
    });
  }

  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

// Close Account Modal
function closeAccountModal() {
  const modal = document.getElementById('account-modal');
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
}

// Seller tool: quick add product
function promptAddSellerProduct() {
  const name = prompt("Enter Product Name:");
  if (!name) return;
  const price = prompt("Enter Price (INR):", "1999");
  if (!price) return;
  const category = prompt("Category (Shoes, T-Shirts, Phones, Laptops, Accessories):", "Accessories");

  const newProduct = {
    id: Date.now(),
    name: name,
    category: category || "Accessories",
    price: parseFloat(price) || 1999,
    originalPrice: (parseFloat(price) || 1999) * 1.3,
    discount: "23% OFF",
    badge: "Seller Listed",
    rating: 5.0,
    reviews: 1,
    image: "images/products/product-18.jpg",
    icon: "🛍️",
    color: "#f1f5f9",
    description: `Brand new item listed by Seller (${getUser().name}).`,
    specs: ["Brand verified listing", "Official manufacturer warranty", "Express doorstep delivery"]
  };

  if (typeof productsData !== 'undefined') {
    productsData.unshift(newProduct);
    if (typeof applyFilters === 'function') applyFilters();
  }

  closeAccountModal();
  if (typeof showToast === 'function') {
    showToast(`Product "${name}" successfully listed to ShopHere catalog!`);
  }
}

// Toggle edit profile mode
function toggleEditProfile() {
  const viewMode = document.getElementById('acc-view-mode');
  const editMode = document.getElementById('acc-edit-mode');
  const user = getUser();

  if (editMode.style.display === 'none' || !editMode.style.display) {
    document.getElementById('edit-acc-name').value = user.name || '';
    document.getElementById('edit-acc-phone').value = user.phone || '';
    document.getElementById('edit-acc-address').value = user.address || '';
    viewMode.style.display = 'none';
    editMode.style.display = 'block';
  } else {
    viewMode.style.display = 'block';
    editMode.style.display = 'none';
  }
}

// Save edited profile
function handleSaveProfile(e) {
  e.preventDefault();
  const user = getUser();
  user.name = document.getElementById('edit-acc-name').value.trim() || user.name;
  user.phone = document.getElementById('edit-acc-phone').value.trim() || user.phone;
  user.address = document.getElementById('edit-acc-address').value.trim() || user.address;

  saveUser(user);
  toggleEditProfile();
  openAccountModal();

  if (typeof window.showToast === 'function') {
    window.showToast('Profile updated successfully!');
  }
}

// Log out or switch account
function handleSignOut(skipConfirm = false) {
  if (skipConfirm || confirm("Are you sure you want to sign out from ShopHere?")) {
    localStorage.removeItem('ecommerce_user');
    closeAccountModal();
    if (typeof window.showToast === 'function') {
      window.showToast('You have been signed out successfully.');
    }
    setTimeout(() => {
      window.location.assign('login.html');
    }, 150);
  }
}

// Inject Account Modal DOM into document if not present
function createAccountModalDOM() {
  if (document.getElementById('account-modal')) return;

  const modal = document.createElement('div');
  modal.id = 'account-modal';
  modal.className = 'account-modal-overlay';
  modal.innerHTML = `
    <div class="account-modal-card">
      <div class="account-modal-header">
        <h2>My Account</h2>
        <button type="button" class="close-modal-btn" onclick="closeAccountModal()">&times;</button>
      </div>

      <div class="account-modal-body">
        <!-- Top Profile Banner -->
        <div class="acc-profile-banner">
          <div class="acc-avatar" id="acc-avatar">HS</div>
          <div class="acc-profile-meta">
            <h3 id="acc-name">Himanshu Sharma</h3>
            <p id="acc-email">himanshu.sharma@example.com</p>
            <span id="acc-role-badge" class="verified-badge">✓ Verified Customer</span>
          </div>
        </div>

        <!-- Role-Specific Action Panel (Seller / Admin) -->
        <div id="acc-role-panel" style="display:none; margin-bottom:18px;"></div>

        <!-- View Mode: Details & Orders -->
        <div id="acc-view-mode">
          <div class="acc-info-section">
            <div class="acc-info-header">
              <h4>Personal Information</h4>
              <button type="button" class="acc-edit-link" onclick="toggleEditProfile()">Edit</button>
            </div>
            <div class="acc-info-grid">
              <div class="info-block">
                <span class="info-label">Phone Number</span>
                <span class="info-val" id="acc-phone">+91 98765 43210</span>
              </div>
              <div class="info-block">
                <span class="info-label">Member Since</span>
                <span class="info-val" id="acc-member">October 2024</span>
              </div>
            </div>
            <div class="info-block" style="margin-top: 14px;">
              <span class="info-label">Saved Delivery Address</span>
              <p class="info-val" id="acc-address">Flat 402, Green Valley Apartments, Outer Ring Road, Bengaluru, Karnataka - 560103</p>
            </div>
          </div>

          <!-- Orders Section -->
          <div class="acc-orders-section">
            <div class="acc-info-header">
              <h4>Recent Orders</h4>
              <a href="orders.html" style="font-size:0.84rem; color:#2563eb; font-weight:700; text-decoration:none;">View All Orders &rarr;</a>
            </div>
            <div id="acc-orders-list" class="acc-orders-list"></div>
            <div style="margin-top: 14px;">
              <a href="orders.html" class="btn-orders-cta">
                <svg class="nav-icon-svg" viewBox="0 0 24 24" style="width:16px;height:16px;"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg> All Orders History
              </a>
            </div>
          </div>

          <!-- Action Footer -->
          <div class="acc-modal-actions">
            <button type="button" class="btn-logout" onclick="handleSignOut()">
              <svg class="nav-icon-svg" viewBox="0 0 24 24" style="width:16px;height:16px;"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg> Sign Out
            </button>
            <div style="display:flex; gap:10px;">
              <a href="orders.html" class="btn-secondary" style="text-decoration:none; display:inline-flex; align-items:center; gap:6px; padding:8px 16px; font-size:0.85rem; font-weight:700;">
                <svg class="nav-icon-svg" viewBox="0 0 24 24" style="width:16px;height:16px;"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg> All Orders
              </a>
              <button type="button" class="btn-primary" style="margin-top:0; width:auto; padding:8px 20px;" onclick="closeAccountModal()">Done</button>
            </div>
          </div>
        </div>

        <!-- Edit Mode -->
        <form id="acc-edit-mode" style="display:none;" onsubmit="handleSaveProfile(event)">
          <div class="form-group">
            <label for="edit-acc-name">Full Name</label>
            <input type="text" id="edit-acc-name" required>
          </div>
          <div class="form-group">
            <label for="edit-acc-phone">Phone Number</label>
            <input type="tel" id="edit-acc-phone" required>
          </div>
          <div class="form-group">
            <label for="edit-acc-address">Delivery Address</label>
            <textarea id="edit-acc-address" rows="3" class="edit-textarea" required></textarea>
          </div>
          <div class="acc-edit-buttons">
            <button type="button" class="btn-secondary" onclick="toggleEditProfile()">Cancel</button>
            <button type="submit" class="btn-primary" style="margin-top:0; width:auto; padding:9px 24px;">Save Changes</button>
          </div>
        </form>

      </div>
    </div>
  `;

  // Close on outside click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeAccountModal();
  });

  document.body.appendChild(modal);
}

// Expose globals
window.openAccountModal = openAccountModal;
window.closeAccountModal = closeAccountModal;
window.toggleEditProfile = toggleEditProfile;
window.handleSaveProfile = handleSaveProfile;
window.handleSignOut = handleSignOut;
window.promptAddSellerProduct = promptAddSellerProduct;

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  createAccountModalDOM();
  syncAccountUI();

  // Attach click listener to My Account buttons
  const accountButtons = document.querySelectorAll('.account-trigger, #header-account-btn');
  accountButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openAccountModal();
    });
  });

  // Handle Login Form if on login.html
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value.trim().toLowerCase();
      const password = document.getElementById('password').value.trim();

      if (email && password) {
        let role = 'BUYER';
        let name = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

        if (email === 'admin@shophere.com') {
          role = 'ADMIN';
          name = 'ShopHere Platform Admin';
        } else if (email === 'seller@shophere.com') {
          role = 'SELLER';
          name = 'Apex Retailers Store';
        } else if (email === 'buyer@shophere.com') {
          role = 'BUYER';
          name = 'John Buyer';
        }

        const user = {
          name: name,
          email: email,
          phone: "+91 98765 43210",
          address: "Flat 402, Green Valley Apartments, Bengaluru, Karnataka - 560103",
          memberSince: "October 2024",
          role: role,
          orders: [
            {
              id: "ORD-9842",
              date: "Oct 24, 2026",
              items: "Nike Air Zoom Pegasus (1)",
              total: "₹4,999",
              status: "Delivered",
              statusColor: "status-delivered"
            }
          ]
        };

        const submitBtn = document.getElementById('btn-submit-login') || loginForm.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<span class="pay-loading-spinner" style="width:16px;height:16px;border-width:2px;margin-right:6px;"></span> <span>Signing in...</span>';
        }
        saveUser(user);
        setTimeout(() => {
          window.location.assign('products.html');
        }, 500);
      }
    });
  }

  // Handle Register Form if on register.html
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();
      const roleEl = document.getElementById('role');
      const role = roleEl ? roleEl.value : 'BUYER';

      if (name && email && password) {
        const newUser = {
          name: name,
          email: email,
          phone: "+91 98765 43210",
          address: "Flat 402, Green Valley Apartments, Outer Ring Road, Bengaluru, Karnataka - 560103",
          memberSince: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          role: role,
          orders: []
        };
        const submitBtn = document.getElementById('btn-submit-register') || registerForm.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<span class="pay-loading-spinner" style="width:16px;height:16px;border-width:2px;margin-right:6px;"></span> <span>Creating Account...</span>';
        }
        saveUser(newUser);
        setTimeout(() => {
          window.location.assign('products.html');
        }, 500);
      }
    });
  }
});
