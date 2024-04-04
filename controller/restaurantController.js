const Restaurant = require("../model/Restaurant");
const RestaurantMenu = require("../model/RestaurantMenu");

exports.createRestaurant = async (req, res) => {
  try {
    const { restaurantName, rating, imageUrl, location, menuTypes } = req.body;
    const newRestaurant = new Restaurant({
      restaurantName,
      rating,
      imageUrl,
      location,
      menuTypes,
    });
    const savedRestaurant = await newRestaurant.save();
    res.status(201).json(savedRestaurant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createRestaurantMenu = async (req, res) => {
  try {
    const { menuItem, menuItemPrice, menuImageUrl, menuType } = req.body;

    const newMenu = new RestaurantMenu({
      menuItem,
      menuItemPrice,
      menuImageUrl,
      menuType,
    });

    const savedMenu = await newMenu.save();

    res.status(201).json(savedMenu);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateRestaurantMenu = async (req, res) => {
  try {
    const {menuItem, menuItemPrice, menuImageUrl, menuType, quantity } = req.body;
   

    const updatedMenu = await RestaurantMenu.findByIdAndUpdate(
      req.params.id,
      {
        menuItem,
        menuItemPrice,
        menuImageUrl,
        menuType,
        quantity
      },
      { new: true }
    );

    res.json(updatedMenu);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteRestaurantMenu = async (req, res) => {
  try {
    await RestaurantMenu.findByIdAndDelete(req.params.id);

    res.json({ message: "Menu deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({}).populate("restaurantMenu");
    res.status(200).json({
      restaurants,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getRestaurantById = async (req, res) => {
  try {
    // Extract the ID from the request parameters
    const restaurantId = req.params.id;

    // Find the restaurant by ID
    const restaurant = await Restaurant.findById(restaurantId).populate("restaurantMenu");

    // If the restaurant is not found, return a 404 Not Found response
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // If the restaurant is found, return it
    res.status(200).json(restaurant);
  } catch (error) {
    // If an error occurs, return a 400 Bad Request response
    res.status(400).json({ message: error.message });
  }
};