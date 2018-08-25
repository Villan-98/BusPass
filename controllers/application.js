const db=require('../db/models').db
const application=require('../db/models').application
const college=require('../db/models').college
function newApplication(data){
    return application.create({
        name:data.name,
        fatherName:data.fatherName,
        age:data.age,
        course:data.course,
        year:data.year,
        address:data.address,
        email:data.email,
        id:data.id,
        idCard:data.idCard,
        feeReceipt:data.feeReceipt,
        paymentSs:data.paymentSs,
        collegeId:data.institute
    })
}
function getStatus(data){
    return application.findOne({
        where: {
            id: data.id
        }
    })
}
function applicationByDpt(data){
    return application.findAll({
        include:[{
            model:college,
            where:{
                DepotId:data.depotId
            }
        }]
    })
}
module.exports={
    newApplication:newApplication,
    getStatus:getStatus,
    applicationByDpt:applicationByDpt
}