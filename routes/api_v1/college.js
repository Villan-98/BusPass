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
            ctrlCollege.insertCollege(req.body)
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
                code:"400",
                message:"Unauthorized"
            })
        }
    }
})
module.exports=route