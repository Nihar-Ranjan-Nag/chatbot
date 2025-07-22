import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app=express();
const PORT=process.env.PORT || 8081

app.use(express.json())
app.use(cors());


app.post("/show",(req,res)=>{
     const {inp}= req.body;
     if(!inp){
          res.status(400).json({"message":"Please Enter Something....."});
     }
     try {
          
     } catch (error) {
          
     }
     res.status(200).json({"message":`${inp}`});
})

app.get("/",(req,res)=>{
     res.send("Hello");
})

app.listen(PORT,()=>{
     console.log(`Server is running on port ${PORT}`)
})