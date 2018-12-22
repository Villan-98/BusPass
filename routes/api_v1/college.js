/*Created by Villan_98 on 06/08/2008 */
const ctrlCollege=require('../../controllers/clg_depot')
const route=require('express').Router()
route.get('/allColleges',(req,res)=>{

            ctrlCollege.getAllCollege()
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
route.post('/addCollege',(req,res)=>{
    if(req.isAuthenticated())
    {
        if(req.user.role==='admin')
        {
            //console.log(req.body)
           let  body={
                dptName:req.body.depot
            }
            ctrlCollege.getOneDepot(body)
                .then((data)=> {
                    //console.log(data.id)
                    req.body['dptId']=data.id
                    ctrlCollege.insertCollege(req.body)
                        .then(()=>{
                            res.status(201).send({
                                success:true,
                                code:"201",
                            })
                        })
                        .catch((err)=>{
                           // console.log(err)
                            res.status(500).send({
                                code:"500",
                                message:"Internal Server Error"
                            })
                        })
                })

        }
        else {
            res.status(401).send({
                code:"400",
                message:"Unauthorized action"
            })
        }
    }
})

route.delete('/:id',(req,res)=>{

    //console.log(req.params.id)
    ctrlCollege.deleteCollege(req.params)
        .then((data)=>{
           // console.log(data)
            ctrlCollege.getAllCollege()
                .then((data)=>{
                 res.status(200).send({
                     data:data,
                     success:true,
                     code:200
                 })
                })
        })
        .catch((err)=>{
            console.log(err)
            res.status(500).send({
                success:false,
                code:500,
                message:"Internal Server Error"
            })
            }
        )
})
module.exports=route