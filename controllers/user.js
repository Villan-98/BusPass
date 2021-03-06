const User = require("../db/models").user;
const depot = require("../db/models").depot;
const college = require("../db/models").college;
module.exports = {
  insert_user: async requery => {
    console.log(requery);
    if (requery.role === "Transport Head") {
      return User.create({
        userName: requery.name,
        password: requery.password,
        role: requery.role,
        clgDep: requery.collDep,
        collegeId: requery.collDep
      });
    } else {
      return User.create({
        userName: requery.name,
        password: requery.password,
        role: requery.role,
        clgDep: requery.collDep,
        DepotId: requery.collDep
      })
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
  }
};
