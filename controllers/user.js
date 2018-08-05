const User=require('../db/models').user
module.exports={
    insert_user:async(requery)=>{
        User.create({
            userName:requery.name,
            password:requery.password,
            role:requery.role
        })
    }
}