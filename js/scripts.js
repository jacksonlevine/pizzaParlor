// Business logic
function ShoppingCart() {
  this.currentId = 0;
  this.contents = {};
}

ShoppingCart.prototype.addToCart = function(pizza) {
  this.currentId++;
  this.contents[this.currentId] = pizza;
}

ShoppingCart.prototype.calculateTotalCost = function() {
  let cost = 0;
  let keys = Object.keys(this.contents);
  for(let i = 0; i < keys.length; i++) {
    let pizzaCost = parseFloat(this.contents[keys[i]].calculateCost().slice(1));
    cost += pizzaCost;
  }

  return "$" + cost;
}

function Pizza(size, toppings, discount) {
  this.size = size;
  this.toppings = toppings;
  this.discount = discount;
}

Pizza.prototype.calculateCost = function() {
  let prices = {
    large: 15,
    medium: 10,
    small: 5
  }
  let cost = prices[this.size] + this.toppings.length;
  if(this.discount.trim() !== "") {
    if(this.discount.trim() === "REC") {
      cost -= cost*0.15;
    } 
  }
  return "$" + cost;
}

// User interface logic

let myCart = new ShoppingCart();
let myCurrentPizza = null;

window.onload = function() {
  let form = document.querySelector("form");
  form.onsubmit = receiveForm
  let addToCartButton = document.getElementById("addToCart");
  addToCartButton.addEventListener("click", addCurrentPizzaToCart);
}

function addCurrentPizzaToCart() {
  if(myCurrentPizza !== null) {
    myCart.addToCart(myCurrentPizza);
  }
}

function updateCartDisplay() {
  let cartSpot = document.getElementById("cart");
  cartSpot.innerText = "";
  Object.keys(myCart.contents).forEach(function(key) {
    document.createElement("div");
  })
}

function receiveForm(event) {
  event.preventDefault();

  let sizeChoice = getRadioInput("pizza_size");
  let toppingsChoices = getCheckboxInputs("toppings");
  let discountChoice = document.getElementById("discount").value;
  let messageSpot = document.getElementById("message");
  let priceSpot = document.getElementById("price");

  if(sizeChoice !== false) {
    myCurrentPizza = new Pizza(sizeChoice, toppingsChoices, discountChoice);
    messageSpot.innerHTML = getPizzaInformationHTML(myCurrentPizza);
    priceSpot.innerText = myUsersPizza.calculateCost();
  } else {
    messageSpot.innerText = "You must select a size option."
    priceSpot.innerText = "";
  }
}

function getPizzaInformationHTML(pizza) {
  if(pizza.toppings === false) {
    let string = capitalizeFirstLetter(pizza.size) + " pizza with no toppings."
    return string;
  } else {
    let string = capitalizeFirstLetter(pizza.size) + " pizza with: <ul>"
    pizza.toppings.forEach(function(topping) {
      string += "<li>" + capitalizeFirstLetter(topping)+ "</li>"
    })
    string += "</ul>"
    return string;
  }
  
}

function capitalizeFirstLetter(word) {
  let arr = Array.from(word);
  let firstLetter = arr.shift();
  firstLetter = firstLetter.toUpperCase();
  arr.unshift(firstLetter);
  return arr.join("");
}

function getRadioInput(radioGroupName) {
  let radios = document.getElementsByName(radioGroupName);
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      return radios[i].value;
    }
  }
  return false;
}

function getCheckboxInputs(checkGroupName) {
  let checkBoxes = document.getElementsByName(checkGroupName);
  let arrayOfChoices = [];
  for(let i = 0; i < checkBoxes.length; i++) {
    if(checkBoxes[i].checked) {
      arrayOfChoices.push(checkBoxes[i].value);
    }
  }
  if(arrayOfChoices.length > 0) {
    return arrayOfChoices;
  } else {
    return false;
  }
}