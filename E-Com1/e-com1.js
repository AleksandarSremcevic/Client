let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', function () {
    const cartButtons = document.querySelectorAll('.product-card button');

    cartButtons.forEach(button => {
        button.addEventListener('click', function () {
            addToCart(this);
        });
    });

    updateCart();
});

function filterProducts(category) {
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        if (card.classList.contains(category)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function addToCart(button) {
    const productCard = button.parentElement;
    const productName = productCard.querySelector('h3').innerText;
    const productPrice = parseFloat(productCard.querySelector('p').innerText.replace('$', ''));
    const productImage = productCard.querySelector('img').src;

    const product = {
        name: productName,
        price: productPrice,
        image: productImage,
        quantity: 1
    };

    const existingProduct = cart.find(item => item.name === product.name);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
    toggleCart();
}

function removeFromCart(productName) {
    const productIndex = cart.findIndex(item => item.name === productName);
    if (productIndex !== -1) {
        cart.splice(productIndex, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }
}

function updateCart() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    cartCount.textContent = cart.reduce((total, product) => total + product.quantity, 0);

    cartItems.innerHTML = '';
    cart.forEach(product => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div>
                <h4>${product.name}</h4>
                <p>Quantity: ${product.quantity}</p>
                <p>$${product.price.toFixed(2)}</p>
                <button onclick="removeFromCart('${product.name}')">Remove</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });

    const totalPrice = cart.reduce((total, product) => total + (product.price * product.quantity), 0);

    cartTotal.textContent = totalPrice.toFixed(2);
}

function toggleCart() {
    const cartPanel = document.getElementById('cart-panel');
    const cartOverlay = document.getElementById('cart-overlay');
    cartPanel.classList.toggle('open');
    cartOverlay.classList.toggle('show');
}

function checkout() {
    window.location.href = 'checkout1.html';
}

// Ensure the correct toggleMenu function is used
function toggleMenu() {
    const burgerMenu = document.getElementById('burger-menu');
    burgerMenu.classList.toggle('show');
}

// Show all products by default
window.onload = function() {
    updateCart(); // Ensure the cart is updated on page load
};