// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");

// STEP 1: Render all products
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${product.name} - $${product.price} 
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(li);
  });

  // ✅ STEP 2: Attach event listeners here after rendering
  const buttons = document.querySelectorAll(".add-to-cart-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.getAttribute("data-id");
      const product = products.find((p) => p.id == productId);

      // ✅ Get existing cart or empty array
      let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

      // ✅ Add product without overwriting old ones
      cart.push(product);

      // ✅ Save updated cart
      sessionStorage.setItem("cart", JSON.stringify(cart));

      renderCart(); // re-render cart if needed
    });
  });
}

// STEP 3: Render cart list (if needed)
function renderCart() {
  cartList.innerHTML = "";
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// STEP 4: Clear cart
function clearCart() {
  sessionStorage.clear();
  renderCart();
}

// STEP 5: Initial render
renderProducts();
renderCart();
