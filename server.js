import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'

//routes
import posts from './routes/posts.js'
import products from './routes/products.js'

// middlewares
import notFound from './middlewares/notFound.js'
import logger from './middlewares/logger.js'
import errorHandler from './middlewares/errorHandler.js'

//utils
import { connectDB } from './utils/connectDB.js'

// models
import { userModel } from './models/usersModel.js'


const app = express()
const PORT = process.env.PORT || 3000
// const api = process.env.API_URI
const courseApi = process.env.COURSE_API

//middlewares
// app.use(express.static('public'))
app.use(cors())
app.use(cookieParser())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(logger)


// routers
// app.use(`${api}/posts`, posts)
app.use(`${courseApi}/products`, products)


// middilewares
app.use(notFound)
app.use(errorHandler)

//run server
const runServer = async () => {

   console.log(process.env.MONGO_URI)
   try {
      await connectDB(process.env.MONGO_URI)
      console.log('connected to database ...')
      app.listen(PORT, async () => {
         console.log(`server is listening at http://localhost:${PORT}`)
      })
   } catch (error) {
      console.log("Couldn't connected to db ..")
   }
}


runServer()