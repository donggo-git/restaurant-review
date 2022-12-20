const express = require('express')
const restaurantRoutes = require('./routes/restaurantRoutes')
const app = express()

app.use(express.json())
app.use(express.static(`${__dirname}/public`))
//app.use(express.json())

/*app.listen(3000, () => {
    console.log('app running')
})*/
app.use('/api/v1/restaurants', restaurantRoutes)
app.all('*', function (req, res, next) {
    res.status(404).json({
        status: 'fail',
        message: `Can't find ${req.originalUrl} on this server!`
    })
})
module.exports = app