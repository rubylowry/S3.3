const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); //to parse all data coming from the user and db
const cors = require('cors'); //to include cross orgin request
const bcryptjs = require('bcryptjs');//to hash and compare password in an encrypted method
const config = require('./config.json');//has credentials
const User = require('./models/user.js');
const Post = require('./models/post.js');
const Comment = require('./models/comment.js');
const port = 3000; 

const mongodbURI = `mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_CLUSTER_NAME}-hlrm7.mongodb.net/zip?retryWrites=true&w=majority`; //set what mongoDb to look at (set which collection with word after mongodeb.net/)
mongoose.connect(mongodbURI, {useNewUrlParser: true, useUnifiedTopology: true}) // connect to above
.then(()=> console.log('DB connected!')) //success message
.catch(err =>{ //error catch
  console.log(`DBConnectionError: ${err.message}`); //error message
});
//test the connection
const db = mongoose.connection; // checks for connection
db.on('error', console.error.bind(console, 'connection error:')); //error message
db.once('open', function() { // on open do this once
  console.log('We are connected to mongo db'); // success message
});
// connect endpoints
app.use((req,res,next)=>{
  console.log(`${req.method} request for ${req.url}`);
  next();//include this to go to the next middleware
});
// include body-parser, cors, bcryptjs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

// beginning of Project
app.get('/', (req, res) => res.send('Hello World!'))

//Natalia's code START
app.post('/registerUser', (req,res)=>{
  User.findOne({username:req.body.username},(err,userResult)=>{
    if (req.body.username === ""){
      res.send('Please fill in all areas');
    } else if (userResult){
      res.send('Username taken already. Please try another one');
    } else{
      const hash = bcryptjs.hashSync(req.body.password);
      const user = new User({
        _id : new mongoose.Types.ObjectId,
        username : req.body.username,
        email : req.body.email,
        password :hash,
        // avatar : req.body.avatar
      });
      user.save().then(result =>{
        res.send(result);
      }).catch(err => res.send(err));
    }
  })
});

//get all users
app.get('/allUsers', (req,res)=>{
  User.find().then(result =>{
    res.send(result);
  })
});

//user login
app.post('/loginUser', (req, res) =>{
  User.findOne({username:req.body.username},(err, userResult) =>{
    if (userResult) {
      if (bcryptjs.compareSync(req.body.password, userResult.password)){
        res.send(userResult);
      } else {
        res.send('Not Authorized');
      }
    } else if (req.body.username === "") {
      res.send('Please fill in all areas');
    } else {
      res.send('User not found. Please register');
    }
  });
});
//Natalia's code ENDS

//Ruby's code START
// ========= code from Natalia end here


// =========  code from Jake start
// code from Jake end here

//Ruby's code start
//get all posts
app.get('/allPosts', (req,res)=>{
  Post.find().then(result =>{
    res.send(result);
  })
});

//add Post
app.post('/addPost/', (req,res)=>{
	const dbPost = new Post({
    _id : new mongoose.Types.ObjectId,
    userId: req.body.userId,
    username: req.body.username,
    imageUrl : req.body.imageUrl,
    description: req.body.description,
    date : String,
    comments : Array
  });
    //save to database and notify the user accordingly
    dbPost.save().then(result =>{
    res.send(result);
    }).catch(err => res.send(err));
});


app.post('/addComment/', (req,res)=>{
  Post.findOne({_id:req.body.postId}, (err,post)=>{
    if (post){
      const comment = new Comment({
        _id : new mongoose.Types.ObjectId,
        userName: req.body.userName,
        text: req.body.commentText
      });
      post.comments.push(comment);
      post.save();
    } else {
      res.send('post not found');
    }
  }).catch(err => res.send(err)); //refers to mogodb id
});

app.get('/myposts/:userid', (req,res) =>{
  const usernameParam = req.params.userid;
  Post.find({userId:usernameParam}).then(posts =>{
      res.send(posts);
  }).catch(err => res.send(err)); //refers to mogodb id
});

// DELETE USER
app.delete('/deleteUser/:id',(req,res)=>{
  const idParam = req.params.id;
  User.findOne({_id:idParam}, (err,user)=>{
    if (user){
      User.deleteOne({_id:idParam},err=>{
        res.send('deleted');
      });
    } else {
      res.send('not found');
    }
  }).catch(err => res.send(err)); //refers to mogodb id
});

// View a specific Post
app.get('/posts/:id', (req,res) =>{
  const idParam = req.params.id;
  Post.findOne({_id:idParam}).then(postResult =>{
      res.send(postResult);
  }).catch(err => res.send(err)); //refers to mogodb id
});

// DELETE POST JAMES
app.delete('/deletePost/:id',(req,res)=>{
  const idParam = req.params.id;
  Post.findOne({_id:idParam}, (err,post)=>{
    if (post){
      Post.deleteOne({_id:idParam},err=>{
        res.send('deleted');
      });
    } else {
      res.send('not found');
    }
  }).catch(err => res.send(err)); //refers to mogodb id
});

// UPDATE POST
app.patch('/updatePost/:id',(req,res)=>{
  const idParam = req.params.id;
  Post.findById(idParam,(err,post)=>{
    if(!post){
      res.send('post not found');
      return;
    }
    const updatedPost ={
      _id:idParam,
      username : req.body.username,
      userId : req.body.userId,
      description: req.body.description,
      imageUrl : req.body.image,
      date : req.body.title
    };
    Post.updateOne({_id:idParam}, updatedPost).then(result=>{
      res.send(result);
    }).catch(err=> res.send(err));
  }).catch(err=>res.send('Error'));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

