let price = 0;
let priceUnit = 0;

// ...existing code...
const userName = localStorage.getItem("username");
if (userName) {
  document.getElementById("r2").innerText = `Welcome ${userName}`;
  document.getElementById("r2").style.color = "tomato";
  

} else {
  // If the user is not logged in, display a login prompt
  document.getElementById("r2").innerText = "Login";
}

document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalContainer = document.getElementById("cart-total");
  const buyNowButton = document.getElementById("buy-now");

  // Load cart data from localStorage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    cartTotalContainer.style.display = "none";
    buyNowButton.style.display = "none";
  } else {
    let totalPrice = 0;

    cart.forEach((item) => {
      const itemBox = document.createElement("div");
      itemBox.classList.add("card");

      const itemImage = document.createElement("img");
      itemImage.src = item.image;
      itemImage.alt = item.name;

      const itemName = document.createElement("h3");
      itemName.innerText = item.name;

      const itemPrice = document.createElement("p");
      itemPrice.innerText = `${item.price}`;

      const itemQuantity = document.createElement("p");
      itemQuantity.innerText = `Quantity: ${item.quantity}`;

      itemBox.appendChild(itemImage);
      itemBox.appendChild(itemName);
      itemBox.appendChild(itemPrice);
      itemBox.appendChild(itemQuantity);

      price = item.price;
      priceUnit = parseInt(price.split(" ")[1], 10);

      cartItemsContainer.appendChild(itemBox);
      console.log(priceUnit);
      totalPrice += priceUnit * item.quantity;
    });

    cartTotalContainer.innerText = `Total Price: $${totalPrice}`;
  }

  buyNowButton.addEventListener("click", () => {
    
    localStorage.removeItem("cart");
    window.location.href = "./complete.html";
  });

  // Load cart data from localStorage for the cart icon
  const cartIcon = document.getElementById("cart-icon");
  const cartQuantity = document.getElementById("cart-quantity");
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (totalQuantity > 0) {
    cartIcon.style.color = "tomato";
    cartQuantity.innerText = totalQuantity;
    cartQuantity.style.display = "inline";
  }
});
