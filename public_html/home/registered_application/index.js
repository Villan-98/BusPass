$(function(){
    console.log("connected")
    let url=window.location.href
    let temp_url=url.split('?')
    let id=temp_url[1];
    let outer_div=$('#outer_div')
    $.get('/api/v1/application/status?'+id).then((data)=>{
        data=data.data;
        console.log(data)
        outer_div.empty().append(`
        
                <div class="form-row">
                <div class="form-group col-lg-6  col-md-12">
                    <label >Name</label>
                    <input class="form-control" value="${data.name}">
                </div>
                <div class="form-group col-lg-6 col-md-12">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" id="email" name="email" value=${data.email}>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-lg-6 col-md-12">
                    <label for="fatherName">Father's Name</label>
                    <input type="text" class="form-control" id="fatherName" name="fatherName" value="${data.fatherName}" >
                </div>
                <div class="form-group col-lg-6 col-md-12">
                    <label for="age">Age</label>
                    <input type="number" class="form-control" name="age" id="age" value="${data.age}" >
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-12">
                    <label >Address</label>
                    <input type="text" class="form-control" value=${data.address}>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-lg-6 col-md-12">
                    <label >Course</label>
                    <label>${data.course}</label>
                </div>
                <div class="col-lg-6 col-md-12">
                    <label >Unique RollNo.</label>
                    <input  class="form-control" id="id" name="id"  value="${data.id}">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-lg-6 col-md-12">
                    <label for="year">Semester</label>
                    <input type="number" class="form-control" id="year" name="year" value=${data.year} >
                </div>
                <div class="form-group col-lg-6 col-md-12">
                    <label >Institute</label>
                    <input  class="form-control col-md-6" value=${data.collegeId}>

                    </input>
                </div>
            </div>
            <div class="form-row">

                <div class="col-lg-6 col-md-12">
                    <div class="form-group">
                        <img src="../../../public/assets/uploads/${data.paymentSs}">
                        <label for="payment">Uploaded the snapshot of payment made</label>
                      </div>
                </div>

            </div>
            <a href="/api/v1/application/pdf?id=${data.id}" class="btn btn-primary">Print</a>
        `)
    })
})