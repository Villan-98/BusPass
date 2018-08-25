const User=require('../db/models').user
module.exports={
    insert_user:async(requery)=>{
        console.log(requery)
        User.create({
            userName:requery.name,
            password:requery.password,
            role:requery.role,
            clgDep:requery.collDep,
            DepotId:requery.collDep,
        })
    },
    userByCat:async(requery)=>{
        return User.findAll({
            attributes:['userName','clgDep'],
            where:{
                role:requery.user
            }
        })
    }
}