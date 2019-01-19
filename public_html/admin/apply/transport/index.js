$(function(){
    let forms=$('#forms')
    let submit=$('#submit')
    submit.click(()=>{
        let name=$('#name').val()
        let dob=$('#dob').val()
        let secret=$('#secret').val()
        let role=$('#role').val()
        let password=$('#password').val()
        let cpassword=$('#cpassword').val()
        let collDep=$('#collDep').val()
        if(!name||!dob||!secret||!role||!password||!role||!cpassword||!collDep)
        {
            console.log("please fill all the attribute")
        }
        else if(password!==cpassword)
        {
            console.log("confirm password and password must be same")
        }
        else {
            let value={
                name:name,
                dob:dob,
                secret:secret,
                role:role,
                password:password,
                collDep:collDep
            }
            $.ajax({
                type:"POST",
                url:"/api/v1/admin/addUser",
                data:value,
                success:(data)=> {
                        console.log("useradded")
                        forms.empty().append(`
                                            <div class="bg-light offset-2">

                                                    <div class="row mt-5 py-5">
                                                            <div class="col ">
                                                                <h2 class="h2 text-center text-success " > User Added</h2>
                                                            </div>
                                                    </div>
                                            </div>
                                        `)
                }
            }).fail((err)=>{
                console.log("Oops something went wrong: ")
                console.log(err)

            })
        }

    })
})
