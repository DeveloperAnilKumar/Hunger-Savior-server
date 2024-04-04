const RestaurantMenu = require("../model/RestaurantMenu");
const Cart = require("../model/Cart");

// Add item to cart
exports.addToCart = async (req, res) => {
  const { id, quantity , userId } = req.body;

  try {
    const menuItem = await RestaurantMenu.findById(id);
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    // Check if the item is already in the cart
    let cartItem = await Cart.findOne({ restaurantMenu: menuItem._id });
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItem = new Cart({
        restaurantMenu: menuItem._id,
        quantity,
        user:userId
      });
    }

    await cartItem.save();

    await cartItem.populate("restaurantMenu");

    res.status(201).json(cartItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateCartItemQuantity = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    const cartItem = await Cart.findByIdAndUpdate(
      id,
      { quantity },
      { new: true }
    );

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.json(cartItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all items in the cart
exports.getAllCartItems = async (req, res) => {
  try {
    const cartItems = await Cart.find({}).populate("restaurantMenu");
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove item from cart
exports.removeCartItem = async (req, res) => {
  const { id } = req.params;
  try {
    const cartItem = await Cart.findByIdAndDelete(id);
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.clearCart = async (req, res) => {
  try {   
    // Assuming the authenticated user's ID is available in req.user.id
    const userId = req.params.id;
    
    // Clear cart items belonging to the authenticated user
    await Cart.deleteMany({user:userId });
    
    res.status(200).json({ message: "Cart items cleared successfully" });
  } catch (error) {
    console.error("Error clearing cart items:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};