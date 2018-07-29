const route=require('express').Router()
route.get('/',(req,res)=>{
    if(req.isAuthenticated())
    {
        console.log("yes she is authemticated")
        res.send("hahaah")
    }
})
module.exports=route