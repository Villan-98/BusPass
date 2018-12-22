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
function applicationByDpt(requery){
    return application.findAll({
        include:[{
            model:college,
            where:{
                DepotId:requery.depotId
            }
        }],
        where:{
            status:requery.status
        }
    })
}
function applicationByClg(requery){
    return application.findAll({
        where:{
            collegeId:requery.clgId,
            status:requery.status
        }
    })
}
function verify(requery){
    console.log(requery.stage)
    let present_status;         // to prevent the user to reject the accepted applications
    if(requery.stage==='1')
    {
        present_status="Accepted"
    }
    else if(requery.stage==='2')
    {
        present_status="Approved"
    }
    return application.update({
        status: requery.response
    },{
        where:{
            id:requery.id,
            status:{
                $ne:present_status
            }
        }
    })
}
module.exports={
    newApplication:newApplication,
    getStatus:getStatus,
    applicationByDpt:applicationByDpt,
    applicationByClg:applicationByClg,
    verify:verify
}