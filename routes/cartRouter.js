const express = require('express');
const cartRouter = express.Router();
const cartController = require('../controller/cartController');

// Route for getting all cart items
cartRouter.get('/cart/items', cartController.getAllCartItems);

// Route for adding an item to the cart
cartRouter.post('/cart/add', cartController.addToCart);

// Route for updating quantity of an item in the cart
cartRouter.patch('/cart/update/:id', cartController.updateCartItemQuantity);

// Route for removing an item from the cart
cartRouter.delete('/cart/remove/:id', cartController.removeCartItem);

cartRouter.delete('/remove/all/:id', cartController.clearCart);


module.exports = cartRouter;
