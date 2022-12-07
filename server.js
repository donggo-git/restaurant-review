const app = require('./app')
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
const port = 3000
const mongoose = require('mongoose')
const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD)


mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(con => {
    //console.log(con.connections)
    console.log('DB connection is successful')
})

console.log(process.env)
app.listen(port, () => {
    console.log(`App running in port: ${port}`)
})