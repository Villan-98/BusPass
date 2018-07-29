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

app.use('/admin',(req,res,next)=>{
    console.log(req.user)
    if(req.isAuthenticated())
    {
        if(req.user.role==='admin')
        {
            console.log("done")
            next()
        }
    }
    else{
        console.log("wrong user")
        res.redirect('/auth/signin')
    }
})

//some static files//
app.use('/',express.static(__dirname+'/public_html/home'))
app.use('/apply',express.static(__dirname+'/public_html/apply'))
app.use('/status',express.static(__dirname+'/public_html/get status'))
app.use('/admin',express.static(__dirname+'/public_html/admin'))
app.use('/admin/apply/transport',express.static(__dirname+'/public_html/admin/apply/transport'))
app.use('/admin/apply/busManager',express.static(__dirname+'/public_html/admin/apply/bus'))
/*app.use('/api/v1/' ,require('./routes/api_v1'))*/
app.use('/api/v1/apply',require('./routes/application.js'))
app.use('/profile',require('./routes/Ruser'))
app.use('/auth',require('./routes/Rauth'))
app.listen(2500,()=>{
    console.log("http://localhost:2500")
})