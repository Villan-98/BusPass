const route=require('express').Router()
const ctrlUser=require('../../controllers/user')
route.get('/determineRole',(req,res)=>{
    console.log("request in the determine role")
    if(req.isAuthenticated())
    {
        if(req.user.role==='admin')
        {
            res.redirect('/admin')
        }
        else if(req.user.role==='Transport Head')
        {
            res.redirect('/user/transportHead')
        }
        else if(req.user.role==='Depot Manager')
        {
            console.log("request in the depot manager")
            res.redirect('/user/depotManager')
        }
    }
})
route.get('/allUser',(req,res)=>{
    if(req.isAuthenticated())
    {
        if(req.user.role==='admin')
        {
            ctrlUser.allUser()
                .then((data)=>{
                    console.log(data)
                    res.status(200).send({
                        data:data
                    })
                })
                .catch((err)=>{
                    console.log(err)
                    res.status(504).send({
                        message:"Internal Server Error"
                    })
                })
        }
        else {
            res.redirect('/auth/signin')
        }
    }
    else {
        res.status(401).send({
            message:"Bad Request"
        })
    }
})
route.get('/',(req,res)=>{
    console.log("request")
    if(req.isAuthenticated())
    {
        console.log(req.user)
        if(req.user.role ==='admin')
        {
            ctrlUser.userByCat(req.query)
                .then((data)=>{
                    res.status(200).send({
                        data:data
                    })
                }).catch((err)=>{
                    console.log(err)
                res.status(500).send({
                    success:false,
                    message:"Internal Server Error",
                    code:"500"
                })

            })
        }
        else {
            res.status(401).send({
                success:false,
                message:"Bad Request",
                code:"401"
            })
        }
    }
    else {
        res.redirect('/auth/signin')
    }
})
module.exports=route