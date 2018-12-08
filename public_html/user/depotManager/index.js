$(function(){
    let anchor=$('a')
    anchor.click((e)=>{
        let id=(e.target).getAttribute('id')
        if(id==='navRejected')
        {
            $.get('../../../api/v1/application?status=Cancelled')
                .then((data)=>{
                    refreshList(data,"Rejected")
                })
        }
        if(id==='navAccepted')
        {
            $.get('../../../api/v1/application?status=Approved')
                .then((data)=>{
                    refreshList(data,"Accepted")
                })
        }
    })
    refreshList=function(data,status){
        let cls,btnRejCls,btnAccCls
        if(status==="Pending")
        {
            cls='alert-primary'
        }
        else if(status==='Accepted')
        {
            cls='alert-success'
            btnAccCls="disabled"
            btnRejCls="disabled"
        }
        else if(status==='Rejected')
        {
            cls='alert-danger'
            btnRejCls="disabled"
        }
        $('#outer').empty().append(`<div class="row ">
                                <div class="col-lg-10 offset-lg-1 mt-5">
                                <div class="alert ${cls} h3 text-center mb-0">${status}</div>
                                    <ul class="list-group " id="appList">
                                        <li class="list-group-item bg-dark ">
                                            <div class=" mx-1 row py-2  text-white">
                                                <div class="col-2">
                                                    <a>Applicant Name /</a>
                                                    <br>
                                                    <a>View Document</a>
                                                </div>
                                                <div class="col-lg-3 pl-md-5 col-md-5 text-center ">
                                                   <a>Email Id /</a> 
                                                    <br>
                                                    <a>College Name</a>
                                                </div>
                                                <div class="col-2 offset-1">
                                                     <a>Father's Name</a>
                                                     <br>
                                                       <a>Age</a>
                                                </div>
                                                
                                                <div class="col-1  offset-1">
                                                    <a>Accept</a> 
                                                </div>
                                                
                                                <div class="col-1   offset-1">
                                                    <a>Reject</a> 
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
                                                     <button class="btn btn-primary ${btnAccCls}"   id=${app.id} onclick="response(id,1)">Accept</button>
                                                </div>
                                                
                                                <div class="col-1   offset-1">
                                                     <button class="btn btn-danger ${btnRejCls}" id=${app.id} onclick="response(id,0)">Reject</button>
                                                </div>
                                            </div>
                                        </li>
`)
        })

    }
    console.log("connected")
    $.get({
        url:"../../api/v1/application?status=Accepted"
    }).then((data)=>{
        refreshList(data,"Pending")

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
                url:"../../api/v1/application?status=Accepted"
            }).then((data)=>{
                console.log(data)
                refreshList(data,"Pending")
            })
        })
        .catch((err)=>{
            console.log("Oops some thing went wrong")
        })
}