/*Created by Villan_98 on 06/08/2008 */
const ctrlDepot=require('../../controllers/clg_depot')
const route=require('express').Router()
route.get('/allDepot',(req,res)=>{
    ctrlDepot.getAllDepot()
        .then((data)=>{
            res.status(200).send({
                data:data,
                success:true,
                code:"200"
            })
        })
        .catch((err)=>{
            console.log(err)
            res.status(500).send({
                code:"500",
                message:"Internal Server Error"
            })
        })
})
route.post('/addDepot',(req,res)=>{
    if(req.isAuthenticated())
    {
        if(req.user.role==='admin')
        {
            ctrlDepot.insertDepot(req.body)
                .then(()=>{
                    res.status(201).send({
                        success:true,
                        code:"201",
                    })
                })
                .catch((err)=>{
                    console.log(err)
                    res.status(500).send({
                        code:"500",
                        message:"Internal Server Error"
                    })
                })
        }
        else {
            res.status(401).send({
                code:"401",
                message:"Unauthorized Action",
                success:false
            })
        }
    }
    else {
        res.redirect('./auth/signin')
    }
})
route.delete('/:id',(req,res)=>{
    if(req.isAuthenticated())
    {
        if(req.user.role==='admin')
        {
            console.log("reached")
            ctrlDepot.deleteDepot(req.params)
                .then(()=>{
                    ctrlDepot.getAllDepot()
                        .then((data)=>{
                            res.status(200).send({
                                success:true,
                                code:204,
                                message:"Depot deleted successfully",
                                data:data
                            })
                        })
                        .catch((err)=>{
                            res.status(500).send({
                                success:false,
                                message:"Internal Server Error",
                                code:500
                            })
                        })

                })
        }
        else {
            res.status(401).send({
                code:401,
                success:false,
                message:"Unauthorized action"
            })
        }
    }
    else{
        res.redirect('/auth/signin')
    }
})
module.exports=route
