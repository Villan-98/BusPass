const Sequelize=require('sequelize')
const dt=Sequelize.DataTypes
const dbconfig=require('../config').DB
const db=new Sequelize(dbconfig.NAME,dbconfig.USER,dbconfig.PASSWORD,{
    dialect:'mysql'
})
const user=db.define('user',{
    id:{
        allowNull:false,
        type:dt.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
   userName:{
            allowNull:false,
            type:dt.STRING
        },
    password:{
        allowNull:false,
        type:dt.STRING
    },
    role:{
        allowNull:false,
        type:dt.STRING,
    },
    clgDep:{
        allowNull:false,
        type:dt.STRING,
    }
})
const depot=db.define('Depot',{
    id:{
        allowNull:false,
        type:dt.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        primaryKey:true,
        allowNULL:false,
        type:dt.STRING
    }
})
const college=db.define('college',{
    id:{
        type:dt.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        allowNULL:false,
        type:dt.STRING
    }
})
const application=db.define('application',{
    id:{
        allowNull:false,
        type:dt.STRING,
        primaryKey:true,
    },
    name:{
        allowNull:false,
        type:dt.STRING
    },
    age:{
        allowNull:false,
        type:dt.INTEGER
    },
    address:{
        allowNull:false,
        type:dt.STRING
    },
    fatherName: {
        allowNull: false,
        type: dt.STRING
    },
    passCategory:{
        allowNull:false,
        type:dt.STRING,
        defaultValue:"student"
    },
    course:{
        allowNull:false,
        type:dt.STRING
    },
    year:{
        allowNull:false,
        type:dt.STRING
    },
    email:{
        allowNull:false,
        type:dt.STRING
    },
    status:{
        allowNull:false,
        type:dt.STRING,
        defaultValue:"Pending"
    },
    idCard:{
        allowNull:false,
        type:dt.STRING,
    },
    feeReceipt:{
        allowNull:false,
        type:dt.STRING
    },
    paymentSs:{
        allowNull:false,
        type:dt.STRING
    }
})
//college.hasMany(user)
application.belongsTo(college)
depot.hasMany(user)
depot.hasMany(college)
college.belongsTo(depot)
user.belongsTo(depot)
user.belongsTo(college)
college.hasMany(user)
db.sync({
    alter:true
   // force:true
}).then(()=>{
    console.log("db sync")
})
module.exports={
    db,user,application,depot,college
}