var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require("body-parser");

var todosRoutes = require("./routes/todos");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend: true}));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));

app.get('/',function(req,res){
    //res.send("Hello from the root route");
    res.sendFile("index.html");
});

app.use('/api/todos',todosRoutes);

//Server starter code
app.listen(port,function(){
   console.log("App is running on PORT "+ port); 
});