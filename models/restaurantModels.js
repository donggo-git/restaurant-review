const mongoose = require('mongoose')

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A restaurant must have a name"],
        trim: true
    },
    address: {
        type: String,
        required: [true, "A restaurant must have an address"],
        trim: true
    },
    phoneNumber: {
        type: String,
        required: [true, "A restaurant must have a phone number"],
        trim: true
    },
    imageCover: {
        type: String,
        required: [true, "A restaurant must have a image"],
        trim: true
    },
    website: {
        type: String,
        trim: true
    },
    openHours: {
        type: Map,
        of: String,
        default: {
            Sunday: "8AM – 8PM",
            Monday: "8AM – 8PM",
            Tuesday: "8AM – 8PM",
            Wednesday: "8AM – 8PM",
            Thursday: "8AM – 8PM",
            Friday: "8AM – 8PM",
            Saturday: "8AM – 8PM",
        }
    },
    rating: {
        type: Number,
        default: 4.5
    },
    ratingAverage: {
        type: Number,
        default: 4.5
    },
    ratingQuantity: {
        type: Number,
        default: 0
    },
    imgs: [String],
    //reviews: [comment]
})

/*const comment = new mongoose.Schema({
    review: {
        type: Map,
        of: String
    }
})
*/
const Restaurants = mongoose.model('restaurants', restaurantSchema)
module.exports = Restaurants