const express = require("express");
const router = express.Router();
const Restaurants = require("../../models/restaurants");

router.get("/", (req, res) => {
  const userId = req.user._id;

  Restaurants.find({ userId })
    .lean()
    .sort({ _id: "asc" })
    .then((restaurants) => {
      res.render("index", { restaurants });
    })
    .catch((error) => console.error(error));
});

router.get("/search", (req, res) => {
  const userId = req.user._id;
  console.log(req.query.keywords)
  if (!req.query.keywords) {
    return res.redirect("/");
  }
  const keywords = req.query.keywords.trim().toLowerCase();
  Restaurants.find({ userId })
    .lean()
    .sort({ _id: "asc" })
    .then((data) => {
      const restaurants = data.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(keywords) ||
          restaurant.category.toLowerCase().includes(keywords)
      );
      console.log(restaurants)
      return res.render("index", {
        restaurants,
        keywords,
      });
    });
});

router.get("/create", (req, res) => {
  res.render("new");
});

module.exports = router;
