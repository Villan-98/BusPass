$(function(){
    let submit=$('#submit')
    let forms=$('#forms')
    submit.click(()=>{
        console.log("submit")
        let name=$('#name').val()
        let dob=$('#dob').val()
        let secret=$('#secret').val()
        let role=$('#role').val()
        let password=$('#password').val()
        let cpassword=$('#cpassword').val()
        let collDep=$('#collDep').val()
        if(!name||!dob||!secret||!role||!password||!role||!cpassword||!collDep)
        {
            console.log("blank data are not allowed")
        }
        else{
            if(password!==cpassword)
            {
                console.log("password is not correct")
            }
        }
        let value={
            name:name,
            dob:dob,
            secret:secret,
            role:role,
            password:password,
            collDep:collDep
        }
        console.log(value)
        $.ajax({
            type:"POST",
            url:"/auth/signup",
            data:value,
            success:(data)=> {
                if (data) {
                    forms.empty().append(`
                                            <div class="bg-white offset-2">

                                                    <div class="row mt-5 py-5">
                                                            <div class="col ">
                                                                <h2 class="h2 text-center text-primary " > User Added</h2>
                                                            </div>
                                                    </div>
                                            </div>
                                        `)
                }
            }
        }) })
})
