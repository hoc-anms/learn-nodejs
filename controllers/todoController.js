var bodyParser =require('body-parser');
var db= require('mongoose');

//connect database
db.connect('mongodb://admin:vanhoc96@ds115874.mlab.com:15874/todoapp');

//create schema - this is  like blueprint

var todoSchema = new db.Schema({
    item:String,

})
var Todo=db.model('Todo',todoSchema);

// var itemFirst = Todo({item:'go to school '}).save(function(err){
//     if(err) throw err;
//     else console.log('Item save successfully!')
// });


var urlEncodedParser= bodyParser.urlencoded({extended:false});
// var data=[
//     {   item:'go to school'},
//     {   item:'go to movie'},
//     {   item:'go out'}
// ]

module.exports= function(app){

    //show todo
    app.get('/todo', function(req,res){
        //get data from mongodb , tranfer to view
        Todo.find({},function(err,data){
            if(err) throw err;
            res.render('todo',{todos:data})
        });
       
    });

    //fill infor todo
    app.post('/todo', urlEncodedParser,function(req,res){

        var newTodo=Todo(req.body).save(function(err,data){
            if(err) throw err;
            res.json(data)
        });
    });

    //remove todo
    app.delete('/todo/:item', function(req,res){
         //delete the request from mongo
         Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err,data){
            if(err) throw err;
            res.json(data);
         });
    });
};