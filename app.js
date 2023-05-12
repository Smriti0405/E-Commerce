const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate =  require('ejs-mate');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user'); 
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require("helmet");
const MongoStore = require('connect-mongo');



//Routes 
const productRoutes = require('./routes/product')
const reviewRoute = require('./routes/review')
const authRoute = require('./routes/auth');
const cartRoute = require('./routes/cart');

// APIs
const productApi = require('./routes/api/productapi');


// const seedDB = require('./seed')
const dbURL = process.env.dbURL || 'mongodb://127.0.0.1:27017/shopping-app';

mongoose.connect(dbURL)
    .then(() => console.log('DB Connected'))
    .catch((err) => console.log(err))


// seedDB();

app.engine('ejs',ejsMate)
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(mongoSanitize());
app.use(helmet({contentSecurityPolicy:false}));



const secret = process.env.SECRET || 'somethingbetter';

const store = MongoStore.create({
    secret:secret,
    mongoUrl:dbURL,
    touchAfter: 24 * 3600
})

// Session
const sessionConfig = {
    store,
    name:'session',      // chnages default name cookie.sid to this
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly : true,
        expires : Date.now() + 1000*60*60*24*7*1,
        maxAge : 1000*60*60*24*7
    }
} 


app.use(session(sessionConfig));


// Flash
app.use(flash());



// Initializing middlewares for passport
app.use(passport.initialize());
app.use(passport.session());


// Telling passport to check for username & password using authenticate method
passport.use(new LocalStrategy(User.authenticate()));


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Flash middleware
app.use((req,res,next)=>{
    // console.log(req.query);
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');

    next();
})



app.get('/', (req,res) => {
    res.render('home');
})

app.use(productRoutes);
app.use(reviewRoute);
app.use(authRoute);
app.use(productApi);
app.use(cartRoute);



const port = 3000;
app.listen(port,()=>{
    console.log(`Server started at port ${port}`)
})