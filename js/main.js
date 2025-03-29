
// Global Variables
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];


// DOM Elements
const cartBtn = document.getElementById('cartBtn');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const closeCartBtn = document.getElementById('closeCart');
const cartCountEl = document.getElementById('cartCount');
const cartItemsEl = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Update cart count
    updateCartCount();
    
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // Cart sidebar toggle
    if (cartBtn) {
        cartBtn.addEventListener('click', openCart);
    }
    
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', closeCart);
    }
    
    if (cartOverlay) {
        cartOverlay.addEventListener('click', closeCart);
    }
    
    // Init animations for elements with animate class
    const animatedElements = document.querySelectorAll('.animate');
    if (animatedElements.length > 0) {
        initAnimations(animatedElements);
    }
});

// Update cart count
function updateCartCount() {
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    if (cartCountEl) {
        cartCountEl.textContent = totalItems;
    }
}

// Toggle mobile menu
function toggleMobileMenu() {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
}

// Open cart sidebar
function openCart() {
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
    renderCartItems();
}

// Close cart sidebar
function closeCart() {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
}

// Render cart items in sidebar
function renderCartItems() {
    if (!cartItemsEl) return;
    
    cartItemsEl.innerHTML = '';
    
    if (cartItems.length === 0) {
        cartItemsEl.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        return;
    }
    
    cartItems.forEach(item => {
        const cartItemEl = document.createElement('div');
        cartItemEl.classList.add('cart-item');
        
        cartItemEl.innerHTML = `
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p class="cart-item-price">₹${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-actions">
                <div class="quantity-control">
                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                </div>
                <button class="remove-btn" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        cartItemsEl.appendChild(cartItemEl);
    });
    
    // Add event listeners to quantity buttons
    document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
        btn.addEventListener('click', () => decreaseQuantity(btn.dataset.id));
    });
    
    document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
        btn.addEventListener('click', () => increaseQuantity(btn.dataset.id));
    });
    
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', () => removeFromCart(btn.dataset.id));
    });
    
    // Update cart total
    updateCartTotal();
}

// Update cart total
function updateCartTotal() {
    if (!cartTotalEl) return;
    
    const total = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    cartTotalEl.textContent = `₹${total.toFixed(2)}`;
    
    // Update checkout button visibility
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        if (cartItems.length === 0) {
            checkoutBtn.style.display = 'none';
        } else {
            checkoutBtn.style.display = 'block';
        }
    }
}

// Add item to cart
function addToCart(item) {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1,
            image: item.image
        });
    }
    
    // Save to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    // Update UI
    updateCartCount();
    
    // Show notification
    showNotification(`${item.name} added to cart`);
    
    // If cart is open, update cart items
    if (cartSidebar.classList.contains('active')) {
        renderCartItems();
    }
}

// Decrease item quantity
function decreaseQuantity(id) {
    const item = cartItems.find(item => item.id === id);
    
    if (item) {
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            removeFromCart(id);
            return;
        }
        
        // Save to localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        
        // Update UI
        updateCartCount();
        renderCartItems();
    }
}

// Increase item quantity
function increaseQuantity(id) {
    const item = cartItems.find(item => item.id === id);
    
    if (item) {
        item.quantity += 1;
        
        // Save to localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        
        // Update UI
        updateCartCount();
        renderCartItems();
    }
}

// Remove item from cart
function removeFromCart(id) {
    cartItems = cartItems.filter(item => item.id !== id);
    
    // Save to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    // Update UI
    updateCartCount();
    renderCartItems();
}

// Clear cart
function clearCart() {
    cartItems = [];
    
    // Save to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    // Update UI
    updateCartCount();
    renderCartItems();
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Initialize animations
function initAnimations(elements) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}
