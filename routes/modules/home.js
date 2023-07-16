const express = require("express");
const router = express.Router();
const Handlebars = require("handlebars");
const Restaurants = require("../../models/restaurants");

Handlebars.registerHelper(
  "isOwner",
  function (restaurantUserId, currentUserId, options) {
    if (restaurantUserId.toString() === currentUserId.toString()) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  }
);

router.get("/", (req, res) => {
  const currentUserId = req.user._id;
  console.log(currentUserId);
  Restaurants.find()
    .lean()
    .sort({ _id: "asc" })
    .then((restaurants) => {
      res.render("index", { restaurants, currentUserId });
    })
    .catch((error) => console.error(error));
});

router.get("/search", (req, res) => {
  const currentUserId = req.user._id;
  console.log(req.query.keywords);
  if (!req.query.keywords) {
    return res.redirect("/");
  }
  const keywords = req.query.keywords.trim().toLowerCase();
  Restaurants.find()
    .lean()
    .sort({ _id: "asc" })
    .then((data) => {
      const restaurants = data.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(keywords) ||
          restaurant.category.toLowerCase().includes(keywords)
      );
      return res.render("index", {
        restaurants,
        keywords,
        currentUserId
      });
    });
});

router.get("/create", (req, res) => {
  res.render("new");
});

module.exports = router;
