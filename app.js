//app.js

var express=require('express');
var bodyparser=require('body-parser');
const mongoose=require('mongoose');
//This will intiliaze an app
var app=express();

 app.get('/', (req, res) => {
	res.sendFile(__dirname + '/views/index.html')
 	// Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get! 	// Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
  })
  
app.use('/scripts',express.static('scripts'));
app.use('/css',express.static('css'));
app.use('/',express.static('views'));

var port=1234;
const product_routes=require('./routes/product.route');
let db_url='mongodb://hassan1:H123456@ds119160.mlab.com:19160/productsdbtutorial';

//Connection Area

const db_connection_string=db_url;
mongoose.connect(db_connection_string,{useNewUrlParser:true});
mongoose.Promise=global.Promise;
const db =mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use('/products',product_routes);

// app.post('/products/Create',(req,res)=>{
// 	res.send(req.body);
// //	console.log(req.body)
// })


app.listen(port,()=>{
	
	console.log('App is running on port '+port);
}); 
