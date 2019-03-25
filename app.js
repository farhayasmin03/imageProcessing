var express = require('express');

var app = express();
const multer = require('multer')
const path = require('path')
const bodyParser = require('body-parser');
var ejs = require('ejs')
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
//set storage Engine for multer
var storage = multer.diskStorage({
    destination: './public/uplodes/',

    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
var upload = multer({
    storage: storage
}).single('myImage')

app.use(bodyParser.json());

var routes = require('./routes/router');
app.use('/', routes);


app.use(express.static(__dirname + '/public'));


app.listen(3000, function () {
    console.log('Example app listening on port 3000!')

});
module.exports = app;