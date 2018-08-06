// created by Villan-98//
$(function(){
    console.log("connected")
    let anchor=$('a')
    let forms=$('#forms')
    /**some onclick function to be used by index.html**/
    anchor.click((e)=>{
        let aName=(e.target).getAttribute('id')
        console.log(aName)
        let heading
        let selectOption
        if(aName==='navAddClgDpt')
        {
            $('#forms').empty().append(`
                                          <div class="row mt-5 bg-light">
                                          <div class="col-12 my-5">
                                            <h3 class="h3 py-2 text-white text-center bg-dark" ">Add Depot</h3>
                                          
                                            </div>
                                           </div>
                                        <div class="row bg-light pb-3">
                                            <div class="col-5 offset-3">
                                                <div class="form-group">
                                                <label for="clgDept">Enter the Depot Name</label>
                                                     <input type="text"class="form-control" id="clgDpt">
                                                </div>
                                            </div>
                                            <div class="col-12 text-center">
                                            <button class="btn btn-primary" id="addDptClg" onclick="xyz(id)">ADD</button>
</div>
                                        </div>`)

        }
        /*if(aName==='navDepot')
        {
            heading='<h2 class="h2 bg-dark text-white py-2 mb-3 px-0 mt-0 text-center">Add Depot Manger</h2>'
            selectOption=`
                            <label  for="collDep">Select Your Depot</label>
                            <select class="form-control" id="collDep" name="collDep">
                                                <option>Select Bus Depot</option>
                                                <option>Bawana</option>
                                                <option>Keshopur Depot</option>
                                                <option>Rohini Depot-2 </option>
                                                <option>Nangloi</option>
                                                <option>Peera Garhi</option>    
</select>`
        }
        if(aName==='navTransport')
        {
            heading='<h2 class="h2 bg-dark text-white py-2 mb-3 px-0 mt-0 text-center">Add transport Head</h2>'
            selectOption=`
                                        <label class="" for="collDep">Select Your College</label>
                                        <select class="form-control" id="collDep" name="collDep">
                                                <option>Select Your College</option>
                                                <option>Delhi Technologial University</option>
                                                <option>Netaji Subhas Institute of Technology</option>
                                                <option>Delhi Institute of Tool Engineering</option>
                                                </select>
                                                    `
        }
        abc.empty()
        if(aName==='navDepot'||aName==='navTransport')
        {
            abc.append(`<div class="row mt-5  bg-light">
                            <div class="col px-0">
                            ${heading}
                                <div class="form-row px-4">
                                       <div class="col-md-3">
                                            <div class="form-group">
                                                  <label for="name">Name</label>
                                                  <input type="text" class="form-control" placeholder="Name" id="name" name="name" required>
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label for="employeeId">Employee ID Number</label>
                                                <input type="text" class="form-control" id="employeeId" placeholder="Employee Id(11111)" name="employeeId" required>
                                            </div>
                                        </div>
                                </div>
                                <div class="form-row px-4">
                                       <div class="col-md-3">
                                            <div class="form-group">
                                                  <label for="Secret">Secret</label>
                                                  <input type="password" class="form-control" id="secret" placeholder="Secret" name="emailId" required>
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label for="dob">Date of Birth</label>
                                                <input type="date" class="form-control" id="dob" name="dob" required>
                                            </div>
                                        </div>
                                </div>
                                <div class="form-row px-4">
                                       <div class="col-md-3">
                                            <div class="form-group">
                                                  <label for="password">Password</label>
                                                  <input type="password" class="form-control" id="password" name="password" required>
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label for="cpassword">Confirm Password</label>
                                                <input type="text" class="form-control" id="cpassword" name="cpassword" required>
                                            </div>
                                        </div>
                                </div>
                                <div class="form-row px-4">
                                       <div class="col-md-3">
                                            <div class="form-group">
                                                  <label for="role">Role</label>
                                                  <input type="text" class="form-control" id="role" name="role" required>
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                ${selectOption}
                                            </div>
                                        </div>
                                </div> 
                                
            <div class="form-row">
                <div class="col-md-3 offset-5">
                    <div class="form-group">
                    <button id="submit" class="btn btn-primary">Submit</button>
                    </div>
                </div>
            </div>
                                 
                                
                            </div>
                         </div>`)

        }*/
    })
   /* let submit=$('#submit')
    forms.on('click',submit,(()=>{
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
            success:(data)=>{
                if(data)
                {
                    abc.empty().append(`
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
        })

    }))*/
    window.xyz=function(e){
        let depot=$('#clgDpt').val()
        console.log("ih")
        console.log(e)
        console.log(depot);
        $.ajax({
            url:'/api/v1/depot/addDepot',
            method:"POST",
            data:depot,
            success:((data)=>{
                console.log("yeh")
            })

        }).fail(()=>{
            console.log("oopsss")
        })
    }
})