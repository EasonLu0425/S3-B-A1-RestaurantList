const mongoose = require('mongoose')
const Restaurants = require('../restaurants')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const restaurantsList = require ('../../restaurant.json')

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  restaurantsList.results.forEach(element => {
    Restaurants.create({
      name: element.name,
      name_en: element.name_en,
      category: element.category,
      image: element.image,
      location: element.location,
      phone: element.phone,
      google_map: element.google_map,
      rating: element.rating,
      description: element.description
    })
  });
  console.log('done!')
})

