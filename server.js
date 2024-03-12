const http=require('http');
const fs=require('fs');

const server=http.createServer((req,res)=>{
    console.log("request has been made from browser to server");
    //to print the request
   // console.log(req);
    //to print the url
    //console.log(req.url);
    //to print the mathod
    //console.log(req.mathod);
    //! to sent the response
    //setting header the (content type and its type)
    res.setHeader('Content-Type','text/html');//text/plain(initialy)
    //write function to send the response anythibgs we can send as response like a website a json file anything
    //res.write('<h1>Hello, This is the first server that i created :)</h1>');
   // res.write('<h2>Looking good ?</h2>');
   
    // to end the response
    //res.end();

    //!implementing the switch case so that we can route on the desired pages on the request of url
    let path='./views';
    switch(req.url){
        case '/':
            path+='/page.html'
            res.statusCode=200;
            break;
        case '/about':
            path+='/about.html'
            res.statusCode=200;
            break;
            /*!here we are using the redirect concept so that if any url change permanently or temproraly
             and someone hit the old or changed url so instead of showing error or page not found we can redirect them on the right location*/
        case '/about-me': 
            res.statusCode=301;
            res.setHeader('Location','/about');//by using setheader 1. we are setting the location keyword and in 2. we are setting the right location (the right/redirected url);
            res.end();
            break;    
        default:
            path+='/404.html' 
            res.statusCode=404; 
            break;      
    };


    fs.readFile(path,(err,fileData)=>{
        if(err){
            console.log(err);
        }else{
            //res.write(fileData);or in the case of single write we can use like the below
             res.end(fileData);
        }
    })
});

server.listen(3000,"localhost",()=>{
    console.log('server is listening on port 3000');
});