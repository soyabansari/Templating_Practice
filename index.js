const express = require('express');
const app = express();
const path = require('path');
const redditData = require('./data.json');

app.use(express.static(path.join(__dirname,'public')));

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));

app.get('/',(req,res)=>{
 res.render('home');
})

app.get('/random',(req,res)=>{
 const num = Math.floor(Math.random()*10)+1;
 let flag ;
 if(num%2==0){
  flag = "even";
 }
 else{
  flag = "odd";
 }
 res.render('random',{rand:num,flag});
})

app.get('/r/:subreddit',(req,res)=>{
 const {subreddit} = req.params;
 const data = redditData[subreddit];
 if(data){
   res.render('subreddit',{...data});
 }
 else{
  res.render('notfound',{subreddit});
 }
})

app.get('/cats', (req, res) => {
    const cats = [
        'Blue', 'Rocket', 'Monty', 'Stephanie', 'Winston'
    ]
    res.render('cats', { cats })
})

app.listen(3000,()=>{
 console.log("Listening to the PORT 3000");
})