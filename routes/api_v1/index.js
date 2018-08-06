/*Created by Villan_98 on 5/08/2018*/

const route=require('express').Router()
const admin=require('./admin')
const application=require('./application')
const user=require('./user')
const depot=require('./depot')
route.use('/admin',admin)
route.use('/application',application)
route.use('/user',user)
route.use('/depot',depot)
module.exports=route