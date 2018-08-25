// created by Villan-98//

$(function(){
console.log("connected")
let anchor=$('a')
let forms=$('#forms')
/**some onclick function to be used by index.html**/
    anchor.click((e)=> {
        let aName = (e.target).getAttribute('id')
        if (aName === 'navAddClg' || aName === 'navAddDpt') {
            let  label='College'

            if(aName==='navAddDpt')
            {
                label = 'Depot'
            }
            $('#forms').empty().append(`
                                          <div class="row mt-5 bg-light">
                                          <div class="col-12 my-5">
                                            <h3 class="h3 py-2 text-white text-center bg-dark" ">Add ${label}</h3>
                                          
                                            </div>
                                           </div>
                                        <div class="row bg-light pb-3">
                                            <div class="col-5 offset-3">
                                            <div class="row">
                                                <div class="col">
                                                     <div class="form-group">
                                                        <label for="clgDept">Enter the ${label} Name</label>
                                                        <input type="text"class="form-control" id="clgDpt">
                                                      </div>
                                                </div>
                                             </div>
                                              <div class="row">
                                                <div class="col" id="divDpt4clg">
                                               
                                                </div>
                                              </div>  
                                            
                                            </div>
                                            
                                            <div class="col-12 text-center">
                                            <button class="btn btn-primary" id=${label} onclick="clickFun(id)">ADD</button>
                                            </div>
                                        </div>`)
            if (aName === 'navAddClg')
            {
                label = 'College'

                $.get('/api/v1/depot/allDepot')
                    .then((data)=>{
                        let depots=data.data;
                        console.log(depots)
                        $('#divDpt4clg').empty().append(`

                        <div class="form-group">
                            <label for="dpt4clg">Enter the Depot Name</label>
                            <select class="form-control" id="dpt4clg" name="dpt4clg"></select>
                         </div>
                        `)

                        let dpt4clg=$('#dpt4clg')
                        depots.forEach((depot)=>{
                            console.log(depot.name)     //no output on front end?
                            dpt4clg.append(`<option value="${depot.name}">${depot.name}</option>`)
                        })

                    })

            }


        }
        if(aName === 'navDepot'||aName==='navTransport')
        {
            let label,selectLabel
            if(aName==='navTransport')
            {
                label = 'Transport Head'
                selectLabel='College'
                $.get({
                    url:'../api/v1/college/allColleges'
                })
                    .then((collegeData)=>{
                        const colleges=collegeData.data
                        const $depot=$('#collDep')
                        colleges.forEach((college)=>{
                            $depot.append(`<option value="${college.name}">${college.name}</option>`)
                        })
                    }).catch((err)=>{
                    console.log(err)
                })
            }
            else if(aName==='navDepot')
            {
                label = 'Depot Manager'
                selectLabel="Depot"

                $.get({
                    url:'../api/v1/depot/allDepot'
                })
                    .then((depotData)=>{
                        const depots=depotData.data
                        const $depot=$('#collDep')
                        console.log($depot.html())
                        depots.forEach((depot)=>{
                            $depot.append(`<option value=${depot.id}>${depot.name}</option>`)
                        })
                    }).catch((err)=>{
                    console.log(err)
                })
            }
          $('#forms').empty().append(`
          <div class="row mt-5  ">
            <div class="col-10 offset-1 bg-light">
                <h2 class="h2 bg-dark text-white py-2 mb-3 ml-0  mt-0 text-center">Add ${label}</h2>
                <div class="form-row px-4">
                    <div class="col-md-5 pl-5">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" class="form-control" placeholder="Name" id="name" name="name" required>
                        </div>
                    </div>
                    <div class="col-md-5 offset-1 ">
                        <div class="form-group">
                            <label for="employeeId">Employee ID Number</label>
                            <input type="text" class="form-control" id="employeeId" placeholder="Employee Id(1111)" name="employeeId" required>
                        </div>
                    </div>
                </div>
                <div class="form-row px-4">
                    <div class="col-md-5 pl-5">
                        <div class="form-group">
                            <label for="Secret">Secret</label>
                            <input type="password" class="form-control" id="secret" placeholder="Secret" name="secret" required>
                        </div>
                    </div>
                    <div class="col-md-5 offset-1">
                        <div class="form-group">
                            <label for="dob">Date of Birth</label>
                            <input type="date" class="form-control" id="dob" name="dob" required>
                        </div>
                    </div>
                </div>
                <div class="form-row px-4">
                    <div class="col-md-5 pl-5">
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" id="password" name="password" placeholder="Password" required>
                        </div>
                    </div>
                    <div class="col-md-5 offset-1">
                        <div class="form-group">
                            <label for="cpassword">Confirm Password</label>
                            <input type="text" class="form-control" id="cpassword" name="cpassword" placeholder="Confirm password" required>
                        </div>
                    </div>
                </div>
                <div class="form-row px-4">
                    <div class="col-md-5 pl-5">
                        <div class="form-group">
                            <label for="role">Role</label>
                            <input type="text" class="form-control disabled" id="role" value="${label}" name="role" >
                        </div>
                    </div>
                    <div class="col-md-5 offset-1">
                        <div class="form-group">
                            
                            <label class="" for="collDep">Select ${selectLabel}</label>
                            <select class="form-control" id="collDep" name="collDep">
                                
                            </select>
                        </div>
                    </div>
                </div>

                <div class="form-row">
                    <div class="col-md-3 offset-5">
                        <div class="form-group">
                            <button id="${label}" onclick="clickFun(id)"class="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`)
        }

    })





    addUser=function(id)
    {
        let name=$('#name').val()
        let dob=$('#dob').val()
        let secret=$('#secret').val()
        let role=$('#role').val()
        let password=$('#password').val()
        let cpassword=$('#cpassword').val()
        let collDep=$('#collDep').val()
        if(!name||!dob||!secret||!role||!password||!cpassword||!collDep)
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
                    hideAfter:5000,
                    showHideTransition:"fade",
                    icon:"error",
                    position:"top-right",
                    stack:2
                })
                console.log(err)
            })
        }

    }
    addClgDpt=function(e){
        let clgDpt=$('#clgDpt').val()
        let subUrl
        let value={
            name:$('#clgDpt').val(),
            depot:$('#dpt4clg').val()
        }
        if(!clgDpt)
        {
            $.toast({
                textColor:"red",
                loaderBg:'#fc4f4f',
                text:"Invalid Value",
                hideAfter:5000,
                showHideTransition:"fade",
                icon:"error",
                position:"top-right",
                stack:2
            })
        }
        else {
            if(e==='College')
            {
                subUrl='college/addCollege'
                console.log(e)
            }
            else
            {
                subUrl='depot/addDepot'
            }
            console.log(clgDpt);
            $.ajax({
                url:`/api/v1/${subUrl}`,
                method:"POST",
                data:value,
                success:((data)=>{

                    forms.empty().append(`
                                            <div class="bg-light offset-2">

                                                    <div class="row mt-5 py-5">
                                                            <div class="col ">
                                                                <h2 class="h2 text-center text-success " > College/Depot Added</h2>
                                                            </div>
                                                    </div>
                                            </div>
                                        `)

                })

            }).fail(()=>{
                console.log("oopsss")
                $.toast({
                    textColor:"red",
                    loaderBg:'#fc4f4f',
                    text:"Invalid Value",
                    hideAfter:5000,
                    showHideTransition:"fade",
                    icon:"error",
                    position:"top-right",
                    stack:2
                })
            })
        }
    }
    window.clickFun=function(e){

        console.log("ih")
        let subUrl
        if(e==='College'||e==='Depot')
        {
            addClgDpt(e)
        }
        else if(e==='Transport Head'||e==='Depot Manager')
        {
            subUrl=''
            console.log(e);
            addUser(e)
        }
        else {
            console.log("Invalid Request")
        }

    }
})