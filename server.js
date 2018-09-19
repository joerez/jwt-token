const express = require('express');


const methodOverride = require('method-override')


//initialize Express
const app = express();


const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jwt-authentication', {  });


// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))


//Handlbars set up
var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));





//Middleware
var jwt = require('express-jwt');


var cookieParser = require('cookie-parser');


app.use(cookieParser());
app.use(jwt({
    secret: 'shhhhhhared-secret',
    audience: 'http://localhost:3000',
    issuer: 'http://localhost:3000',
    getToken: function fromHeaderOrCookie (req) { //fromHeaderOrQuerystring
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
        console.log('here ' + req.cookies.token)
        return req.cookies.token;
    }
    return null;
    }
}).unless({path: ['/', '/login', '/sign-up']}));



//ROUTES
require('./controllers/auth.js')(app);



const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`jwt-authentication listening on port ${port}!`);
})
