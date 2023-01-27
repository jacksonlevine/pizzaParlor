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