// DOM Elements
const deliveryOption = document.getElementsByName('deliveryOption');
const deliveryAddressForm = document.getElementById('deliveryAddressForm');
const pickupInfo = document.getElementById('pickupInfo');
const paymentMethodCards = document.querySelectorAll('.payment-method');
const creditCardForm = document.getElementById('creditCardForm');
const upiForm = document.getElementById('upiForm');
const qrCodeForm = document.getElementById('qrCodeForm');
const orderItems = document.getElementById('orderItems');
const orderSubtotal = document.getElementById('orderSubtotal');
const deliveryFee = document.getElementById('deliveryFee');
const deliveryFeeRow = document.getElementById('deliveryFeeRow');
const orderTotal = document.getElementById('orderTotal');
const completePaymentBtn = document.getElementById('completePayment');
const successModal = document.getElementById('successModal');
const modalOverlay = document.getElementById('modalOverlay');
const returnHomeBtn = document.getElementById('returnHomeBtn');

// Constants
const DELIVERY_FEE = 40;
const SERVICE_FEE = 0; // Adjust service fee if needed

// Initialize checkout page
document.addEventListener('DOMContentLoaded', () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    if (cartItems.length === 0) {
        window.location.href = 'menu.html';
        return;
    }
    
    deliveryOption.forEach(option => option.addEventListener('change', toggleDeliveryOption));
    paymentMethodCards.forEach(card => card.addEventListener('click', selectPaymentMethod));
    if (completePaymentBtn) completePaymentBtn.addEventListener('click', handlePayment);
    if (returnHomeBtn) returnHomeBtn.addEventListener('click', () => window.location.href = 'index.html');
    
    renderOrderItems(cartItems);
    updateOrderTotals(cartItems);
});

// Toggle delivery option
function toggleDeliveryOption() {
    const selectedOption = document.querySelector('input[name="deliveryOption"]:checked').value;
    
    if (selectedOption === 'delivery') {
        deliveryAddressForm.style.display = 'block';
        pickupInfo.style.display = 'none';
        deliveryFeeRow.style.display = 'flex';
        deliveryFee.textContent = `₹${DELIVERY_FEE.toFixed(2)}`;
    } else {
        deliveryAddressForm.style.display = 'none';
        pickupInfo.style.display = 'block';
        deliveryFeeRow.style.display = 'none';
    }
    updateOrderTotals(JSON.parse(localStorage.getItem('cartItems')) || []);
}

// Select payment method
function selectPaymentMethod() {
    paymentMethodCards.forEach(card => card.classList.remove('active'));
    this.classList.add('active');
    document.querySelector(`input[value="${this.dataset.method}"]`).checked = true;
    creditCardForm.style.display = upiForm.style.display = qrCodeForm.style.display = 'none';
    if (this.dataset.method === 'credit-card' || this.dataset.method === 'debit-card') creditCardForm.style.display = 'block';
    if (this.dataset.method === 'upi') upiForm.style.display = 'block';
    if (this.dataset.method === 'qr-code') qrCodeForm.style.display = 'block';
}

// Render order items
function renderOrderItems(cartItems) {
    if (!orderItems) return;
    orderItems.innerHTML = cartItems.map(item => `
        <div class="order-item">
            <span class="order-item-name">${item.quantity}× ${item.name}</span>
            <span class="order-item-price">₹${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');
}

// Update order totals
function updateOrderTotals(cartItems) {
    if (!orderSubtotal || !orderTotal) return;
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const deliveryOptionSelected = document.querySelector('input[name="deliveryOption"]:checked').value;
    const deliveryFeeAmount = deliveryOptionSelected === 'delivery' ? DELIVERY_FEE : 0;
    const total = subtotal + SERVICE_FEE + deliveryFeeAmount;
    orderSubtotal.textContent = `₹${subtotal.toFixed(2)}`;
    orderTotal.textContent = `₹${total.toFixed(2)}`;
}

// Handle payment
function handlePayment() {
    const deliveryOptionSelected = document.querySelector('input[name="deliveryOption"]:checked').value;
    if (deliveryOptionSelected === 'delivery') {
        if (!validateDeliveryFields()) return;
    } else {
        if (!validatePickupFields()) return;
    }
    if (!document.querySelector('input[name="paymentMethod"]:checked')) {
        alert('Please select a payment method');
        return;
    }
    completePaymentBtn.innerHTML = 'Processing...';
    completePaymentBtn.disabled = true;
    setTimeout(() => {
        successModal.classList.add('active');
        modalOverlay.classList.add('active');
        localStorage.removeItem('cartItems');
    }, 2000);
}

// Validate delivery fields
function validateDeliveryFields() {
    const fields = ['fullName', 'phone', 'address', 'city', 'state', 'pincode'];
    for (let field of fields) {
        const value = document.getElementById(field).value;
        if (!value) {
            alert('Please fill in all delivery address fields');
            return false;
        }
    }
    if (!/^[0-9]{10}$/.test(document.getElementById('phone').value)) {
        alert('Enter a valid 10-digit phone number');
        return false;
    }
    return true;
}

// Validate pickup fields
function validatePickupFields() {
    const fields = ['pickupName', 'pickupPhone'];
    for (let field of fields) {
        const value = document.getElementById(field).value;
        if (!value) {
            alert('Please fill in pickup details');
            return false;
        }
    }
    if (!/^[0-9]{10}$/.test(document.getElementById('pickupPhone').value)) {
        alert('Enter a valid 10-digit phone number');
        return false;
    }
    return true;
}

// Verify UPI button
document.getElementById('verifyUpi')?.addEventListener('click', () => {
    const upiId = document.getElementById('upiId').value;
    if (!upiId) {
        alert('Please enter UPI ID');
        return;
    }
    document.getElementById('verifyUpi').innerHTML = 'Verifying...';
    document.getElementById('verifyUpi').disabled = true;
    setTimeout(() => {
        document.getElementById('verifyUpi').innerHTML = 'Verified';
        document.getElementById('verifyUpi').classList.add('btn-success');
    }, 1500);
});
