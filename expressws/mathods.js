const express=require('express');

const app=express();
//! act as middleware for post function , it is used when data is comming from the frontend to the server so it is used to convert the data in the form of json
app.use(express.json());
app.listen(3000);

let users=[
    {'id':1,'name':"aman"},
    {'id':2,'name':"anand"},
    {'id':3,'name':'anupam'},
];

//mini app
const userRouter=express.Router();
//base route , router to use
app.use('/users',userRouter);

userRouter
.route('/users')
.get(getUsers)
.post(postUsers)
.patch(updateUser)
.delete(deleteUser);

userRouter
.route('/:id')
.get(getUserById);
// query

app.get('/users',(req,res)=>{
    console.log(req.query);
    res.send(users);
})

//! get request 
//app.get('/users',)

//! post request
//app.post('/users',)

//! put/patch request (update request)

//app.patch('/users',)

//! to delete the data

//app.delete('/users',)

//params

app.get('/users/:username',(req,res)=>{
    console.log(req.params.username);

    res.send("user id recived");
})

function getUsers(req,res){{
    res.send(users);
}}

function postUsers(req,res){
    console.log(req.body);
    users=req.body;
    res.json({
        message:"data recived successfully",
        user:req.body
    })
}
function updateUser(req,res){
    console.log('req.body->',req.body);
    let dataToBeUpdated=req.body;
    //! it is used to update the data 
    for(key in dataToBeUpdated){
        users[key]=dataToBeUpdated[key];
    }
    res.json({
        message:"data updated successfully",
    })
}
function deleteUser(req,res){
    users={};
    res.json({
        message:"data deleted successfully",
    })
}
function getUserById(req,res){
    console.log(req.params.id);
    let paramId=req.params.id;
    let obj={};
    for(let i=0;i<users.length;i++){
        if(users[i]['id']==paramId){
            obj=users[i];
        }
    }
    res.json({
        message:"req recived",
        data:obj
    });

}