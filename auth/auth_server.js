const express=require('express');

const app=express();
//! act as middleware for post function , it is used when data is comming from the frontend to the server so it is used to convert the data in the form of json

//app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.listen(3000);

const authRouter=express.Router();
app.use('/auth',authRouter);

authRouter
.route('/signup')
.get(getSignup)
.post(postSignup);

function getSignup(req,res){
    res.sendFile('./view/auth.html',{root:__dirname});
}

function postSignup(req,res){
    let obj=req.body;
    console.log('backend',obj);

    res.json({
        message:"user signed up",
        data:obj
    })
}