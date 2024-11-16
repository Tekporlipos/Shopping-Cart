// Product Data
const products = [
  { id: 1, name: "Apple", price: 1.2, description: "Fresh red apple", image: "https://via.placeholder.com/150" },
  { id: 2, name: "Banana", price: 0.5, description: "Sweet yellow banana", image: "https://via.placeholder.com/150" },
  { id: 3, name: "Orange", price: 0.8, description: "Juicy orange", image: "https://via.placeholder.com/150" },
  { id: 4, name: "Grapes", price: 2.5, description: "Seedless grapes", image: "https://via.placeholder.com/150" },
];

let cart = [];

// DOM Elements
const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");
const searchBar = document.getElementById("search-bar");

// Render Products
function renderProducts(filter = "") {
  productList.innerHTML = "";
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(filter.toLowerCase())
  );

  filteredProducts.forEach(product => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p>$${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(productCard);
  });
}

// Add to Cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  cart.push(product);
  updateCart();
}

// Remove from Cart
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Update Cart
function updateCart() {
  cartItems.innerHTML = "";
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - $${item.price.toFixed(2)}
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartItems.appendChild(li);
  });

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  totalPrice.textContent = total.toFixed(2);
}

// Search Functionality
searchBar.addEventListener("input", event => {
  renderProducts(event.target.value);
});

// Initialize App
renderProducts();
