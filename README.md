Describe: Pizza()
Test: "It should return a pizza object with the size and toppings specified in the constructor."
Code: let pizz = new Pizza("large", ["pepperoni", "olives"]);
pizz
Expected output: Pizza { size: "large", toppings: ["pepperoni", "olives"]}

Describe Pizza.calculateCost()
Test: "It should return the calculated price of the pizza object based on the size, and number of toppings."
Code: let pizz = new Pizza("large", ["pepperoni", "olives"]);
pizz.calculateCost();
Expected output: "$17"