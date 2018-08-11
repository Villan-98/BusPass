/* File created by Villan_98 on 03/08/2018*/
const route=require('express').Router()
const passport=require('../../passport')
const ctrlUser=require('../../controllers/user')
const config=require('../../config')

route.post('/addUser',(req,res)=>{
    if(req.isAuthenticated())
    {
        if(req.user.role==='admin')
        {
            console.log("here is the request")
            if(req.body.secret===config.secret)
            {
                ctrlUser.insert_user(req.body)
                    .then((data)=>{
                        res.status(201).send({
                            success:true
                        })
                    }).catch((err)=>{
                        console.log(err)
                    res.status(500).send({
                        success:false,
                        code:"500",
                        error:{
                            message:"Internal server error"

                        }
                    })
                })
            }else {
                res.status(400).send({
                    success:false,
                    code:"400",
                    error:{
                        message:"Not authorize for same action"
                    }
                })
            }

        }
        else {
        }
    }
    else {
        res.redirect('/auth/signin')
    }

})
module.exports=route