const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const Restaurants = require('./models/restaurants')
const restaurants = require('./restaurant.json')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', ()=>{
  console.log('mongoDB error!')
})

db.once('open', ()=>{
  console.log('mongoDB connected!')
})

app.engine('handlebars', exphbs({defaultLayout:'main'}))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  Restaurants.find()
             .lean()
             .then(restaurants => res.render('index', {restaurants}))
             .catch(error => console.error(error))
})

// app.get('/restaurants/:restaurant_id', (req, res) => {  
//   const restaurant = restaurants.results.find(
//     restaurant => restaurant.id.toString() === req.params.restaurant_id
//   )  
//   res.render('show', {restaurant: restaurant })
// })

app.get('/search', (req, res) => {
  if (!req.query.keywords) {
    return res.redirect('/')
  }

  const keywords = req.query.keywords.trim().toLowerCase()
  const filteredRestaurants = restaurants.results.filter(restaurant => 
    restaurant.name.toLowerCase().includes(keywords) || 
    restaurant.category.includes(keywords)
  )
  res.render('index', {restaurants : filteredRestaurants, keywords })
})

app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

app.post('/restaurants', (req, res) =>{
  const name = req.body.name
  
  return Restaurants.create({name})
    .then(()=> {res.redirect('/')})
    .catch(error => console.log(error))
})

app.listen(port, () =>{
  console.log(`Express is listening on localhost:${port}`)
})