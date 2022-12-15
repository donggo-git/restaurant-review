const fs = require('fs')
const data = require('../data/restaurants.json')
const Restaurants = require('../models/restaurantModels')


exports.getAllRestaurants = async (req, res) => {
    try {
        //filter
        const restaurants = await Restaurants.find(req.query)
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
        const restaurants = await Restaurants.findByIdAndUpdate(req.params.id, req.body, {
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
