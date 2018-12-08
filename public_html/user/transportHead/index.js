$(function(){
    let anchor=$('a')
    anchor.click((e)=>{
        let id=(e.target).getAttribute('id')
        if(id==='navRejected')
        {
            $.get('../../../api/v1/application?status=Rejected')
                .then((data)=>{
                    refreshList(data,"Rejected")
                })
        }
        if(id==='navAccepted')
        {
            $.get('../../../api/v1/application?status=Accepted')
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
                                                <div class="col-3">
                                                    <a>Applicant Name</a>
                                                    <br>
                                                    <a>Fee Receipt</a>
                                                </div>
                                                <div class="col-lg-3 pl-md-5 col-md-5 text-center ">
                                                   <a>Email Id</a> 
                                                    <br>
                                                    <a>Id Card</a>
                                                </div>
                                                <div class="col-1 offset-1">
                                                     <a>course</a>
                                                     <br>
                                                     <a>Year</a>
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
                                                <div class="col-3">
                                                     ${app.name}
                                                     <br>
                                                     <a href="../../../public/assets/uploads/${app.feeReceipt}" target="_blank">View Document</a> 
                                                </div>
                                                <div class="col-lg-3 pl-md-5 col-md-5 text-center ">
                                                    ${app.email}
                                                    <br>
                                                    <a href="../../../public/assets/uploads/${app.idCard}" target="_blank">View Document</a>
                                                </div>
                                                <div class="col-1 offset-1">
                                                     ${app.course}
                                                     <br>
                                                     ${app.year}
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
    $.get({
        url:"../../api/v1/application?status=Pending"
    }).then((data)=> {
        refreshList(data,"Pending")

    })
        .catch((err)=>{
            console.log(err)
        })
})
response=function (id,ans){
    console.log("button clicked")
      console.log(id)
    console.log(ans)
      let data={
        id:id,
      }
      $.get('/api/v1/application/nbg?id='+id,'&response='+ans+'&stage=1').then((data)=>{
          $.get({
              url:"../../api/v1/application?status=Pending"
          }).then((data)=> {
              refreshList(data,"Pending")
          })
          })
          .catch((err)=>{
              console.log(err)
          })
}