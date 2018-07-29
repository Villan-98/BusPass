const db=require('../db/models').db
const application=require('../db/models').application
function newApplication(data){
    return application.create({
        name:data.name,
        fatherName:data.fatherName,
        age:data.age,
        institute:data.institute,
        course:data.course,
        year:data.year,
        address:data.address,
        email:data.email,
        id:data.id,
        idCard:data.idCard,
        feeReceipt:data.feeReceipt,
        paymentSs:data.paymentSs
    })
}
function getStatus(data){
    return application.findOne({
        where: {
            id: data.id
        }
    })
}
module.exports={
    newApplication:newApplication,
    getStatus:getStatus
}