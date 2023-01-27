# Peppe's Pizza Parlor
## A coding exercise to demonstrate object constructors and prototypical inheritance.

# Technologies Used:
* Javascript
* HTML
* CSS

# Setup / Installation:
1. Clone this repository.
2. Navigate to the top folder.
3. Open index.html with any web browser.

# Known Bugs:
* None

# Contact Me:
* jack@netbug.us for any bug reports or questions!

## License:
Copyright © 2023 Jackson Levine

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Tests:

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
Test:"It should set the (currentId) property of ShoppingCart.contents to the Pizza that was passed as an argument and increment the ShoppingCart's currentId"
Code: let shop = new ShoppingCart();
let pizz = new Pizza("Test", ["Test", "Test"], "Test");
shop.addToCart(pizz);
shop.contents
Expected output: contents { 1: Pizza {size: "Test", toppings: ["Test", "Test"], discount: "Test"} }

Describe: ShoppingCart.calculateTotalCost()
Test: "It should return the sum of all Pizzas' costs in the shopping cart contents"
Code: let shop = new ShoppingCart();
let pizz = new Pizza("large", ["pepperoni", "olives"], "");
let pizz2 = new Pizza("large", ["pepperoni", "olives"], "");
shop.addToCart(pizz);
shop.addToCart(pizz2);
shop.calculateTotalCost();
Expected output: "$34"

Describe: ShoppingCart.deleteItem()
Test: "It should delete the item with the specified id from (ShoppingCart).contents"
Code: let shop = new ShoppingCart();
let pizz = new Pizza("large", ["pepperoni", "olives"], "");
let pizz2 = new Pizza("large", ["pepperoni", "cheese"], "");
shop.addToCart(pizz);
shop.addToCart(pizz2);
shop.deleteItem(1);
shop.contents
Expected output: {2: {size: "large", toppings: ["pepperoni", "cheese"], discount: ""} }