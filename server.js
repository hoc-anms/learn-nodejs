var express = require ('express');
var todoCotroller= require('./controllers/todoController.js')

var app= express();

//set up template engine (ejs)
app.set('view engine','ejs');

//static files
app.use(express.static('public'));

//fire controller
todoCotroller(app);

//listen to port
app.listen(4444);
console.log('Server is running on the port 4444');