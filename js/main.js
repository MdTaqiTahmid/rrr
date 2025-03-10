// Sample product data
const products = [
    {
        id: 1,
        name: 'High-Performance Gaming PC',
        price: 1999.99,
        image: 'https://media.istockphoto.com/id/1314343964/photo/top-end-system-unit-for-gaming-computer-close-up.jpg?s=612x612&w=0&k=20&c=d_xKRis8Ccy90gbqCjScpuAEVOvpQN0kdnBxA_H9zRs=',
        description: 'Ultimate gaming experience with RTX 4080, Intel i9, 32GB RAM'
    },
    {
        id: 2,
        name: 'Del Laptop',
        price: 2499.99,
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Powerful workstation for content creation and 3D rendering'
    },
    {
        id: 3,
        name: 'Budget Gaming PC',
        price: 999.99,
        image: 'https://media.istockphoto.com/id/1279796335/photo/studio-shot-of-black-gaming-desktop-pc-with-rgb-lights-and-visible-components.jpg?s=2048x2048&w=is&k=20&c=oQ9WAPzFZ4EsAUeLAekE15gL6K8bPLYRelxffbyowOI=',
        description: 'Great gaming performance at an affordable price'
    },
    {
        id: 4,
        name: 'Home Office pc',
        price: 799.99,
        image: 'https://media.istockphoto.com/id/506040816/photo/modern-desktop-pc-with-curved-screen.jpg?s=612x612&w=0&k=20&c=0ZjhDRbcyZnKfOOHNBw5U_H5pqyg13LHLRb0B5iDgUY=',
        description: 'Perfect for work and everyday computing tasks'
    },
    {
        id: 5,
        name: 'Mother Bord',
        price: 599.99,
        image: 'https://www.startech.com.bd/image/cache/catalog/processor/Intel/i5-7640x-tuf-x299-mark-2-combo/i5-7640x-tuf-x299-mark-2-500x500.webp',
        description: 'Intel Core i5-7640X Processor & Asus TUF X299 MARK 2 Motherboard Combo'
    },
    {
        id: 6,
        name: 'Monitor',
        price: 1499.99,
        image: 'https://i.ebayimg.com/thumbs/images/g/D8EAAeSwfh1ntYd9/s-l1200.jpg',
        description: 'Hige configaration monitor'
    }
];

// Shopping cart state
let cart = [];

// DOM Elements
const productGrid = document.getElementById('productGrid');
const cartButton = document.getElementById('cartButton');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const checkoutButton = document.getElementById('checkoutButton');
const contactForm = document.getElementById('contactForm');

// Load products
function loadProducts() {
    productGrid.innerHTML = products.map(product => `
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
            <div class="p-6">
                <h3 class="text-xl font-bold mb-2">${product.name}</h3>
                <p class="text-gray-600 mb-4">${product.description}</p>
                <div class="flex justify-between items-center">
                    <span class="text-2xl font-bold text-blue-600">$${product.price}</span>
                    <button 
                        onclick="addToCart(${product.id})"
                        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Cart functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, item.quantity + change);
        updateCart();
    }
}

function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update cart items
    cartItems.innerHTML = cart.map(item => `
        <div class="flex items-center justify-between mb-4 bg-gray-50 p-4 rounded-lg">
            <div class="flex items-center">
                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded">
                <div class="ml-4">
                    <h4 class="font-bold">${item.name}</h4>
                    <p class="text-gray-600">$${item.price}</p>
                </div>
            </div>
            <div class="flex items-center">
                <button 
                    onclick="updateQuantity(${item.id}, -1)"
                    class="text-gray-500 hover:text-gray-700 px-2"
                >
                    -
                </button>
                <span class="mx-2">${item.quantity}</span>
                <button 
                    onclick="updateQuantity(${item.id}, 1)"
                    class="text-gray-500 hover:text-gray-700 px-2"
                >
                    +
                </button>
                <button 
                    onclick="removeFromCart(${item.id})"
                    class="ml-4 text-red-500 hover:text-red-700"
                >
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');

    // Update total
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Cart modal
cartButton.addEventListener('click', () => {
    cartModal.classList.remove('hidden');
});

closeCart.addEventListener('click', () => {
    cartModal.classList.add('hidden');
});

// Checkout
checkoutButton.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Thank you for your purchase! This is a demo website.');
    cart = [];
    updateCart();
    cartModal.classList.add('hidden');
});

// Contact form
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! This is a demo website.');
    contactForm.reset();
});

// Initialize
loadProducts();