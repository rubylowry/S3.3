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

const port = 3000; //set server port

//connect to db

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

//========== code from Natalia start
//add user
app.post('/addUser', (req,res)=>{
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
        avatar : req.body.avatar
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
//register user
app.post('/registerUser', (req,res)=>{
  User.findOne({username:req.body.username},(err,userResult)=>{
    if (userResult){
      res.send('username taken already. Please try another one');
    } else{
       const hash = bcryptjs.hashSync(req.body.password); //hash the password
       const user = new User({
         _id : new mongoose.Types.ObjectId,
         username : req.body.username,
         email : req.body.email,
         password :hash
       });
       user.save().then(result =>{
         res.send(result);
       }).catch(err => res.send(err));
    }
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

// ========= code from Natalia end here


// =========  code from Jake start
// code from Jake end here

//========== code from Ruby start

//get all posts
app.get('/posts', (req,res)=>{
	Post.find().then(result =>{
		res.send(result);
	})
}); // get all products

//add Post
app.post('/addPost/', (req,res)=>{
	const dbPost = new Post({
		_id : new mongoose.Types.ObjectId,
		title : req.body.title,
		description : req.body.description,
		image : req.body.image,
		}
	});
	//save to database and notify the user accordingly
	dbPost.save().then(result =>{
		res.send(result);
	}).catch(err => res.send(err));
}); // add Products
// code from Ruby end here

//========== code from James start
// code from James end here



//keep this always at the bottom so that you can see the errors reported
app.listen(port, () => console.log(`Mongodb app listening on port ${port}!`))
