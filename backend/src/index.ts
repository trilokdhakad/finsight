import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import categoryRoutes from "./routes/category.routes";
import transactionRoutes from "./routes/transaction.routes";
import { errorHandler } from "./middlewares/error.middleware";

dotenv.config();


const app=express();


app.use(express.json());


app.get("/health",(req,res)=>{

    res.json({
        message:"FinSight API running"
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

app.use(errorHandler);


app.listen(PORT,()=>{

    console.log(`Server started on ${PORT}`);

});