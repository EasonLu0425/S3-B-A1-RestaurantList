const bcrypt = require("bcryptjs");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const Restaurants = require("../restaurants");
const Users = require("../users");
const db = require("../../config/mongoose");
const restaurantList = require("../../restaurantlist.json");
const seedUsers = [
  {
    name: "user1",
    email: "user1@example.com",
    password: "12345678",
    restaurantId: [1, 2, 3],
  },
  {
    name: "user2",
    email: "user2@example.com",
    password: "12345678",
    restaurantId: [4, 5, 6],
  },
];

db.once("open", async () => {
  try {
    for (const seedUser of seedUsers) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(seedUser.password, salt);
      const user = await Users.create({
        name: seedUser.name,
        email: seedUser.email,
        password: hash,
      });
      const userId = user._id;

      for (
        let i = seedUser.restaurantId[0];
        i <= seedUser.restaurantId[2];
        i++
      ) {
        const {
          id,
          name,
          name_en,
          category,
          image,
          location,
          phone,
          google_map,
          rating,
          description,
        } = restaurantList.results[i - 1];

        await Restaurants.create({
          id,
          name,
          name_en,
          category,
          image,
          location,
          phone,
          google_map,
          rating,
          description,
          userId,
        });
      }
    }
    console.log("Seedusers done created!");
    console.log("Restaurants done created!");
  } catch (error) {
    console.error("Error creating seed users or restaurants:", error);
  }

  process.exit();
});
