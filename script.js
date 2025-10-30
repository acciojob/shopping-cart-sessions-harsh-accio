// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${product.name} - $${product.price} 
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(li);
  });

  attachAddToCartEvents();
}

// Attach "Add to Cart" button events
function attachAddToCartEvents() {
  const buttons = document.querySelectorAll(".add-to-cart-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.getAttribute("data-id");
      const product = products.find((p) => p.id == productId);

      let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
      cart.push(product);
      sessionStorage.setItem("cart", JSON.stringify(cart));

      renderCart(); // re-render cart after adding
    });
  });
}

// Render cart list
function renderCart() {
  cartList.innerHTML = ""; // clear previous render
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - $${item.price} 
      <button class="remove-cart-btn" data-id="${item.id}">Remove</button>
    `;
    cartList.appendChild(li);
  });

  attachRemoveEvents();
}

// Remove item from cart
function attachRemoveEvents() {
  const removeButtons = document.querySelectorAll(".remove-cart-btn");

  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id");
      removeFromCart(id);
    });
  });
}

function removeFromCart(productId) {
  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.id != productId);
  sessionStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Clear entire cart
function clearCart() {
  sessionStorage.removeItem("cart");
  renderCart();
}

// Initial render
renderProducts();
renderCart();
