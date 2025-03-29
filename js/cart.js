
// DOM Elements
const cartPageItems = document.getElementById('cartPageItems');
const cartSubtotal = document.getElementById('cartSubtotal');
const cartServiceFee = document.getElementById('cartServiceFee');
const cartTotal = document.getElementById('cartFinalTotal');
const proceedToCheckoutBtn = document.getElementById('proceedToCheckout');
const emptyCartBtn = document.getElementById('emptyCartBtn');
const emptyCartView = document.getElementById('emptyCartView');
const cartContentView = document.getElementById('cartContentView');

// Service Fee
const SERVICE_FEE = 40;

// Initialize the cart page
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('cart.html')) {
        loadCartPage();
        
        // Empty cart button
        if (emptyCartBtn) {
            emptyCartBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to empty your cart?')) {
                    clearCart();
                    loadCartPage();
                }
            });
        }
    }
});

// Load cart page
function loadCartPage() {
    // Get cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    // Check if cart is empty
    if (cartItems.length === 0) {
        if (emptyCartView && cartContentView) {
            emptyCartView.style.display = 'block';
            cartContentView.style.display = 'none';
        }
        return;
    }
    
    // Show cart content and hide empty cart view
    if (emptyCartView && cartContentView) {
        emptyCartView.style.display = 'none';
        cartContentView.style.display = 'block';
    }
    
    // Render cart items
    if (cartPageItems) {
        renderCartPageItems(cartItems);
    }
    
    // Update cart totals
    updateCartPageTotals(cartItems);
}

// Render cart items on cart page
function renderCartPageItems(cartItems) {
    cartPageItems.innerHTML = '';
    
    cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-page-item');
        
        cartItem.innerHTML = `
            <div class="cart-item-img">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p class="cart-item-price">₹${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn minus" data-id="${item.id}">
                    <i class="fas fa-minus"></i>
                </button>
                <span>${item.quantity}</span>
                <button class="quantity-btn plus" data-id="${item.id}">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
            <div class="cart-item-subtotal">
                ₹${(item.price * item.quantity).toFixed(2)}
            </div>
            <button class="remove-item-btn" data-id="${item.id}">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        cartPageItems.appendChild(cartItem);
    });
    
    // Add event listeners
    document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
        btn.addEventListener('click', () => {
            decreaseQuantity(btn.dataset.id);
            loadCartPage();
        });
    });
    
    document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
        btn.addEventListener('click', () => {
            increaseQuantity(btn.dataset.id);
            loadCartPage();
        });
    });
    
    document.querySelectorAll('.remove-item-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            removeFromCart(btn.dataset.id);
            loadCartPage();
        });
    });
}

// Update cart totals on cart page
function updateCartPageTotals(cartItems) {
    if (!cartSubtotal || !cartServiceFee || !cartTotal) return;
    
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const total = subtotal + SERVICE_FEE;
    
    cartSubtotal.textContent = `₹${subtotal.toFixed(2)}`;
    cartServiceFee.textContent = `₹${SERVICE_FEE.toFixed(2)}`;
    cartTotal.textContent = `₹${total.toFixed(2)}`;
}
