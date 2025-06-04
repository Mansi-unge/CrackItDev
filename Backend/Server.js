import express from "express" ;
import cors from "cors" ; 
import dotenv from "dotenv" ;
import connectDB from "./config/db.js";
import questionRoutes from './routes/questionRoutes.js';

dotenv.config();

const app = express() ;

connectDB();

//middleware 
app.use(cors());
app.use(express.json());


app.use('/api/questions', questionRoutes);


//getting port from the env file 
const PORT = process.env.PORT || 8000 ;

app.get("/" , (req , res) => {
  console.log("server is running");
})

app.listen(PORT , () => {
  
  console.log(`server is running on localhost port number : ${PORT}`)
})