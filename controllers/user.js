const User = require("../db/models").user;
const depot = require("../db/models").depot;
const college = require("../db/models").college;
module.exports = {
  insert_user: async requery => {
    console.log(requery);
    if (requery.role === "Transport Head") {
      User.create({
        userName: requery.name,
        password: requery.password,
        role: requery.role,
        clgDep: requery.collDep,
        collegeId: requery.collDep
      });
    } else {
      User.create({
        userName: requery.name,
        password: requery.password,
        role: requery.role,
        clgDep: requery.collDep,

        DepotId: requery.collDep
      });
    }
  },
  deleteUser: async requery => {
    return User.destroy({
      where: {
        id: requery.id
      }
    });
  },
  userByCat: async requery => {
    return User.findAll({
      where: {
        role: requery.user
      }
    });
  },
  allUser: async requery => {
    return User.findAll({
      include: [
        {
          model: depot,
          attributes: ["name"]
        },
        {
          model: college,
          attributes: ["name"]
        }
      ]
    });
  },
  editPassword: async requery => {
    console.log("===EDIT PASSWORD CONTROLLER===");
    console.log(requery);
    //   User.find({ where: { userName: requery.username } }).on("success", function(
    //     user
    //   ) {
    //     if (user) {
    //       user
    //         .update({
    //           password: requery.new_password
    //         })
    //         .success(function() {
    //           return "UPDATED";
    //         });
    //     }
    //   });

    User.update(
      {
        password: requery.new_password
      },
      {
        where: {
          userName: requery.username
        }
      }
    );
    return "UPDATED";
  }
};
