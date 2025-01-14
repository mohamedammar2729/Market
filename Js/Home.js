// Retrieve the user's name from localStorage
let userName = localStorage.getItem("name");

// If the user is logged in, display a welcome message
if (userName) {
  document.getElementById("r2").innerText = `Welcome ${userName}`;
  document.getElementById("r2").style.color = "tomato";
} else {
  // If the user is not logged in, display a login prompt
  document.getElementById("r2").innerText = "Login";
}

// Wait for the DOM to fully load before executing the script
document.addEventListener("DOMContentLoaded", () => {
  // Get references to various elements on the page
  const slides = document.querySelector(".slides");
  const slide = document.querySelectorAll(".slide");
  const prev = document.querySelector(".prev");
  const next = document.querySelector(".next");
  const dots = document.querySelectorAll(".dot");
  const cartIcon = document.getElementById("cart-icon");
  const cartQuantity = document.getElementById("cart-quantity");
 

   let currentIndex = 0;

  // Function to update the slider position and active dot
  function updateSlider(index) {
    // Move the slides container to show the slide at the given index
    slides.style.transform = `translateX(-${index * 100}%)`;
    //iterates over all elements in the dots array
    // Remove the 'active' class from all dots, ensures that no dot is marked as active before setting
    dots.forEach((dot) => dot.classList.remove("active"));
    // Add the 'active' class to the dot corresponding to the current slide
    dots[index].classList.add("active");
  }

  // Event listener for the previous button
  prev.addEventListener("click", () => {
    // Decrement the currentIndex to show the previous slide
    //If currentIndex is greater than 0, it decrements currentIndex by 1 (currentIndex - 1)
    //If currentIndex is 0, it sets currentIndex to the last slide index (slide.length - 1).
    currentIndex = currentIndex > 0 ? currentIndex - 1 : slide.length - 1;
    // Update the slider to show the slide at the new currentIndex
    updateSlider(currentIndex);
  });

  // Event listener for the next button
  next.addEventListener("click", () => {
    // Increment the currentIndex to show the next slide
    //If currentIndex is less than the index of the last slide, it increments currentIndex by 1
    //If currentIndex is the index of the last slide, it sets currentIndex to 0.
    currentIndex = currentIndex < slide.length - 1 ? currentIndex + 1 : 0;
    // Update the slider to show the slide at the new currentIndex
    updateSlider(currentIndex);
  });

  // Event listeners for the dots
  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      // Get the index of the clicked dot from its data-index attribute
      //The e.target property refers to the element that triggered the event (the clicked dot).
      //The dataset.index property accesses the data-index attribute of the clicked dot.
      //The parseInt function converts the data-index value from a string to an integer.
      currentIndex = parseInt(e.target.dataset.index);
      // Update the slider to show the slide at the new currentIndex
      updateSlider(currentIndex);
    });
  });

  // Initialize the first dot as active
  updateSlider(currentIndex);

  // Get references to the product cards
  const products = document.getElementsByClassName("card");

  // Add click event listeners to the product cards
  for (let product of products) {
    product.addEventListener("click", () => {
      const productDetails = {
        image: product.children[0].src,
        name: product.children[1].innerText,
        category: "",
        price: product.children[2].innerText,
        quantity: "",
      };

      // Save the product details to localStorage and navigate to the product page
      localStorage.setItem("productDetails", JSON.stringify(productDetails));
      window.location.href = "../HTML/product.html";
    });
  }

  // Load cart data from localStorage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (totalQuantity > 0) {
    cartIcon.style.color = "tomato";
    cartQuantity.innerText = totalQuantity;
    cartQuantity.style.display = "inline";
  }

  // Navigate to cart.html when the cart icon is clicked
  cartIcon.addEventListener("click", () => {
    window.location.href = "./cart.html";
  });
});

// Function to filter and display all products
const filterProductsALL = () => {
  let products = document.getElementsByClassName("card");
  let allImg = [
    "../img/clothes0.jpg",
    "../img/book0.jpg",
    "../img/electronic0.jpg",
    "../img/book1.jpg",
    "../img/electronic1.jpg",
  ];
  let allName = ["Jacket", "Book", "Phone", "Magazine", "Camera"];
  let allPrice = ["80$", "50$", "500$", "15$", "800$"];
  for (let i = 0; i < products.length; i++) {
    for (let j = 0; j < 5; j++) {
      products[j].children[i].setAttribute("src", `${allImg[j]}`);
      if (i === 1) products[j].children[i].innerText = `${allName[j]}`;
      if (i === 2) products[j].children[i].innerText = `Price: ${allPrice[j]}`;
    }
  }
};

// Function to filter and display clothes products
const filterProductsClothes = () => {
  let products = document.getElementsByClassName("card");
  let clName = ["Jacket", "Shirt", "T-Shirt", "Suit", "T-Shirt"];
  let clPrice = ["80$", "50$", "30$", "85$", "20$"];
  for (let i = 0; i < products.length; i++) {
    for (let j = 0; j < 5; j++) {
      products[j].children[i].setAttribute(
        "src",
        "../img/clothes" + j + ".jpg"
      );
      if (i == 1) products[j].children[i].innerText = `${clName[j]}`;
      if (i == 2) products[j].children[i].innerText = `Price: ${clPrice[j]}`;
    }
  }
};

// Function to filter and display books products
const filterProductsBooks = () => {
  let products = document.getElementsByClassName("card");
  let bkName = ["Book", "Magazine", "Poetry", "Book", "Book"];
  let bkPrice = ["50$", "15$", "30$", "80$", "90$"];
  for (let i = 0; i < products.length; i++) {
    for (let j = 0; j < 5; j++) {
      products[j].children[i].setAttribute("src", "../img/book" + j + ".jpg");
      if (i === 1) products[j].children[i].innerText = `${bkName[j]}`;
      if (i === 2) products[j].children[i].innerText = `Price: ${bkPrice[j]}`;
    }
  }
};

// Function to filter and display electronics products
const filterProductsElectronics = () => {
  let products = document.getElementsByClassName("card");
  let elName = ["Phone", "Camera", "Ipad", "Laptop", "Keyboard"];
  let elPrice = ["500$", "800$", "600$", "1000$", "200$"];
  for (let i = 0; i < products.length; i++) {
    for (let j = 0; j < 5; j++) {
      products[j].children[i].setAttribute(
        "src",
        "../img/electronic" + j + ".jpg"
      );
      if (i === 1) products[j].children[i].innerText = `${elName[j]}`;
      if (i === 2) products[j].children[i].innerText = `Price: ${elPrice[j]}`;
    }
  }
};

// Attach functions to the window object
window.filterProductsALL = filterProductsALL;
window.filterProductsClothes = filterProductsClothes;
window.filterProductsBooks = filterProductsBooks;
window.filterProductsElectronics = filterProductsElectronics;
