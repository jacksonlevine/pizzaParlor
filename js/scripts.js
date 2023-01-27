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

onload = myLoadFunction

function myLoadFunction() {
  let form = document.querySelector("form");
  form.onsubmit = receiveForm
}

function receiveForm(event) {
  event.preventDefault();
  let sizeChoice = getRadioInput("pizza_size");
  let toppingsChoices = getCheckboxInputs("toppings");
  if(sizeChoice !== false) {
    
  }
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