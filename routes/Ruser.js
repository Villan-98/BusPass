const route=require('express').Router()
route.get('/',(req,res)=>{
    res.send("hahaah")
})
module.exports=route