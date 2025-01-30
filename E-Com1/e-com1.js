let cart = [];

document.addEventListener('DOMContentLoaded', function () {
    const cartButtons = document.querySelectorAll('.product-card button');

    cartButtons.forEach(button => {
        button.addEventListener('click', function () {
            addToCart(this);
        });
    });

    // Close the cart when clicking outside of it
    document.getElementById('cart-overlay').addEventListener('click', toggleCart);
});

function addToCart(button) {
    const productCard = button.parentElement;
    const productName = productCard.getAttribute('data-name');
    const productPrice = productCard.getAttribute('data-price');
    const productImg = productCard.querySelector('img').src;

    const product = {
        name: productName,
        price: productPrice,
        img: productImg,
        quantity: 1,
    };

    const existingProduct = cart.find(item => item.name === product.name);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push(product);
    }

    updateCart();
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
            <img src="${product.img}" alt="${product.name}">
            <div>
                <h4>${product.name}</h4>
                <p>Quantity: ${product.quantity}</p>
                <p>$${product.price}</p>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });

    cartTotal.textContent = cart.reduce((total, product) => total + (product.price * product.quantity), 0).toFixed(2);
}

function toggleCart() {
    const cartPanel = document.getElementById('cart-panel');
    const cartOverlay = document.getElementById('cart-overlay');
    cartPanel.classList.toggle('open');
    cartOverlay.style.display = cartPanel.classList.contains('open') ? 'block' : 'none';
}

function checkout() {
    alert('Proceeding to checkout...');
}