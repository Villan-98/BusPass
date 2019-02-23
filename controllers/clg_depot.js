/* Created by Villan on 06/08/2018*/
const db=require('../db/models').db
const college=require('../db/models').college
const depot=require('../db/models').depot
const user=require('../db/models').user
module.exports={
    insertCollege:async(requery)=>{
       return college.create({
            name:requery.name,
            DepotId:requery.dptId
        })
    },
    deleteCollege:async(requery)=>{
      return college.destroy({
          where:{
              id:requery.id
          }
      })
    },
    insertDepot:async(requery)=>{
        return depot.create({
            name:requery.name,

        })
    },
    getAllCollege:async()=> {
       return college.findAll({
           attributes:['name','id'],
           order:[['name']],
           include:[{
               model:depot,
               attributes:['name']
           },{
               model:user,
               attributes:['userName']
           }]

       })
    },
    getOneCollege: async(requery)=>{
        return college.findOne({
            where:{
               name:requery.name 
            }
        })
    },
    getAllDepot:async()=>{
        return depot.findAll({
            attributes:['name','id'],
            order:[['name']],
            include:[
                {
                    model:user,
                    attributes:['userName','id']
                }
            ]
        })
    },
    getOneDepot:async(requery)=>{
        return depot.findOne({
            where:{
                name:requery.dptName
            }
        })
    },
    deleteDepot:async(requery)=>{
        return db.transaction((t)=>{
            return college.destroy({
                where:{
                    DepotId:requery.id
                }
            },{transaction:t}).then(()=>{
                return user.destroy({
                    where:{
                        DepotId:requery.id
                    }
                },{transaction:t}).then(()=>{
                    return depot.destroy({
                        where:{
                            id:requery.id
                        }
                    })
                })
            })
        })


    }
}