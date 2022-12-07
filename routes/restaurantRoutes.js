const express = require('express')
const restaurantsController = require('../controller/restaurantsController')
const router = express.Router()


//console.log(restaurantsController)
router
    .route('/')
    .get(restaurantsController.getAllRestaurants)
    .post(restaurantsController.addRestaurant)

/*router
    .route('/:id')
    .get(restaurantsController.getRestaurant)
    .delete(restaurantsController.removeRestaurant)*/

module.exports = router