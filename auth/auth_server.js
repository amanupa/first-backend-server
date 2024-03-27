// the mogodb configuration and creating/storing the user in database (mongodb)
//! perform the CRUD operation on mongob database 
const express=require('express');

//* requiring the mongoose database
const mongoose=require('mongoose');

const app=express();
//! act as middleware for post function , it is used when data is comming from the frontend to the server so it is used to convert the data in the form of json

//app.use(express.urlencoded({extended: true}));
app.use(express.json());//* it is used to convert the json data into the form of javascript objects, it is global middleware function
app.listen(3000);
/*let users=[
    {'id':1,'name':"aman"},
    {'id':2,'name':"anand"},
    {'id':3,'name':'anupam'},
];*/

//mini app
const userRouter=express.Router();
const authRouter=express.Router();
//base route , router to use
app.use('/users',userRouter);
app.use('/auth',authRouter);

userRouter
.route("/")
.get(getUsers);

// TODO: the get/post/patch and delete are the path specific middleware functions 


authRouter
.route('/signup')
.get(middleware,getSignup)//* here using the concept of middleware and the next();
.post(postSignup)
.patch(updateUser)
.delete(deleteUser);

//TODO: whenever we are writting the next it carry forward the req and res to the next middleware function 

function middleware(req,res,next){//the middleware function 
    console.log("middleware encountered");
    next();
}
/*userRouter
.route('/:id')
.get(getUserById);*/
// query

/*app.get('/users',(req,res)=>{
    console.log(req.query);
    res.send(users);
})*/



 function getSignup(req,res){

    console.log("after middleware this function encoutered");
    res.sendFile('./view/auth.html',{root:__dirname});
}
//* to create new user/(store the data in the database of the new user ) 
async function postSignup(req,res){
    let dataObj=req.body;
    let user=await userModel.create(dataObj);
    console.log('backend',user);

    res.json({
        message:"user signed up",
        data:user
    })
}


const db_link="your database link";


// to connect to the mongodb server
mongoose.connect(db_link)
.then(function(db){
    console.log(db);
    console.log("db connected");
})
.catch(function(err){
    console.log(err);
});


//* creating a userschemma/scheema  for the mongodb to store the data in the database
const userSceema= mongoose.Schema({
    name:{//* the object in the data scheema
        type:String,// type here is string
        required:true,// the bool variable to make any object required withaout it we cant store the data
        unique:true,// uniqueness like no one can user the same name of variable 
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
        minLength:8,// the password should be of minimum length 8
    }
});

//* to use that scheema we have to create the model 
const userModel=mongoose.model('userModel',userSceema);// by using the .model property of the mongeese we can create the model this property takes two parameter. 
// the first is the name of the model and second is the is to tell that by which we are creating this model or what is the base of the model that is the scheema.
// in simple language we can say that by which design we have to create the car/model

//! by this we are creating the user manually to check the functionality of the mongodb after that we will do these things from the frontend of web/app
/*(async function createUser(){
    let user={
        name:"Upadhyay",
        email:"upadhyay12@gmail.com",
        password:"123456987",
        confirmPassword:"123456987",
    } // by using the create property we are creating the user on the database(mongodb) and create property will take the object which it will store in the database here the userdata(user)
    let data= await userModel.create(user);
    console.log(data);
})();*///* by wrapping the whole function in ()(); these bracket it means we are making the function emiziate invoked function instead of calling this function 

//TODO: after successfully creatin/storing the data in the mongodb the mongo will automatically assign the unique id to the object and when we will console the data we can see that this unique id.

//* function to get the user from the mongodb database
async function getUsers(req,res){{
    let allUsers=await userModel.find();//* to find the allusers available in the database
   // let usrByName=await userModel.find({name: "Upadhyay"}).exec();//* find the specific user by its name or you can use any specific condition
    // if we want to get only one user whose name or age or by anything for that we can use the findOne() property
    res.json({
        message:"list of all users",
        data:allUsers//usrByName
    });
}}

//* function to update the data in the mogodb database
async function updateUser(req,res){
    console.log('req.body->',req.body);
    let dataToBeUpdated=req.body;
    let user= await userModel.findOneAndUpdate({email:"aman080@gmail.com"},dataToBeUpdated);
   /* //! it is used to update the data 
    for(key in dataToBeUpdated){
        users[key]=dataToBeUpdated[key];
    }*/
    res.json({
        message:"data updated successfully",
        data:user
    })
}

//* to delete the data from the mongodb database

async function deleteUser(req,res){
    let user= await userModel.findOneAndDelete({email:"asdf@gmail.com"})
    res.json({
        message:"data deleted successfully",
        data:user
    })
}