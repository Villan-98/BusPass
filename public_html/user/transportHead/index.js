$(function(){

    $('#outer').empty().append(`<div class="row ">
                                <div class="col-lg-8 offset-lg-2">
                                    <ul class="list-group " id="appList">
                                        <li class="list-group-item bg-dark ">
                                            <div class=" mx-1 row py-2  text-white">
                                                <div class="col-4">
                                                    Applicant Name
                                                </div>
                                                <div class="col-lg-4 pl-md-5 col-md-5 text-center offset-lg-1">
                                                    Depot Name
                                                </div>
                                                <div class="col-1   offset-1">
                                                     age
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>`)
    console.log("connected")
    $.get({
        url:"../../api/v1/application/"
    }).then((data)=> {
        console.log(data)

        let appList = data.data
        appList.forEach((app) => {
            $('#appList').append(`
                    <li href="#" class="list-group-item  px-3">
                    <div class="row">
                         <div class="px-3 offset-1 col-4">
                            ${app.name}
                         </div>
                         <div class="px-3 offset-1 col-4">
                            ${app.status}
                         </div>
                         
                         <div class="px-3 offset-1 col-4">
                            ${app.age}
                         </div>
                         
                    </div>
                    </li>`)
        })
    })
        .catch((err)=>{
            console.log(err)
        })
})