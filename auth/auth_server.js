const express=require('express');

//* requiring the mongoose database
const mongoose=require('mongoose');

const app=express();
//! act as middleware for post function , it is used when data is comming from the frontend to the server so it is used to convert the data in the form of json

//app.use(express.urlencoded({extended: true}));
app.use(express.json());//* it is used to convert the json data into the form of javascript objects, it is global middleware function
app.listen(3000);

const authRouter=express.Router();
app.use('/auth',authRouter);

// TODO: the get/post/patch and delete are the path specific middleware functions 


authRouter
.route('/signup')
.get(middleware,getSignup)//* here using the concept of middleware and the next();
.post(postSignup);

//TODO: whenever we are writting the next it carry forward the req and res to the next middleware function 

function middleware(req,res,next){//the middleware function 
    console.log("middleware encountered");
    next();
}

function getSignup(req,res){
    console.log("after middleware this function encoutered");
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
const db_link="your_database_link";

mongoose.connect(db_link)
.then(function(db){
    console.log(db);
    console.log("db connected");
})
.catch(function(err){
    console.log(err);
});

const userSceema= mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        min:8,
    },
    confirmPassword:{
        type:String,
        required:true,
        min:8,
    }
});

const userModel=mongoose.model('userModel',userSceema);

(async function createUser(){
    let user={
        name:"Upadhyay",
        email:"upadhyay12@gmail.com",
        password:"123456987",
        confirmPassword:"123456987",
    }
    let data= await userModel.create(user);
    console.log(data);
})();