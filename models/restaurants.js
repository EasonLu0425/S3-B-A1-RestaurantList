const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantsSchema = new Schema({
  id:{
    type: Number,
  },
  name: {
    type : String,
  },
  name_en: {
    type : String,
  },
  category: {
    type : String
  },
  image : {
    type : String
  },
  location : {
    type : String
  },
  phone :{
    type : String
  },
  google_map :{
    type: String,
  },
  rating :{
    type: Number,
  },
  description: {
    type: String
  },
  userId :{
    type:Schema.Types.ObjectId,
    ref: 'RestaurantUser',
    index: true,
  }
})

module.exports = mongoose.model('Restaurants', restaurantsSchema)