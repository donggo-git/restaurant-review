const mongoose = require('mongoose')
const dotenv = require('dotenv')
const fs = require('fs')
const Restaurants = require('../models/restaurantModels')

dotenv.config({ path: './config.env' })


const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)


mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(con => {
    console.log('DB connection is successful')
})

const data = JSON.parse(fs.readFileSync(`${__dirname}/restaurants.json`, 'utf-8'))

const importData = async () => {
    try {
        await Restaurants.create(data)
        console.log('data successfully import')

    }
    catch (err) {
        console.log(err)
    }
    process.exit()
}


const deleteData = async () => {
    try {
        await Restaurants.deleteMany()
        console.log('data successfully delete')
    }
    catch (err) {
        console.log(err)
    }
    process.exit()
}

if (process.argv[2] === '--import') {
    importData()
}
if (process.argv[2] === '--delete') {
    deleteData()
}