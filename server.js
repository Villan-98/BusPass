const express=require('express')
const path=require('path')
const hbs=require('express-hbs')
const expressSession=require('express-session')
const passport=require('./passport/index')
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//statically holding the public folder//
app.use('/public',express.static(path.join(__dirname,'public')))

//view engine//
app.set("view engine",'hbs')
app.set('views','views')
app.engine('hbs',hbs.express4({
    defaultLayout:path.join(__dirname,'views/layout/default'),
    partialsDir:path.join(__dirname,'views/partials'),
    layoutsDir:path.join(__dirname,'views/partials')
}))
//express-session//
app.use(expressSession({
    secret:'easy very easy',
    resave:false,
    saveUninitialized:false,

}))
//passport//
app.use(passport.initialize())
app.use(passport.session())
//routes
app.get('/',(req,res)=>{
    res.send("hi")                            //why can't i useapp.use(on using it  buffering occur or it send hi every where)
    //res.render('home')
})
app.use('/profile',require('./routes/Ruser'))
app.use('/auth',require('./routes/Rauth'))
app.listen(2500,()=>{
    console.log("http://localhost:2500")
})