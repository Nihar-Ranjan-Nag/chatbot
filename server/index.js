import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Groq from "groq-sdk/index.mjs";

dotenv.config();
const app=express();
const PORT=process.env.PORT || 8081
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.use(express.json())
app.use(cors());


app.post("/show",async(req,res)=>{
     const {inp}= req.body;
     if(!inp){
          res.status(400).json({"message":"Please Enter Something....."});
     }
     try {
           const completion = await groq.chat.completions
    .create({
      messages: [
        {
          role: "user",
          content: "hello",
        },
      ],
      model: "llama-3.3-70b-versatile",
    })
    .then((chatCompletion) => {
      console.log(chatCompletion.choices[0]?.message?.content || "");
    });
     } catch (error) {
          console.error(error);

     }
     
})

app.get("/",(req,res)=>{
     res.send("Hello");
})

app.listen(PORT,()=>{
     console.log(`Server is running on port ${PORT}`)
})