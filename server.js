import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import Card from './dbcards.js'
// ilE02zgxqz7IahCM

//App Config
const app=express();
const port=process.env.PORT || 8001;
const connectionurl='mongodb+srv://sarvesh:ilE02zgxqz7IahCM@cluster0.dxwz7.mongodb.net/tinderdb?retryWrites=true&w=majority'

//Middleware
app.use(express.json());
app.use(cors());

//DB config
mongoose.connect(connectionurl,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
})

//api request
app.get('/',(req,res)=>res.status(200).send("hello"));
app.post('/tinder/card',(req,res)=>{
    const db=req.body;
    Card.create(db,(err,data)=>{
        if(err){
            res.status(404).send(err);
        }else{
            res.status(201).send(data);
        }
    })
});

app.get('/tinder/card',(req,res)=>{
    Card.find((err,data)=>{
        if(err){
            res.status(404).send(err);
        }else{
            res.status(200).send(data);
        }
    })
});

//api listen
app.listen(port,()=>console.log(`Listening on localhost${port}`));