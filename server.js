import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'

//routes
import products from './routes/products.js'
import orders from './routes/orders.js'
import categories from './routes/categories.js'
import users from './routes/users.js'

// middlewares
import notFound from './middlewares/notFound.js'
import logger from './middlewares/logger.js'
import errorHandler from './middlewares/errorHandler.js'

//utils
import { connectDB } from './utils/connectDB.js'

const app = express()
const PORT = process.env.PORT || 3000
const api = process.env.API_URI

//middlewares
// app.use(express.static('public'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(logger)


// routes
app.use(`${api}/categories`, categories)
app.use(`${api}/products`, products)
app.use(`${api}/orders`, orders)
app.use(`${api}/users`, users)


// middilewares
app.use(notFound)
app.use(errorHandler)

//run server
const main = async () => {
   const connectionEstablished = await connectDB(process.env.MONGO_URI)

   if (!connectionEstablished) {
      console.log("Couldn't connected to db ..")
      return
   }

   console.log('connected to database ...')
   app.listen(PORT, async () => {
      console.log(`server is listening at http://localhost:${PORT}`)
   })
}


main()