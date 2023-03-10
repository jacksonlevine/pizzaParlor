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

ShoppingCart.prototype.deleteItem = function(id) {
  if (this.contents[id] === undefined) {
    return false;
  }
  delete this.contents[id];
  return true;
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
    small: 5,
    mega: 20
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
let headerPizza = new Pizza("medium", ['pepperoni', 'olives', 'red peppers'], "");

window.onload = function() {
  let form = document.querySelector("form");
  form.onsubmit = receiveForm

  let addToCartButton = document.getElementById("addToCart");
  addToCartButton.addEventListener("click", addCurrentPizzaToCart);

  let cartSpot = document.getElementById("cart");
  cartSpot.addEventListener("click", userClickOnCart);

  let header = document.querySelector(".secondContainer");
  header.prepend(getAsciiDiv(headerPizza, 1));
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
    let asciiDiv = getAsciiDiv(myCurrentPizza, 1.5)
    messageSpot.innerHTML = getPizzaInformationHTML(myCurrentPizza);
    messageSpot.prepend(asciiDiv);
    priceSpot.innerText = myCurrentPizza.calculateCost();
  } else {
    messageSpot.innerText = "You must select a size option."
    priceSpot.innerText = "";
  }
}

function userClickOnCart(event) {
  if(event.target.id === "delete") {
    let idToDelete = event.target.parentNode.id;
    myCart.deleteItem(idToDelete);
    updateCartDisplay();
  } else {
    return false;
  }
}

function addCurrentPizzaToCart() {
  if(myCurrentPizza !== null) {
    myCart.addToCart(myCurrentPizza);
  }
  updateCartDisplay();
}

asciiWidthsForPizzaSize = {
  mega: 16,
  large: 11,
  medium: 8,
  small: 6
}

function updateCartDisplay() {
  let cartSpot = document.getElementById("cart");
  let totalPriceSpot = document.getElementById("totalPrice");
  cartSpot.innerText = "";
  totalPriceSpot.innerText = myCart.calculateTotalCost();
  Object.keys(myCart.contents).forEach(function(key) {
    let thePizza = myCart.contents[key];
    let div = document.createElement("div");
    div.setAttribute("id", key);
    let p1 = document.createElement("p");
    let p2 = document.createElement("p");
    let delButton = document.createElement("button");
    delButton.setAttribute("id", "delete");
    delButton.innerText = "Delete pizza";
    p1.innerHTML = getPizzaInformationHTML(thePizza);
    p2.innerText = thePizza.calculateCost();
    let asciiDiv = getAsciiDiv(thePizza, 1);
    div.append(asciiDiv);
    div.append(p1);
    div.append(p2);
    div.append(delButton);
    cartSpot.append(div);
  })
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
    return [];
  }
}

function getAsciiDiv(pizza, scale) {
  let asciiDiv = document.createElement("div");
  asciiDiv.setAttribute("class", "ascii");
  asciiDiv.innerHTML = getAsciiArtOfPizza(pizza, Math.round(asciiWidthsForPizzaSize[pizza.size]*scale));
  return asciiDiv;
}

function getAsciiArtOfPizza(pizza, pizzaWidth) {
  let representations = {
    pepperoni: "<span class=\"red\">@</span>",
    olives: "<span class=\"black\">o</span>",
    "red peppers": "<span class=\"red\">V</span>",
    anchovies: "<span class=\"grey\">q</span>",
    onions: "<span class=\"grey\">O</span>",
    garlic: "Q"
  }

  let string = "";
  for(let j = pizzaWidth; j > 0; j--) {
    for(let i = 0; i < pizzaWidth; i++) {
      if(j === pizzaWidth || j === 1 || i === 0 || i === pizzaWidth-1) {
        string += "#";
      } else {
        if(pizza.toppings.length > 0) {
          if(Math.random()*2 > 1) {
            string += representations[pizza.toppings[Math.min(Math.max(Math.floor(Math.random()*pizza.toppings.length), 0), pizza.toppings.length-1)]];
          } else {
            string += "E";
          }
        } else {
          string += "E";
        }
      }
    }
    string += "\n";
  }
  return string;
}