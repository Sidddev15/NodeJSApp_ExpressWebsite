var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
const { Server } = require('http');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/', function(req,res){
    res.render('index');//to show client
    // console.log("Hello World"); to show on the Server
});

app.get('/directory', function(req,res){
    res.render('directory');//to show client
    // console.log("Hello World"); to show on the Server
});



app.get('/universe', function(req,res){
    res.render('universe');//to show client
    // console.log("Hello World"); to show on the Server
});

app.get('/contact', function(req,res){
    res.render('contact');//to show client
    // console.log("Hello World"); to show on the Server
});

app.post('/contact/send', function(req,res){
    let transporter = nodemailer.createTransport({
        service : 'Gmail',
        auth    : {
            user : 'siddhsingh122@gmail.com',
            password : 'Siddharth@1506'
        }
    });

    let mailOptions = {
        from : 'Siddharth Singh <siddharthpersonal1506@gmail.com>',
        to   : 'siddhsingh122@gmail.com',
        subject : 'Test Mail from nodemailer',
        text : 'You have submission with the following details...  Name: '+req.body.name+ 'Email: ' +req.body.email+ 'Message: '+req.body.message,
        html : '<p>You have submission with the following details...</p><ul><li>Name: '+req.body.name+'</li><li>Email: '+req.body.email+'</li><li>Message: '+req.body.message+'</li></ul>'
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if(error) {
            console.log(error);
            res.redirect('/');
        }
        else {
            console.log('Message Sent: '+info.response);
            res.redirect('/');
        }
    });

    //console.log("Test"); to show on the Server
});

app.listen(3000);
console.log('Server is running on port 3000');