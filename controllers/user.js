const User=require('../db/models').user
const depot=require('../db/models').depot
module.exports={
    insert_user:async(requery)=>{
        console.log(requery)
        if(requery.role==='Transport Head')
        {
            User.create({
                userName:requery.name,
                password:requery.password,
                role:requery.role,
                clgDep:requery.collDep,
                collegeId:requery.collDep
            })
        }
        else{

            User.create({
                userName:requery.name,
                password:requery.password,
                role:requery.role,
                clgDep:requery.collDep,

                DepotId:requery.collDep,
            })
        }
    },
    userByCat:async(requery)=>{
        return User.findAll({
            where:{
                role:requery.user
            }
        })
    },
    allUser:async(requery)=>{
        return User.findAll({
            include:[{
                model:depot,
                attributes:['name']
            }]
        })
    }
}