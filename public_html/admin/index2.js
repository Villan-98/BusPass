$(function(){
    console.log("connected")
    const anchor=$('a')
    anchor.click((e)=>{
        const $navId=e.target.getAttribute('id')
        if($navId==='navClgDetail')
        {
            $('#headDiv').addClass('offset-2 col-8 mt-5')
            $('#topHeading').empty().append('Registered Colleges')
            $('#forms').empty().append(`
                            <div class="row">
                            <div class="col-8 offset-2">
                            
                            <ul class="list-group " id="clgList">
                            
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
                         <div class="px-3 offset-1 col-8">
                            ${college.name}
                         </div>
                         <div class="float-right text-danger" id="${college.id}" onclick="deleteCollege(id)">
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