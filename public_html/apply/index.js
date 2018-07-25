$(function(){
    let submit=$('#btnSubmit')
    let api='/api/v1'

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
                success:function() {
                    console.log("data posted")

                }
            })
        }

    })
})