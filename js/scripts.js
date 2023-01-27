// Business logic
function Pizza(size, toppings) {
  this.size = size;
  this.toppings = toppings;
}

Pizza.prototype.calculateCost = function() {
  let prices = {
    large: 15,
    medium: 10,
    small: 5
  }
  let cost = prices[this.size] + this.toppings.length;
  return "$" + cost;
}

// User interface logic

window.onload = function() {
  let form = document.querySelector("form");
  form.onsubmit = receiveForm
}

function receiveForm(event) {
  event.preventDefault();

  let sizeChoice = getRadioInput("pizza_size");
  let toppingsChoices = getCheckboxInputs("toppings");
  let messageSpot = document.getElementById("message");
  let priceSpot = document.getElementById("price");

  if(sizeChoice !== false) {
    let myUsersPizza = new Pizza(sizeChoice, toppingsChoices);
    messageSpot.innerHTML = getPizzaInformationContent(myUsersPizza);
    priceSpot.innerText = myUsersPizza.calculateCost();
  } else {
    messageSpot.innerText = "You must select a size option."
    priceSpot.innerText = "";
  }
}

function getPizzaInformationContent(pizza) {
  if(pizza.toppings === false) {
    let string = "You have created a " + capitalizeFirstLetter(pizza.size) + " pizza with no toppings."
    return string;
  } else {
    let string = "You have created a " + capitalizeFirstLetter(pizza.size) + " pizza with the following toppings: <ul>"
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