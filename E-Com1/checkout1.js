document.addEventListener('DOMContentLoaded', function () {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const shippingOptions = document.getElementsByName('shipping');

    cart.forEach(product => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <div>
                <h4>${product.name}</h4>
                <p>Quantity: ${product.quantity}</p>
                <p>$${product.price}</p>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });

    updateTotal();

    shippingOptions.forEach(option => {
        option.addEventListener('change', updateTotal);
    });

    document.querySelector('.checkout-form').addEventListener('submit', function (e) {
        e.preventDefault();
        if (validateForm()) {
            alert('Order placed successfully!');
            localStorage.removeItem('cart');
            window.location.href = 'e-com1.html';
        }
    });
});

function updateTotal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartTotal = document.getElementById('cart-total');
    const shippingOptions = document.getElementsByName('shipping');
    let shippingCost = 0;

    shippingOptions.forEach(option => {
        if (option.checked) {
            shippingCost = parseFloat(option.value);
        }
    });

    const totalPrice = cart.reduce((total, product) => {
        return total + (product.price * product.quantity);
    }, 0) + shippingCost;

    cartTotal.textContent = totalPrice.toFixed(2);
}

function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const address = document.getElementById('address').value.trim();
    const cardNumber = document.getElementById('card-number').value.trim();
    const expiryDate = document.getElementById('expiry-date').value.trim();
    const cvv = document.getElementById('cvv').value.trim();

    if (!name || !email || !address || !cardNumber || !expiryDate || !cvv) {
        alert('Please fill in all fields.');
        return false;
    }

    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    if (!validateCardNumber(cardNumber)) {
        alert('Please enter a valid card number.');
        return false;
    }

    if (!validateExpiryDate(expiryDate)) {
        alert('Please enter a valid expiry date.');
        return false;
    }

    if (!validateCVV(cvv)) {
        alert('Please enter a valid CVV.');
        return false;
    }

    return true;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateCardNumber(cardNumber) {
    const re = /^\d{16}$/;
    return re.test(cardNumber);
}

function validateExpiryDate(expiryDate) {
    const re = /^(0[1-9]|1[0-2])\/\d{2}$/;
    return re.test(expiryDate);
}

function validateCVV(cvv) {
    const re = /^\d{3}$/;
    return re.test(cvv);
}
