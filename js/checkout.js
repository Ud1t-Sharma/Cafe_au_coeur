
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
const DELIVERY_FEE = 40; // Delivery fee for delivery option




// Initialize the checkout page
document.addEventListener('DOMContentLoaded', () => {
    // Load cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    // If cart is empty, redirect to menu page
    if (cartItems.length === 0) {
        window.location.href = 'menu.html';
        return;
    }
    
    // Set up delivery option toggling
    if (deliveryOption.length > 0) {
        for (let i = 0; i < deliveryOption.length; i++) {
            deliveryOption[i].addEventListener('change', toggleDeliveryOption);
        }
    }
    
    // Set up payment method selection
    if (paymentMethodCards.length > 0) {
        paymentMethodCards.forEach(card => {
            card.addEventListener('click', selectPaymentMethod);
        });
    }
    
    // Set up complete payment button
    if (completePaymentBtn) {
        completePaymentBtn.addEventListener('click', handlePayment);
    }
    
    // Set up return home button
    if (returnHomeBtn) {
        returnHomeBtn.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
    
    // Load order summary
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
        deliveryFeeRow.style.display = 'flex';
        deliveryFee.textContent = 'Free';
    }
    
    // Update order totals
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    updateOrderTotals(cartItems);
}

// Select payment method
function selectPaymentMethod() {
    const paymentMethod = this.dataset.method;
    
    // Update selected card styles
    paymentMethodCards.forEach(card => {
        card.classList.remove('active');
    });
    this.classList.add('active');
    
    // Check the radio button
    document.querySelector(`input[value="${paymentMethod}"]`).checked = true;
    
    // Show appropriate payment form
    creditCardForm.style.display = 'none';
    upiForm.style.display = 'none';
    qrCodeForm.style.display = 'none';
    
    if (paymentMethod === 'credit-card' || paymentMethod === 'debit-card') {
        creditCardForm.style.display = 'block';
    } else if (paymentMethod === 'upi') {
        upiForm.style.display = 'block';
    } else if (paymentMethod === 'qr-code') {
        qrCodeForm.style.display = 'block';
    }
}

// Render order items
function renderOrderItems(cartItems) {
    if (!orderItems) return;
    
    orderItems.innerHTML = '';
    
    cartItems.forEach(item => {
        const orderItem = document.createElement('div');
        orderItem.classList.add('order-item');
        
        orderItem.innerHTML = `
            <span class="order-item-name">${item.quantity}× ${item.name}</span>
            <span class="order-item-price">₹${(item.price * item.quantity).toFixed(2)}</span>
        `;
        
        orderItems.appendChild(orderItem);
    });
}

// Update order totals
function updateOrderTotals(cartItems) {
    if (!orderSubtotal || !orderTotal) return;
    
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const deliveryOptionSelected = document.querySelector('input[name="deliveryOption"]:checked').value;
    const deliveryFeeAmount = deliveryOptionSelected === 'delivery' ? DELIVERY_FEE : 0;
    console.log('Subtotal:', subtotal); // Debugging: log subtotal
    console.log('Delivery Fee:', deliveryFeeAmount); // Debugging: log delivery fee
    const total = subtotal + SERVICE_FEE + deliveryFeeAmount; // Total amount calculation


    
    console.log('Updated Subtotal Display:', `₹${subtotal.toFixed(2)}`); // Debugging: log updated subtotal display
    orderSubtotal.textContent = `₹${subtotal.toFixed(2)}`; // Update subtotal display


    console.log('Updated Total Display:', `₹${total.toFixed(2)}`); // Debugging: log updated total display
    orderTotal.textContent = `₹${total.toFixed(2)}`; // Update total display


}

// Handle payment
function handlePayment() {
    // Validate delivery address
    const deliveryOptionSelected = document.querySelector('input[name="deliveryOption"]:checked').value;
    
    if (deliveryOptionSelected === 'delivery') {
        const fullName = document.getElementById('fullName').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const state = document.getElementById('state').value;
        const pincode = document.getElementById('pincode').value;
        
        if (!fullName || !phone || !address || !city || !state || !pincode) {
            alert('Please fill in all delivery address fields');
            return;
        }
    } else {
        const pickupName = document.getElementById('pickupName').value;
        const pickupPhone = document.getElementById('pickupPhone').value;
        
        if (!pickupName || !pickupPhone) {
            alert('Please fill in pickup details');
            return;
        }
    }
    
    // Validate payment method
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
    
    if (!paymentMethod) {
        alert('Please select a payment method');
        return;
    }
    
    // Validate payment details for credit/debit card
    if (paymentMethod.value === 'credit-card' || paymentMethod.value === 'debit-card') {
        const cardNumber = document.getElementById('cardNumber').value;
        const expiryDate = document.getElementById('expiryDate').value;
        const cvv = document.getElementById('cvv').value;
        const cardName = document.getElementById('cardName').value;
        
        if (!cardNumber || !expiryDate || !cvv || !cardName) {
            alert('Please fill in all card details');
            return;
        }
    }
    
    // Validate UPI ID for UPI payment
    if (paymentMethod.value === 'upi') {
        const upiId = document.getElementById('upiId').value;
        
        if (!upiId) {
            alert('Please enter UPI ID');
            return;
        }
    }
    
    // Simulate payment processing
    completePaymentBtn.innerHTML = 'Processing...';
    completePaymentBtn.disabled = true;
    
    setTimeout(() => {
        // Show success modal
        successModal.classList.add('active');
        modalOverlay.classList.add('active');
        
        // Clear cart
        localStorage.removeItem('cartItems');
    }, 2000);
}

// Verify UPI button
if (document.getElementById('verifyUpi')) {
    document.getElementById('verifyUpi').addEventListener('click', () => {
        const upiId = document.getElementById('upiId').value;
        
        if (!upiId) {
            alert('Please enter UPI ID');
            return;
        }
        
        document.getElementById('verifyUpi').innerHTML = 'Verifying...';
        document.getElementById('verifyUpi').disabled = true;
        
        setTimeout(() => {
            document.getElementById('verifyUpi').innerHTML = 'Verified';
            document.getElementById('verifyUpi').className = 'btn btn-primary';
            handlePayment();
        }, 1500);
    });
}
