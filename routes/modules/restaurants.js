const express = require('express')
const router = express.Router()

const Restaurants = require('../../models/restaurants')

//review
router.get('/:restaurant_id', (req, res) => {  
  const id = req.params.restaurant_id
  return Restaurants.findById(id)
                    .lean()
                    .then(restaurant => res.render('show', {restaurant}))
                    .catch(error => console.log(error))
})


// create


router.post('/', (req, res) =>{
  const {name, name_en, category, location, phone, image, description } = req.body
  
  return Restaurants.create({name, name_en,category, location, phone, image, description } )
    .then(()=> {res.redirect('/')})
    .catch(error => console.log(error))
})
// edit
router.get('/:id/edit', (req, res) => {
    const id = req.params.id
    return Restaurants.findById(id)
                      .lean()
                      .then(restaurant => res.render('edit', {restaurant}))
                      .catch(error => console.log(error))
})

router.put('/:id', (req,res) => {
  const {name, name_en, category, location, phone, image, description } = req.body
 
  console.log(image)
  return Restaurants.findById(id)
                    .then(restaurant => {
                      restaurant.name = name
                      restaurant.name_en = name_en
                      restaurant.category = category
                      restaurant.location = location
                      restaurant.phone = phone
                      restaurant.description = description
                      return restaurant.save()
                    })
                    .then(() => res.redirect(`/restaurants/${id}`))
                    .catch(error => console.log(error))
})
// delete
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurants.findById(id)
    .then(restaurant => restaurant.deleteOne())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router