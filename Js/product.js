let count = 0;
let pricePerUnit = 0;
let pricePer = 0;

function increaseQuantity() {
  count++;
  updateQuantityAndPrice();
}

function decreaseQuantity() {
  if (count > 0) {
    count--;
    updateQuantityAndPrice();
  }
}

function updateQuantityAndPrice() {
  document.getElementById("product-quantity").value = count;
  const totalPrice = count * pricePerUnit;
  console.log(count);
  document.getElementById("product-price").innerText = `Price: $${totalPrice}`;
}
function addToCart() {
  const cartIcon = document.getElementById("cart-icon");
  const cartQuantity = document.getElementById("cart-quantity");

  if (count > 0) {
    cartIcon.style.color = "tomato";

    // Get existing cart data from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the product is already in the cart
    const productDetails = JSON.parse(localStorage.getItem("productDetails"));
    const existingProductIndex = cart.findIndex(
      (item) => item.name === productDetails.name
    );

    if (existingProductIndex !== -1) {
      // Update the quantity of the existing product
      cart[existingProductIndex].quantity += count;
    } else {
      // Add the new product to the cart
      cart.push({ ...productDetails, quantity: count });
    }

    // Save the updated cart data to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update the cart icon quantity
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartQuantity.innerText = totalQuantity;
    cartQuantity.style.display = "inline";
  }
}

let userName = localStorage.getItem("name");
if (userName) {
  document.getElementById("r2").innerText = `Welcome ${userName}`;
  document.getElementById("r2").style.color = "tomato";
} else {
  document.getElementById("r2").innerText = "Login";
}

document.addEventListener("DOMContentLoaded", () => {
  const productImage = document.getElementById("product-image");
  const productName = document.getElementById("product-name");
  const productCategory = document.getElementById("product-category");
  const productPrice = document.getElementById("product-price");
  const productQuantity = document.getElementById("product-quantity");

  const productDetails = JSON.parse(localStorage.getItem("productDetails"));

  function get_category() {
    console.log(productDetails.name);
    if (
      productDetails.name == "Shirt" ||
      productDetails.name == "T-Shirt" ||
      productDetails.name == "Jacket" ||
      productDetails.name == "Suit"
    ) {
      return "Clothes";
    } else if (
      productDetails.name == "Phone" ||
      productDetails.name == "Camera" ||
      productDetails.name == "Ipad" ||
      productDetails.name == "Laptop" ||
      productDetails.name == "Keyboard"
    ) {
      return "Electronics";
    } else if (
      productDetails.name == "Book" ||
      productDetails.name == "Magazine" ||
      productDetails.name == "Poetry"
    ) {
      return "Books";
    } else {
      return "unknown";
    }
  }

  if (productDetails) {
    productImage.src = productDetails.image;
    productName.innerText = productDetails.name;
    productCategory.innerText = `Category: ${get_category()}`;
    pricePer = productDetails.price;
    //console.log(pricePer);
    pricePerUnit = parseInt(pricePer.split(" ")[1], 10);
    //console.log(pricePerUnit);
    const totalPrice = count * pricePerUnit;
    productPrice.innerText = `Price: $${totalPrice}`;
    productQuantity.value = count;
  }

  // Load cart data from localStorage
  // Retrieves a cart string from local storage,
  // converts it to an array of items, and defaults to an empty array if nothing is found.
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  // Reduce the cart array to a single value, the total quantity of all items in the cart.
  // The sum is the accumulated value, and item is the current value being processed.
  // The 0 is the initial value of the sum.
  // The totalQuantity is the total quantity of all items in the cart.
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  //Checks if there are any items in the cart and only runs the enclosed code if true.
  if (totalQuantity > 0) {
    // Selects the cart icon and changes its color to tomato.
    // Selects the cart quantity and sets its text to the total quantity.
    // Sets the display style of the cart quantity to inline
    const cartIcon = document.getElementById("cart-icon");
    const cartQuantity = document.getElementById("cart-quantity");
    cartIcon.style.color = "tomato";
    cartQuantity.innerText = totalQuantity;
    cartQuantity.style.display = "inline";
  }
  // Adds an event listener to the cart icon that navigates to the cart page when clicked.
  const cartIcon = document.getElementById("cart-icon");
  cartIcon.addEventListener("click", () => {
    // Redirects the user to the cart page when the cart icon is clicked.
    window.location.href = "./cart.html";
  });
});
// Exports the functions to the global scope.
window.increaseQuantity = increaseQuantity;
window.decreaseQuantity = decreaseQuantity;
window.addToCart = addToCart;
