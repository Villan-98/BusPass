/* Created by Villan-98 on 22/08/2018*/

function UserDetails() {
  $.get({
    url: "../api/v1/user/allUser"
  }).then(data => {
    let users = data.data;
    //  console.log(users)
    $("#headDiv").show();

    $("#headDiv").removeClass("col-lg-9 col-lg-12");
    $("#headDiv").addClass("offset-lg-2 col-lg-9 col-md-12 mt-5");
    $("#topHeading")
      .empty()
      .append(`Registered User`);
    $("#forms").empty().append(`
                              <div class="row ">
                              <div class="col-lg-9 offset-lg-2">
                              <ul class="list-group " id="clgList">
                                  <li class="list-group-item bg-dark ">
                                      <div class=" mx-1 row py-2  text-white">
                                          <div class="pl-5 col-3 ">
                                              User Name
                                          </div>
                                          <div class="col-3 pl-md-3  text-center ">
                                              Role
                                          </div>
                                          <div class="col-2  ml-4 offset-1">
                                              College/Depot
                                          </div>
                                          
                                          <div class="col-2   offset-1">
                                              Delete User
                                          </div>
                                      </div>
                                  </li>
                              </ul>
                              </div>
                              <div>
                          <span class="  h6">
                          Filter
                              </span>
                              <ul class="list-group-item">
                                  <li class="list-group-item" id="radAll" onclick="filter(id)">
                                  All User
                                  </li>
                                  <li class="list-group-item"  id="radDepot" name="Depot Manager" onclick="filter(id)">
                                  Depot Manager
                                  </li>
                                  <li class="list-group-item"   id="radTrans" onclick="filter(id)">
                                  Transport Head
                                  </li>
                              </ul>
                          </div>
                          `);
    users.forEach(user => {
      //  console.log(user)
      if (user.userName != "admin") {
        let coll_dep;
        if (user.DepotId !== null) coll_dep = user.Depot.name;
        else if (user.collegeId !== null) coll_dep = user.college.name;
        else coll_dep = "admin";

        $("#clgList").append(`
                      <li href="#" class="list-group-item  px-3">
                      <div class="row">
                           <div class="px-3 offset-1 col-3">
                              ${user.userName}
                           </div>
                           <div class="px-3  col-3">
                              ${user.role}
                           </div>
                           <div class="px-3  col-3">
                         ${coll_dep}
                           </div>
                           
                           <div class="text-danger text-center" id="${
                             user.id
                           }" onclick="deleteUser(id)" >
                              X
                           </div>
                      </div>
                      </li>
  `);
      }
    });
  });
}

