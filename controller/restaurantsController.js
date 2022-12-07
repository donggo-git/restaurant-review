const fs = require('fs')
const data = require('../data/restaurants.json')

console.log(__dirname)

const restaurants = JSON.parse(fs.readFileSync('./data/restaurants.json', 'utf-8'))

exports.getAllRestaurants = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            restaurants
        }
    })
}
exports.getRestaurant = (req, res) => { }
exports.addRestaurant = (req, res) => { }
exports.removeRestaurant = (req, res) => { }
exports.updateRestaurant = (req, res) => { }
