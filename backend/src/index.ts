import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import categoryRoutes from "./routes/category.routes";
import transactionRoutes from "./routes/transaction.routes";
import analyticsRoutes from "./routes/analytics.routes";
import { errorHandler } from "./middlewares/error.middleware";

dotenv.config();


const app = express();

app.use(
  cors({
    origin:
      process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());


app.get("/health",(req,res)=>{

    res.status(200).json({
        success: true,
        message: "FinSight API running",
    });

});


const PORT=process.env.PORT || 5000;


app.use("/api/auth", authRoutes);

app.use(
    "/api/categories",
    categoryRoutes
);

app.use(
    "/api/transactions",
    transactionRoutes
);

app.use(
    "/api/analytics",
    analyticsRoutes
);

app.use(errorHandler);


app.listen(PORT,()=>{

    console.log(`Server started on ${PORT}`);

});