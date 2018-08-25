/* Created by Villan on 06/08/2018*/
const college=require('../db/models').college
const depot=require('../db/models').depot
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

       })
    },
    getAllDepot:async()=>{
        return depot.findAll({
            attributes:['name','id'],
            order:[['name']],
        })
    },
    getOneDepot:async(requery)=>{
        return depot.findOne({
            where:{
                name:requery.dptName
            }
        })
    }
}