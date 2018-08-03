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
        defaultValue:"admin"
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
    institute:{
        allowNull:false,
        type:dt.STRING
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
db.sync({
    //alter:true
    //force:true
}).then(()=>{
    console.log("dc sync")
})
module.exports={
    db,user,application
}