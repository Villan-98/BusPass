const route=require('express').Router()
const multer=require('multer')
const fs=require('fs')
const path=require('path')
var upload=multer({dest:'upload'})
const application=require('../../controllers/application')
function fileFilter(file,cb){
    let filetype=/png|jpg|jpeg/
    const extname=filetype.test(path.extname(file.originalname).toLowerCase())
    const mimetype=filetype.test(file.mimetype)
    if(mimetype&&extname)
    {

        cb(null,true)
    }
    else{
        cb(null,false)
    }

}
route.get('/',(req,res)=>{
    if(req.isAuthenticated())
    {
        if(req.user.role==='Transport Head')
        {
            //console.log(req.user)
            req.query['clgId']=req.user.collegeId
           // console.log(req.query)
            application.applicationByClg(req.query)
                .then((data)=>{
                    res.status(200).send({
                        success:true,
                        data:data,
                        code:200
                    })
                })
        }
        else
        {
            //console.log(req.query)
            req.query['depotId']=req.user.DepotId
            application.applicationByDpt(req.query)
                .then((data)=>{
                    res.status(200).send({
                        success:true,
                        code:200,
                        data:data
                    })
                })
                .catch((err)=>{
                    console.log(err)
                    res.status(500).send({
                        success:false,
                        code:500,
                        message:"Internal Server Error"
                    })
                })

        }
    }
    else{
        res.status(401).send({
            message:"Unauthorized access",
            code:"401",
            success:false
        })
    }
})
route.post('/',upload.array('photo',3),(r,s)=>{

    /*if(r.files.length<1)
    {                                                   //it is undefined even though files get  loaded
        console.log("not applicable")
    }*/

    for(i=0;i<r.files.length;i++)
    {
        //console.log("loop ")
        var filename
        let file=0
        fileFilter(r.files[i],(err,done)=>{
            if(err){
                console.log("opps")
            }
            else if(done)
            {
                 filename=Date.now()+r.files[i].originalname
                var pathname=r.files[i].path
                fs.readFile(r.files[i].path,(err,data)=>{
                    if(err){

                        console.log("oops ")
                    }
                    //console.log(r.files[i])
                fs.writeFile('public/assets/uploads/'+filename,data,(err)=>{
                    if(err)
                    {
                        console.log(err)
                    }
                    else{
                       /* if(i===0)
                        {
                            r.body['feeReceipt']=filename
                            file++;
                        } else if(i===1)
                        {
                            r.body['idCard']=filename
                            file++;
                        }       */
                    }
                    fs.unlink(pathname,(err)=>{
                        if(err)
                        {
                            console.log(err)
                        }
                    })
                })
                })
            }
            else{
                console.log("choose the correct file")
                fs.unlink((r.files[i].path),(err)=>{
                    if(err)
                    {
                        console.log("err in unlink")
                        console.log(err)
                    }
                })
            }

        })
        if(i===0)
        {
            r.body['feeReceipt']=filename
            file++;
        } else if(i===1)
        {
            r.body['idCard']=filename
            file++;
        } else if(i===2)
        {
            r.body['paymentSs']=filename
        }
    }
    application.newApplication(r.body)
        .then(()=>{
            application.getStatus(r.body)
                .then((data)=>{
                    s.status(201).send({
                        success:true,
                        data:data,
                        code:201
                    })
                })
        })
        .catch((err)=>{
            console.log(err)
            s.status(400).json({
                success:false,
                code:400,
                err:"Application not submitted"
            })
        })
    })

route.get('/status',(r,s)=>{
    //console.log("request has came")
    //console.log(r.params)
    application.getStatus(r.query)
        .then((data)=>{
            s.status(200).json({data})
        })
        .catch((err)=>{
            console.log(err)
            s.status(500).json({message:"Internal Server error"})
        })
})
route.get('/nbg',(req,res)=>{
    console.log("response"+req.query.response)
    if(req.query.stage==='1')
    {

        if(req.query.response==='1')
        {
            req.query.response='Accepted'
        }
        else {
            //console.log("in the reject")
            req.query.response='Rejected'

        }
    }
    else {

        if(req.query.response==='1')
        {
            req.query.response='Approved'
        }
        else {
            //console.log("in the reject")
            req.query.response='Cancelled'
        }
    }

    application.verify(req.query)
        .then((data)=>{
            //console.log(data)
            res.status(200).json({
                data:data
            })
        })
        .catch((err)=>{
            console.log(err)
            res.status(500).json({
                message:"Internal Server Error"
            })
        })
})
module.exports=route