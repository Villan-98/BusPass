$(function(){

    $('#outer').empty().append(`<div class="row ">
                                <div class="col-lg-10 offset-lg-1 mt-5">
                                    <ul class="list-group " id="appList">
                                        <li class="list-group-item bg-dark ">
                                            <div class=" mx-1 row py-2  text-white">
                                                <div class="col-3">
                                                    Applicant Name
                                                    <br>/View Document
                                                </div>
                                                <div class="col-lg-3 pl-md-5 col-md-5 text-center ">
                                                    Email Id
                                                    <br>
                                                    /Course
                                                </div>
                                                <div class="col-1 offset-1">
                                                     <a>Age</a>
                                                     <br>
                                                     Year
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
    console.log("connected")
    $.get({
        url:"../../api/v1/application?status=Pending"
    }).then((data)=> {
        console.log(data)
        let appList = data.data
        appList.forEach((app) => {
            $('#appList').append(`
                        <li class="list-group-item  ">
                                            <div class=" mx-1 row py-2  ">
                                                <div class="col-3">
                                                     ${app.name}
                                                     <br>
                                                     <img src=""> View document</img>
                                                </div>
                                                <div class="col-lg-3 pl-md-5 col-md-5 text-center ">
                                                    ${app.email}
                                                    <br>
                                                    ${app.course}
                                                </div>
                                                <div class="col-1 offset-1">
                                                     ${app.age}
                                                     <br>
                                                     ${app.year}
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
      $.get('/api/v1/application/nbg?id='+id,'&response='+ans).then((data)=>{
          console.log(data)
      })
          .catch((err)=>{
              console.log(err)
          })
}