$(function() {
  // console.log("connected")
  const anchor = $("a");
  anchor.click(e => {
    const $navId = e.target.getAttribute("id");
    if ($navId === "navClgDetail") {
      $("#headDiv").show();

      $("#headDiv").removeClass("col-lg-9 offset-lg-2");
      $("#headDiv").addClass(" col-lg-12 col-md-12 mt-5");
      $("#topHeading")
        .empty()
        .append("Registered Colleges");
      $("#forms").empty().append(`
                            <div class="row ">
                                <div class="col-lg-12 ">
                                    <ul class="list-group " id="clgList">
                                        <li class="list-group-item bg-dark ">
                                            <div class=" mx-1 row py-2  text-white">
                                                <div class="col-3">
                                                    College Name
                                                </div>
                                                
                                                <div class="col-lg-3 ml-0 pl-md-5 col-md-5 text-center offset-lg-1">
                                                    Transport Head
                                                </div>
                                                <div class="col-lg-3 pl-md-5 col-md-5 text-center offset-lg-1">
                                                    Depot Name
                                                </div>
                                                <div class="col-1   offset-1">
                                                     Delete
                                                </div>  
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        `);
      $.get({
        url: "../api/v1/college/allColleges"
      })
        .then(data => {
          console.log("===DISPLAYING COLLEGES===");
          let colleges = data.data;
          console.log(colleges);
          colleges.forEach(college => {
            console.log(college);
            $("#clgList").append(`
                    <li href="#" class="list-group-item  px-3">
                    <div class="row">
                         <div class="px-3 offset-1 col-3">
                            ${college.name}
                         </div>
                         
                         <div class="px-3 offset-1 ml-0 col-3">
                            ${college.users[0].userName}
                         </div>
                         <div class="px-3 offset-1 col-3">
                            ${college.Depot.name}
                         </div>
                         <div class="text-danger text-center" id="${
                           college.id
                         }" onclick="deleteCollege(id)">
                         X
                         </div>
                    </div>
                    </li>`);
          });
        })
        .catch(err => {
          console.log(err);
        });
    }

    if ($navId === "navDptDetail") {
      $("#headDiv").show();
      $("#headDiv").removeClass("col-lg-9 col-lg-12");
      $("#headDiv").addClass("offset-lg-2 col-lg-8 col-md-12 mt-5");
      $("#topHeading")
        .empty()
        .append("Registered Depot");
      $("#forms").empty().append(`
                            <div class="row ">
                                <div class="col-lg-8 offset-lg-2">
                                     <ul class="list-group " id="dptList">
                                        <li class="list-group-item bg-dark ">
                                            <div class=" mx-1 row py-2  text-white">
                                                <div class="col-4">
                                                    Depot Name
                                                </div>
                                                <div class="col-lg-4 pl-md-5 col-md-5 text-center offset-lg-1">
                                                     Depot Manager Name
                                                </div>
                                                <div class="col-1   offset-1">
                                                       Delete
                                                </div>
                                            </div>
                                        </li>
                                     </ul>
                            </div>
                        `);
      $.get({
        url: "../api/v1/depot/allDepot"
      })
        .then(data => {
          console.log(data.data);
          let depot = data.data;
          let ManagerName;

          depot.forEach(depot => {
            console.log(depot);
            if (depot.users.length === 0) {
              ManagerName = "--";
            } else {
              ManagerName = depot.users[0].userName;
            }
            $("#dptList").append(`
                    <li href="#" class="list-group-item  px-3">
                    <div class="row">
                         <div class="px-3 offset-1 col-4">
                            ${depot.name}
                         </div>
                         <div class="px-3 offset-1 col-4">
                            ${ManagerName}
                         </div>
                         <div class="text-danger text-center" id="${
                           depot.id
                         }" onclick="deleteDepot(id)">
                         X
                         </div>
                    </div>
                    </li>`);
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
    if ($navId === "navUserDetail") {
      UserDetails();
    }
  });
  //some onclick functions
  window.filter = function(id) {
    let name;
    if (id === "radDepot") {
      name = "Depot Manager";

      console.log(name);
      $.get(`/api/v1/user?user=${name}`)
        .then(data => {
          makeList(data);
        })
        .catch(err => {
          console.log(err);
        });
    } else if (id === "radTrans") {
      name = "Transport Head";

      console.log(name);
      $.get(`/api/v1/user?user=${name}`)
        .then(data => {
          makeList(data);
        })
        .catch(err => {
          console.log(err);
        });
    } else if (id === "radAll") {
      $.get({
        url: "../api/v1/user/allUser"
      }).then(data => {
        makeList(data);
      });
    }
    let makeList = function(data) {
      users = data.data;
      $("#clgList").empty().append(` <li class="list-group-item bg-dark ">
                                    <div class=" mx-1 row py-2  text-white">
                                        <div class="pl-5 col-3 ">
                                            User Name
                                        </div>
                                        <div class="col-3 pl-md-3  text-center ">
                                            Role
                                        </div>
                                        <div class="col-2  ml-4 offset-1">
                                            College/Depot
                                        </div>
                                        
                                        <div class="col-2   offset-1">
                                            Delete User
                                        </div>
                                    </div>
                                </li>`);
      users.forEach(user => {
        $("#clgList").append(`<li href="#" class="list-group-item  px-3">
                    <div class="row">
                         <div class="px-3 offset-1 col-3">
                            ${user.userName}
                         </div>
                         <div class="px-3  col-3">
                            ${user.role}
                         </div>
                         <div class="px-3  col-3">
                            ${user.clgDep}
                         </div>
                         
                         <div class="text-danger text-center" id="${user.id}" >
                            X
                         </div>
                    </div>
                    </li>`);
      });
    };
  };
  window.deleteCollege = function(id) {
    if (
      confirm(
        " Deletion of College may result in deletion of all data associated with it"
      )
    ) {
      $.ajax({
        url: `../api/v1/college/${id}`,
        type: "DELETE",
        body: {
          id: id
        },
        success: function(data) {
          $("#clgList").empty();
          let colleges = data.data;
          colleges.forEach(college => {
            $("#clgList").append(`
                            <li href="#" class="list-group-item  px-3">
                            <div class="row">
                            <div class="px-3 offset-1 col-8">
                            ${college.name}
                            </div>
                            <div class="float-right text-danger" id="${
                              college.id
                            }" onclick="deleteCollege(id)">
                            X
                            </div>
                            </div>
                            </li>

                                `);
          });
        },
        error: function() {
          console.log("OOPS");
        }
      });
    }
  };
  window.deleteDepot = function(id) {
    if (
      confirm(
        "Deleting depot may result in deletion of all Depot manager and colleges associated with it"
      )
    ) {
      $.ajax({
        url: `../api/v1/depot/${id}`,
        type: "DELETE",
        body: {
          id: id
        },
        success: function(data) {
          $("#dptList").empty();
          let depot = data.data;
          depot.forEach(depot => {
            let ManagerName;
            if (depot.users.length === 0) {
              ManagerName = "None";
            } else {
              ManagerName = depot.users[0].userName;
            }
            $("#dptList").append(`
                    <li href="#" class="list-group-item  px-3">
                    <div class="row">
                         <div class="px-3 offset-1 col-4">
                            ${depot.name}
                         </div>
                         <div class="px-3 offset-1 col-4">
                            ${ManagerName}
                         </div>
                         <div class="float-right text-danger" id="${
                           depot.id
                         }" onclick="deleteDepot(id)">
                         X
                         </div>
                    </div>
                    </li>
     
                    `);
          });
        },
        error: function() {
          console.log("OOPS");
        }
      });
    }
  };
  window.deleteUser = function(id) {
    console.log("====DELETE USER FUNCTION====", id);
    if (
      confirm(
        "DELETING USER WILL PERMANENTLY DELETE ITS DATA. PLEASE CONFIRM. "
      )
    ) {
      $.ajax({
        url: `../api/v1/user/${id}`,
        type: "DELETE",
        body: {
          id: id
        },
        success: function(data) {
          UserDetails();
          console.log("SUCCESSFULLY DELETED.CHECK DB");
        },
        error: function() {
          console.log("OOPS");
          alert("User not deleted! Please try again!.");
        }
      });
    }
  };
});
