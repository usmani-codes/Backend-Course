import express from 'express'
import cors from 'cors'
import path from 'path'

//routes
import products from './routes/products.js'
import orders from './routes/orders.js'
import categories from './routes/categories.js'
import users from './routes/users.js'
import auth from './routes/auth.js'

// middlewares
import { AdminsOnly, AUTH, logger, notFound, } from './middlewares/index.js'
import errorHandler from './middlewares/index.js'


//utils
import { connectDB } from './utils/connectDB.js'


const app = express()
const PORT = process.env.PORT || 5000
const api = process.env.API_URI // api/v1

import { fileURLToPath } from 'url';

// Construct __dirname for ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//middlewares
// app.use(express.static('public'))
console.log("__dirname",__dirname)
app.use('/uploads', express.static(path.join(__dirname, '/public/uploads')));

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(logger)


// routes 
app.use(`${api}/categories`, categories)
app.use(`${api}/products`, products)
app.use(`${api}/auth`, auth)
app.use(`${api}/users`, AUTH, AdminsOnly, users)
app.use(`${api}/orders`, AUTH, orders)



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