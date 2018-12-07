$(function(){
    refreshList=function(data){
        $('#outer').empty().append(`<div class="row ">
                                <div class="col-lg-10 offset-lg-1 mt-5">
                                    <ul class="list-group " id="appList">
                                        <li class="list-group-item bg-dark ">
                                            <div class=" mx-1 row py-2  text-white">
                                                <div class="col-2">
                                                    Applicant Name /
                                                    <br>
                                                    View Document
                                                </div>
                                                <div class="col-lg-3 pl-md-5 col-md-5 text-center ">
                                                    Email Id /
                                                    <br>
                                                    College Name
                                                </div>
                                                <div class="col-2 offset-1">
                                                     <a>Father's Name</a>
                                                     <br>
                                                       Age
                                                </div>
                                                
                                                <div class="col-1  offset-1">
                                                     Accept
                                                </div>
                                                
                                                <div class="col-1   offset-1">
                                                     Reject
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>`)
        let appList = data.data
        appList.forEach((app) => {
            $('#appList').append(`
                        <li class="list-group-item  ">
                                            <div class=" mx-1 row py-2  ">
                                                <div class="col-2">
                                                     ${app.name}
                                                     <br>
                                                     <a href="../../../public/assets/uploads/${app.paymentSs}" target="_blank">View document</a>
                                                </div>
                                                <div class="col-lg-3 pl-md-5 col-md-5 text-center ">
                                                    ${app.email}
                                                    <br>
                                                    ${app.college.name}
                                                </div>
                                                <div class="col-2   offset-1">
                                                     ${app.fatherName}
                                                     <br>
                                                     ${app.age}
                                                </div>
                                                
                                                <div class="col-1  offset-1">
                                                     <button class="btn btn-primary"   id=${app.id} onclick="response(id,1)">Accept</button>
                                                </div>
                                                
                                                <div class="col-1   offset-1">
                                                     <button class="btn btn-danger" id=${app.id} onclick="response(id,0)">Reject</button>
                                                </div>
                                            </div>
                                        </li>
`)
        })

    }
    console.log("connected")
    $.get({
        url:"../../api/v1/application"
    }).then((data)=>{
        refreshList(data)

    })
        .catch((err)=>{
            console.log(err)
        })

})
response=function(id,ans)
{
    console.log("in the response function")
    $.get('/api/v1/application/nbg?id='+id+'&response='+ans+'&stage=2')
        .then((data)=>{
            $.get({
                url:"../../api/v1/application"
            }).then((data)=>{
                refreshList(data)
            })
        })
        .catch((err)=>{
            console.log("Oops some thing went wrong")
        })
}