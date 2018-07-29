const route=require('express').Router()
const multer=require('multer')
const fs=require('fs')
const path=require('path')
var upload=multer({dest:'upload'})
const application=require('../controllers/application')
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
            s.render('success')
        })
        .catch((err)=>{
            console.log(err)
            s.send("not done")
        })


    })
route.get('/status',(r,s)=>{
    console.log("request has came")
    console.log(r.params)
    application.getStatus(r.query)
        .then((data)=>{
            s.status(200).json({data})
        })
        .catch((err)=>{
            s.status(400).json({err:err})
        })
})
module.exports=route