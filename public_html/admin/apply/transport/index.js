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
            $.toast({
                textColor:"red",
                loaderBg:'#fc4f4f',
                heading:"Warning",
                text:"All fields are mandatory",
                bgColor:"warning",
                hideAfter:5000,
                showHideTransition:"fade",
                icon:"error",
                position:"top-right",           /*position is not accurate*/
                stack:2
            })
        }
        else if(password!==cpassword)
        {
             $.toast({
                 textColor:"red",
                 loaderBg:'#fc4f4f',
                 heading:"Warning",
                 text:"Password and Confirm Password must be same",
                 bgColor:"warning",
                 hideAfter:5000,
                 showHideTransition:"fade",
                 icon:"error",
                 position:"top-right",
                 stack:2
                })
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
                console.log(err)
                $.toast({
                    textColor:"red",
                    loaderBg:'#fc4f4f',
                    heading:"Warning",
                    text:"Cannot add the user right now",
                    bgColor:"warning",
                    hideAfter:5000,
                    showHideTransition:"fade",
                    icon:"error",
                    position:"top-right",
                    stack:2
                })
                console.log(err)
            })
        }

    })
})
