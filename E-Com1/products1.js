let cart = [];

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
    const productPrice = productCard.querySelector('p').innerText;
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

    updateCart();
    toggleCart();
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
                <p>${product.price}</p>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });

    const totalPrice = cart.reduce((total, product) => {
        const price = parseFloat(product.price.replace('$', ''));
        return total + (price * product.quantity);
    }, 0);

    cartTotal.textContent = totalPrice.toFixed(2);
}

function toggleCart() {
    const cartPanel = document.getElementById('cart-panel');
    const cartOverlay = document.getElementById('cart-overlay');
    cartPanel.classList.toggle('open');
    cartOverlay.classList.toggle('show');
}

function checkout() {
    alert('Proceeding to checkout...');
}

// Ensure the correct toggleMenu function is used
function toggleMenu() {
    const burgerMenu = document.getElementById('burger-menu');
    burgerMenu.classList.toggle('show');
}

// Show all products by default
window.onload = function() {
    filterProducts('male'); // Change this to show a specific category on load if desired
};