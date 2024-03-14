const express=require('express');

const app=express();

app.listen(3000);
//! in expres.js the file execution start from top to bottom so please check the structure of the code (if we use the 404 here at the top so whatever we run the right route it will shows the 404 page so)
app.get('/',function(req,res){
    res.send('Hello express server!');
})
//!sending file to the server by using the path
app.get('/about',(req,res)=>{
    res.sendFile('C:/Users/aman0/Nodews/views/about.html');
})
//! redirection
app.get('/about-us',(req,res)=>{
    res.redirect('/about');
})

//! 404 page
/*//we can also use this to send file bit here our file is in another directory so that it will give error
app.use((req,res)=>{
    res.sendFile('./views/404.html',{root:__dirname});
})*/

app.use((req,res)=>{
    res.status(404).sendFile('C:/Users/aman0/Nodews/views/404.html');
})