/* Created by Villan on 06/08/2018*/
const college=require('../db/models').college
const busDepot=require('../db/models').busDepot
module.exports={
    insertCollege:async(requery)=>{
       return college.create({
            user:requery.name
        })
    },
    insertDepot:async(requery)=>{
       return  busDepot.create({
            user:requery.name
        })
    },
    getAllCollege:async(requery)=> {
       return college.findAll()
    },
    getAllDepot:async(requery)=>{
        return busDepot.findAll()
}

}