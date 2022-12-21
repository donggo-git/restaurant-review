const APIFeatures = require('../ultis/APIFeatures')
const Restaurants = require('../models/restaurantModels')
const updateRating = require('../helper/updateRating')


exports.getAllRestaurants = async (req, res) => {
    try {
        //filter, sort

        const features = new APIFeatures(Restaurants.find(), req.query)
            .filter()
            .sort()
            .pagination()
        //console.log(req.query)
        const restaurants = await features.query
        //const restaurants = await Restaurants.find().sort(req.query.sort)
        //execute
        res.status(200).json({
            status: 'success',
            data: { restaurants }
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}

exports.getRestaurant = async (req, res) => {
    try {
        const restaurants = await Restaurants.findById(req.params.id)

        res.status(200).json({
            status: 'success',
            data: { restaurants }
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}
exports.addRestaurant = async (req, res) => {
    try {
        const newRestaurants = await Restaurants.create(req.body)

        res.status(201).json({
            status: 'success',
            data: { newRestaurants }
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}
exports.removeRestaurant = async (req, res) => {
    try {
        const restaurants = await Restaurants.findByIdAndDelete(req.params.id)

        res.status(201).json({
            status: 'success',
            data: { restaurants }
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}
exports.updateRestaurant = async (req, res) => {
    try {

        const reqBody = { ...req.body }
        //if user want to update rating

        if (req.body.rating) {
            //look for restaurant needed to update
            const restaurant = await Restaurants.findById(req.params.id)
            //calculate the new rating and update rating in the reqBody
            reqBody.rating = updateRating(req.body.rating, restaurant.rating, restaurant.ratingQuantity)
            //add 1 for rating quantity
            reqBody.ratingQuantity = restaurant.ratingQuantity + 1
        }

        const restaurants = await Restaurants.findByIdAndUpdate(req.params.id, reqBody, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            status: 'success',
            data: { restaurants }
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}
