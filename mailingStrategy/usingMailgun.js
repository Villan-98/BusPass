const mailGun=require('../config').mailGun
const mailgun=require('mailgun-js')({apiKey:mailGun.apiKey,domain:mailGun.domain})
function doMail(emailData){
    console.log(emailData)
    var data={

        from:'Bus Pass Management<sachinrathore453@gmail.com>',
        to:emailData.emailId,
        subject:"Bus Pass Issuance",
        text:emailData.text
    }

    mailgun.messages().send(data,function(error,body){
        if(error)
        {
            console.log(error)
        }

        console.log(body)
    })
}
module.exports={doMail}