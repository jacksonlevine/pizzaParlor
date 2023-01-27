Describe: Pizza()
Test: "It should return a pizza object with the size and toppings specified in the constructor."
Code: let pizz = new Pizza("large", ["pepperoni", "olives"]);
pizz
Expected output: Pizza { size: "large", toppings: ["pepperoni", "olives"]}

Test: "It should return a pizza object with the size, toppings, and discount code if one is specified."
Code: let pizz = new Pizza("large", ["olives", "pepperoni"], "TEST");
pizz
Expected output: Pizza { size: "large", toppings: ["olives", "pepperoni"], discount: "TEST"}

Describe Pizza.calculateCost()
Test: "It should return the calculated price of the pizza object based on the size, and number of toppings."
Code: let pizz = new Pizza("large", ["pepperoni", "olives"]);
pizz.calculateCost();
Expected output: "$17"

Test: "It should return the calculated price with a 15% decrease if the discount code is 'REC'."
Code: let pizz = new Pizza("large", ["pepperoni", "olives"], "REC");
pizz.calculateCost();
Expected output: "$14.45"

Describe: ShoppingCart()
Test: "It should return a ShoppingCart object with an initial currentId of 0 and an empty contents object inside."
Code: let shop = new ShoppingCart();
shop
Expected output: ShoppingCart { currentId = 0, contents = {} }

Describe: ShoppingCart.addToCart()
Test:"It should set the "<currentId>" property of ShoppingCart.contents to the Pizza that was passed as an argument and increment the ShoppingCart's currentId"
Code: let shop = new ShoppingCart();
let pizz = new Pizza("Test", ["Test", "Test"], "Test");
shop.addToCart(pizz);
shop.contents
Expected output: contents { 1: Pizza {size: "Test", toppings: ["Test", "Test"], discount: "Test"} }
