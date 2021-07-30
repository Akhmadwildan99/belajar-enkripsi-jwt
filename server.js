const express = require('express');
const app = express();
const session = require('express-session');
const flash = require('express-flash');
const port = 3000;

app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: 'Buat ini jadi rahasia',
    resave: false,
    saveUninitialized: false
}));
const passport = require('./lib/passport')
app.use(passport.initialize())
app.use(express.json())
app.use(flash())
app.set('view engine', 'ejs')
const router = require('./router')
app.use(router)


app.listen(port, ()=>{
    console.log(`berjalan di http://localhost:${port}`);
})
