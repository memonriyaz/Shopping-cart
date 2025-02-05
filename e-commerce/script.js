document.addEventListener("DOMContentLoaded", function () {
  let productList = document.getElementById("product-list");
  let shoppingCart = document.getElementById("cart-items");
  let emptyCart = document.getElementById("empty-cart");
  let cartTotal = document.getElementById("cart-total");
  let totalPrice = document.getElementById("total-price");
  let checkOut = document.getElementById("checkout-btn");

  let total = 0;
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  let products = [
    { id: 1, name: "Apple", price: 1000 },
    { id: 2, name: "Samsung", price: 2000 },
    { id: 3, name: "LG", price: 3000 },
    { id: 4, name: "Nokia", price: 4000 },
  ];

  // Function to update cart display
  function updateCartUI() {
    shoppingCart.innerHTML = "";
    total = 0;

    if (cartItems.length === 0) {
      emptyCart.classList.remove("hidden");
      cartTotal.classList.add("hidden");
      return;
    }

    emptyCart.classList.add("hidden");
    cartTotal.classList.remove("hidden");

    cartItems.forEach((item) => {
      total += item.price * item.quantity;
      let cartItem = document.createElement("div");
      cartItem.classList.add("product");
      cartItem.innerHTML = `
            <span>${item.name} - $${item.price} (x${item.quantity})</span>
            <button class="remove-item" data-id="${item.id}">Remove</button>
          `;
      shoppingCart.appendChild(cartItem);
    });

    totalPrice.textContent = `$${total}`;
  }

  // Load cart from local storage
  updateCartUI();

  // Display product list
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
            <span>${product.name} - $${product.price}</span>
            <button data-id="${product.id}">Add to Cart</button>
        `;
    productList.appendChild(productDiv);
  });

  // Add to cart event
  productList.addEventListener("click", function (e) {
    if (e.target.tagName === "BUTTON") {
      let productId = parseInt(e.target.getAttribute("data-id"));
      let product = products.find((p) => p.id === productId);
      
      let existingItem = cartItems.find((item) => item.id === productId);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        cartItems.push({ ...product, quantity: 1 });
      }

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      updateCartUI();
    }
  });

  // Remove item from cart event (using event delegation)
  shoppingCart.addEventListener("click", function (e) {
    if (e.target.classList.contains("remove-item")) {
      let productId = parseInt(e.target.getAttribute("data-id"));
      let existingItem = cartItems.find((item) => item.id === productId);

      if (existingItem.quantity > 1) {
        existingItem.quantity--;
      } else {
        cartItems = cartItems.filter((item) => item.id !== productId);
      }

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      updateCartUI();
    }
  });

  // Checkout event
  checkOut.addEventListener("click", function () {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    alert(`Total Price: $${total}`);

    // Clear cart
    cartItems = [];
    localStorage.removeItem("cartItems");

    updateCartUI();
  });
});


