const route=require('express').Router()
const application=require('../controllers/application')
route.post('/',(r,s)=>{
    application.newApplication(r.body)
        .then((data)=>{
            s.status(200).json({done:data})
        })
        .catch((err)=>{
            s.status(400).json({done:err})
        })
})
module.exports=route