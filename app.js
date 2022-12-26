const express = require('express')
const restaurantRoutes = require('./routes/restaurantRoutes')
const app = express()
const AppError = require('./ultis/AppError')
const globalErrorHandler = require('./controller/errorController')
app.use(express.json())
app.use(express.static(`${__dirname}/public`))
//app.use(express.json())

/*app.listen(3000, () => {
    console.log('app running')
})*/
app.use('/api/v1/restaurants', restaurantRoutes)

//handle unhandled routes
app.all('*', function (req, res, next) {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(globalErrorHandler)

module.exports = app