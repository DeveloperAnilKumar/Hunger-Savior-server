const express = require("express");
const restaurantRouter = express.Router();
const restaurantController = require("../controller/restaurantController");

restaurantRouter.post("/restaurants", restaurantController.createRestaurant);
restaurantRouter.post("/menus", restaurantController.createRestaurantMenu);
restaurantRouter.put("/menus/:id", restaurantController.updateRestaurantMenu);
restaurantRouter.delete(
  "/menus/:id",
  restaurantController.deleteRestaurantMenu
);
restaurantRouter.get("/restaurants", restaurantController.getAllRestaurants);
restaurantRouter.get(
  "/restaurants/:id",
  restaurantController.getRestaurantById
);

module.exports = restaurantRouter;
