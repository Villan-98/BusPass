$(function(){
    console.log("connect")
    let submit=$('#btnSubmit')
    let api='/api/v1'
    $.get('/api/v1/college/allColleges')
        .then((data)=>{
            console.log(data)
            let colleges=data.data
            colleges.forEach((college)=>{
                $('#institute').append(`<option value="${college.name}">${college.name}</option>`)
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    submit.click(function(){

        console.log("button clicked")
        let name=$('#name').val()
        let age=$('#age').val()
        let fatherName=$('#fatherName').val()
        let institute=$('#institute').val()
        let year=$('#year').val()
        let address=$('#address').val()
        let email=$('#email').val()
        let course=$('#course').val()
        let id=$('#id').val()
        let container=$('.container')
        if(!name||!institute||!course||!address||!email||!year||!fatherName||!age||!id)
        {
            console.log("invalid data")
            
        }
        else
        {

            let data={
                name:name,
                institute:institute,
                course:course,
                year:year,
                address:address,
                fatherName:fatherName,
                age:age,
                email:email,
                id:id
            }
            //console.log(data)
            console.log("btn clicked")
            $.ajax({

                url:"/api/v1/apply",
                type:"POST",
                data:data,
                success:function(data) {
                    console.log(data)
                    container.empty().append(`
<div class="bg-white offset-2">

    <div class="row mt-5 py-5">
        <div class="col ">
            <h3 class="h2 text-center text-success "> Application Submitted </h3>
            <h2 class="h3 text-center text-primary " > To check request status use your roll no.</h2>

        </div>
    </div>
</div>
                                            



                        `)

                },
                error:function(){
                    console.log("oopsfsdjfklsjfdsklj")
                }
            })
        }

    })
})