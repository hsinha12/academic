const mongoose = require("mongoose");
const bcrypt=require("bcryptjs");
const regformschema = new mongoose.Schema({

    // userid: { type: String },
    // password: { type: String },
    firstname: { type: String },
    middlename: { type: String },
    lastname: { type: String },
    fathername: { type: String },
    entranceName: { type: String },
    rank: { type: Number },
    dateofbirth: { type: Date },
    address: { type: String },
    country: { type: String },
    email: { type: String },
    mobilenumber: { type: Number },
    Gender: { type: String },
    Degree: { type: String }
})
const signup = new mongoose.Schema({

    name: { type: String },
   
    email: { type: String },
    password: { type: String },
    cpassword: { type: String }

})

const studentSchema = new mongoose.Schema({

    deptname: { type: String },
    yrofadmsn: { type: Number },
    programme: { type: String },
    sem: { type: Number },
    regno: { type: String },
    fname: { type: String },
    lname: { type: String },
    email: { type: String },
    phone: { type: String },
    category: { type: String },
    amount: { type: Number },
    tno: { type: String },
    tdate: { type: Date },
    //fslip: { type:  Document}

})


//encrypting the password file
signup.pre("save", async function(next){

this.password= await bcrypt.hash(this.password,10);
next();

this.cpassword=undefined;

})



//now we need to create a collection

const studentInfo = new mongoose.model("studentInfo", regformschema);   //registered students collections
const signupInfo = new mongoose.model("signupInfo", signup);        //registered students credentials
const semRegInfo = new mongoose.model("semRegInfo", studentSchema);   //regitered students semester details collections
module.exports = { studentInfo, signupInfo, semRegInfo };

