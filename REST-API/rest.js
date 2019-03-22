var express = require('express');
let bodyParser = require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://zxw:zxw@zxwcluster-9i4xf.mongodb.net/test?retryWrites=true"
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


app.get('/movies/populate', function (req, res) {
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    var dbo = db.db("zxw");
    dbo.collection("movies"). find({}).toArray(function(err, result) { // 返回集合中所有数据
        len = result.length
        console.log(len)
        var countt = {"count":len}
        res.send(countt);
        db.close();
    });
});
 
});

app.get('/movies', function (req, res) {
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    var dbo = db.db("zxw");
    dbo.collection("movies"). find({}).toArray(function(err, result) { // 返回集合中所有数据
        console.log(result);
        var round_num = Math.round(Math.random()); 
        res.send(result[round_num]);
        db.close();
    });
});
});

app.get('/movie/:id', function (req, res) {
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    var dbo = db.db("zxw");
    console.log(req.params.id)
    var whereStr = {"id":req.params.id}; 
    dbo.collection("movies"). find(whereStr).toArray(function(err, result) { // 返回集合中所有数据
        console.log(result);
        res.send(result);
        db.close();
    });
});
  
 });
 

 app.get('^/movies/search', function (req, res) {
   console.log(req.query.limit);
   console.log(req.query.metascore);
   var score = parseInt(req.query.metascore)
   var count = parseInt(req.query.limit)
   MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    var dbo = db.db("zxw");
    var whereStr = {"metascore":{$gt: score}}; 
    dbo.collection("movies"). find(whereStr).limit(count).toArray(function(err, result) { // 返回集合中所有数据
        console.log(result);
        console.log(typeof result)
        res.send(result);
        db.close();
    });
  });
 });

 app.post('/movies/:id', function (req, res) {
   MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    var dbo = db.db("zxw");
    var whereStr = {"id":req.params.id}; 
    var updateStr = {$set: { "date" : req.body.date,"review":req.body.review}};
    dbo.collection("movies").updateOne(whereStr, updateStr,function(err, result) { // 返回集合中所有数据
        console.log(result);
        res.send(result);
        db.close();
    });
  });
 });
 
 
var server = app.listen(9292, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("rest api is running  http://%s:%s", host, port)
 
})