$(function(){

    console.log("connected")
    $.get({
        url:"../../api/v1/application"
    }).then((data)=>{
        console.log(data)
    })
        .catch((err)=>{
            console.log(err)
        })
})