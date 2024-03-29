const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    })
}

const sendErrorProd = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    }
    else {
        //1) log error
        console.log('ERROR! ', err)
        //2) send generic error 
        res.status(err.statusCode).json({
            status: "error",
            message: "Something went very wrong"
        })
    }
}
module.exports = function (err, req, res, next) {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'



    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res)
    }
    else if (process.env.NODE_ENV === 'production') {
        sendErrorProd(err, res)
    }


}