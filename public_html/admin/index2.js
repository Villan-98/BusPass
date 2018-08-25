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
                    console.log(data.data)
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
    })
    //some onclick functions
    window.deleteCollege=function(id){
        $.ajax({
            url:`../api/v1/college/${id}`,
            type:'DELETE',
            body:{
                id:id
            },
            success:function(data){
                console.log(data.data)
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
            }
        })
    }

})