import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import cartRouter from "./routes/cart.routes.js";
import orderRouter from "./routes/order.routes.js";
import productRouter from "./routes/product.routes.js";
import reviewRouter from "./routes/reviews.routes.js";
import customerRouter from "./routes/customer.routes.js";
//import { getDbConnection } from "./db/db.js";
//import { getDbConnectionNeon } from './db/db_neon.js' //DB online
import { getDbConnectionSwitch } from "./db/dbSwitch.js";
import categoryRouter from "./routes/categories.routes.js";

const apiRouter = express.Router() //- -> para aplicar en la implementación de BD NEON.
dotenv.config();

const app = express();

const PORT = process.env.PORT;

apiRouter.use(express.json());
apiRouter.use(cors());




//Routers
apiRouter.use("/auth", authRouter);
apiRouter.use("/cart", cartRouter);
apiRouter.use("/order", orderRouter);
apiRouter.use("/products", productRouter);
apiRouter.use("/review", reviewRouter);
apiRouter.use("/customer", customerRouter);
apiRouter.use("/categories", categoryRouter);



//main Router
app.use('/api', apiRouter)  //-> para aplicar en la implementación de BD NEON.

app.get('/', (req,res)=>{
  return res.json({message: "Server Running"})
})

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);

  //Elegir base de datos (pruebas)
  //await getDbConnection(); //Connect to localDB
  //await getDbConnectionNeon();   //connect to CloudDB

  //Switch
  await getDbConnectionSwitch()
});

export default app;
