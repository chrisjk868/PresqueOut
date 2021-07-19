const express = require('express');
const router = express.Router();
const app = express();
const mongoose = require('mongoose');
const expressEjsLayout = require('express-ejs-layouts')
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
require("./config/passport")(passport)

//mongoose
mongoose.connect('mongodb+srv://chrisjk868:jellyboard@ppsaccountinfocluster.uisvs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{useNewUrlParser: true, useUnifiedTopology : true})
.then(() => console.log('Connected to Cluster'))
.catch((err)=> console.log(err));

//EJS
app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));

//BodyParser
app.use(express.urlencoded({extended : false}));

//express session
app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use((req,res,next)=> {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error  = req.flash('error');
next();
})

//Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));

app.listen(3000, () => {
    console.log('Listening on Port 3000')
});