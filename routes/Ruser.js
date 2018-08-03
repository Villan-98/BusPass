const route=require('express').Router()
route.get('/',(req,res)=>{
    if(req.isAuthenticated())
    {
        if(req.user.role==='admin')
        {
            res.redirect('/admin')
        }
        else if(req.user.role==='transportHead')
        {
            res.redirect('/transportHead')
        }
        else if(req.user.role==='depotManager')
        {
            res.redirect('/depotManager')
        }
    }
})
module.exports=route