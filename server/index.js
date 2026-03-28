import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.routes.js'
import cartRouter from './routes/cart.routes.js'
import orderRouter from './routes/order.routes.js'
import productRouter from './routes/product.routes.js'
import reviewRouter from './routes/reviews.routes.js'
import customerRouter from './routes/customer.routes.js'
import { getDbConnection } from './db/db.js'
//import { getDbConnectionNeon } from './db/db_neon.js'


dotenv.config()

const app = express()

const PORT = process.env.PORT

app.use(express.json())
app.use(cors())

//Routers
app.use('/auth', authRouter)
app.use('/cart', cartRouter)
app.use('/order', orderRouter)
app.use('/products', productRouter)
app.use('/review', reviewRouter)
app.use('/customer', customerRouter)

app.listen(PORT, async ()=>{
    console.log(`Server running on http://localhost:${PORT}`)
    await getDbConnection()         //Connect to localDB
    //await getDbConnectionNeon()   //connect to CloudDB
})


export default app


//ultima version