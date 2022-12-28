const APIFeatures = require('../ultis/APIFeatures')
const Restaurants = require('../models/restaurantModels')
const updateRating = require('../helper/updateRating')
const catchAsync = require('../ultis/catchAsync')
const AppError = require('../ultis/AppError')

exports.getAllRestaurants = catchAsync(async (req, res, next) => {
    //filter, sort, pagination
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

})

exports.getRestaurant = catchAsync(async (req, res, next) => {
    const restaurants = await Restaurants.findById(req.params.id)

    if (!restaurants) return next(new AppError('no tour found with that id', 404))

    res.status(200).json({
        status: 'success',
        data: { restaurants }
    })

})
exports.addRestaurant = catchAsync(async (req, res, next) => {

    const newRestaurants = await Restaurants.create(req.body)

    res.status(201).json({
        status: 'success',
        data: { newRestaurants }
    })

})
exports.removeRestaurant = catchAsync(async (req, res, next) => {

    const restaurants = await Restaurants.findByIdAndDelete(req.params.id)

    if (!restaurants) return next(new AppError('no tour found with that id', 404))

    res.status(201).json({
        status: 'success',
        data: { restaurants }
    })

})
exports.updateRestaurant = catchAsync(async (req, res, next) => {

    const reqBody = { ...req.body }
    //if user want to update rating
    if (req.body.rating) {
        //look for restaurant needed to update
        const restaurant = await Restaurants.findById(req.params.id)

        if (!restaurants) return next(new AppError('no tour found with that id', 404))

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

})
