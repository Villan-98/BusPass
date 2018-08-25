/* Created by Villan-98 on 22/08/2018*/
$(function(){
    console.log("connected")
    const anchor=$('a')
    anchor.click((e)=>{
        const $navId=e.target.getAttribute('id')
        if($navId==='navClgDetail')
        {
            $('#headDiv').show()
            $('#headDiv').addClass('offset-lg-2 col-lg-8 col-md-12 mt-5')
            $('#topHeading').empty().append('Registered Colleges')
            $('#forms').empty().append(`
                            <div class="row ">
                            <div class="col-lg-8 offset-lg-2">
                            
                            <ul class="list-group " id="clgList">
                            <li class="list-group-item bg-dark ">
                                <div class=" mx-1 row py-2  text-white">
                            <div class="col-4">
                            College Name
                            </div>
                            <div class="col-lg-4 pl-md-5 col-md-5 text-center offset-lg-1">
                            Depot Name
                            </div>
                            <div class="col-1   offset-1">
                            Delete
                            </div>
                            </div>
                            </li>
                            </ul>
                            </div>
                        `)
            $.get({
                url:'../api/v1/college/allColleges'
            })
                .then((data)=>{
                    let colleges=data.data
                    colleges.forEach((college)=>{$('#clgList').append(`
                    <li href="#" class="list-group-item  px-3">
                    <div class="row">
                         <div class="px-3 offset-1 col-4">
                            ${college.name}
                         </div>
                         <div class="px-3 offset-1 col-4">
                            ${college.Depot.name}
                         </div>
                         <div class="text-danger text-center" id="${college.id}" onclick="deleteCollege(id)">
                         X
                         </div>
                    </div>
                    </li>`)
                    })
                }).catch((err)=>{
                console.log(err)
            })

        }
        if($navId==='navDptDetail')
        {
            $('#headDiv').show()
            $('#headDiv').addClass('offset-lg-2 col-lg-8 col-md-12 mt-5')
            $('#topHeading').empty().append('Registered Depot')
            $('#forms').empty().append(`
                            <div class="row ">
                                <div class="col-lg-8 offset-lg-2">
                                     <ul class="list-group " id="dptList">
                                        <li class="list-group-item bg-dark ">
                                            <div class=" mx-1 row py-2  text-white">
                                                <div class="col-4">
                                                    Depot Name
                                                </div>
                                                <div class="col-lg-4 pl-md-5 col-md-5 text-center offset-lg-1">
                                                     Depot Manager Name
                                                </div>
                                                <div class="col-1   offset-1">
                                                       Delete
                                                </div>
                                            </div>
                                        </li>
                                     </ul>
                            </div>
                        `)
            $.get({
                url:'../api/v1/depot/allDepot'
            })
                .then((data)=>{
                    console.log(data.data)
                    let depot=data.data
                    let ManagerName

                    depot.forEach((depot)=>{
                        if(depot.users.length===0)
                        {
                            ManagerName='--'
                        }
                        else {
                            ManagerName=depot.users[0].userName
                        }
                        $('#dptList').append(`
                    <li href="#" class="list-group-item  px-3">
                    <div class="row">
                         <div class="px-3 offset-1 col-4">
                            ${depot.name}
                         </div>
                         <div class="px-3 offset-1 col-4">
                            ${ManagerName}
                         </div>
                         <div class="text-danger text-center" id="${depot.id}" onclick="deleteDepot(id)">
                         X
                         </div>
                    </div>
                    </li>`)
                    })
                }).catch((err)=>{
                console.log(err)
            })

        }
    })
    //some onclick functions
    window.deleteCollege=function(id){
        if(confirm(" Deletion of College may result in deletion of all data associated with it"))
        {
            $.ajax({
                url:`../api/v1/college/${id}`,
                type:'DELETE',
                body:{
                    id:id
                },
                success:function(data){
                    $('#clgList').empty()
                    let colleges=data.data
                    colleges.forEach((college)=>{
                        $('#clgList').append(`
                            <li href="#" class="list-group-item  px-3">
                            <div class="row">
                            <div class="px-3 offset-1 col-8">
                            ${college.name}
                            </div>
                            <div class="float-right text-danger" id="${college.id}" onclick="deleteCollege(id)">
                            X
                            </div>
                            </div>
                            </li>

                                `)
                    })
                },
                error:function(){
                    console.log("OOPS")
                }
            })
        }

    }
    window.deleteDepot=function(id){

        if(confirm("Deleting depot may result in deletion of all Depot manager and colleges associated with it"))
        {
            $.ajax({
                url:`../api/v1/depot/${id}`,
                type:'DELETE',
                body:{
                    id:id
                },
                success:function(data){
                    $('#dptList').empty()
                    let depot=data.data
                    depot.forEach((depot)=>{
                        let ManagerName
                        if(depot.users.length===0)
                        {
                            ManagerName='None'
                        }
                        else {
                            ManagerName=depot.users[0].userName
                        }
                        $('#dptList').append(`
                    <li href="#" class="list-group-item  px-3">
                    <div class="row">
                         <div class="px-3 offset-1 col-4">
                            ${depot.name}
                         </div>
                         <div class="px-3 offset-1 col-4">
                            ${ManagerName}
                         </div>
                         <div class="float-right text-danger" id="${depot.id}" onclick="deleteDepot(id)">
                         X
                         </div>
                    </div>
                    </li>
     
                    `)
                    })
                },
                error:function(){
                    console.log("OOPS")
                }
            })
        }
    }

})