const route=require('express').Router()
const User=require('../controllers/user')
const passport=require('../passport/index')
route.get('/signin',(req,res)=>{
    res.render('signin')
})
route.get('/signout',(req,res)=>{
    req.user=null
    req.logout()
    req.session.destroy((err)=>{
        if(err)
        {
            console.log(err)
            res.status(500).json({
                code:"500",
                message:"Internal Server Error"
            })
        }
        else
        {

            res.redirect('/auth/signin')
        }
    })

})
route.post('/signin',passport.authenticate('local',{
    successRedirect:'../api/v1/user/determineRole',
    failureRedirect:'../auth/signin'
}))
route.get('/signup',(req,res)=>{
    res.render('signup')
})
route.post('/signup',(r,s)=>{
    User.insert_user(r.body)
        .then((s.redirect('../auth/signin')))
})
module.exports=route