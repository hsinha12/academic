const express = require('express');
const path = require("path");
//const { isNull } = require('util');
const bcrypt=require("bcryptjs");
const app = express();
const assert = require('assert');
require("./db/conn");
const { studentInfo, semRegInfo, signupInfo } = require("./modules/schema");


const port = process.env.PORT||4000;

const static_path = path.join(__dirname, "../public");
app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//console.log(path.join(__dirname,"../public"))
app.use(express.static(static_path));
app.get("/", (req, res) => {
    res.send("Success");
    // res.render("index");
    //return res.redirect("index.html");
})
   
app.get("/login",(req,res)=>
{
    // console.log( db.collection('studentinfo').find());
  
    semRegInfo.find({},function(err, docs) {
        
        res.render('index', {
            infoList: docs
        })
    })
   
})

app.post("/studentreg", async (req, res) => {
    try {
        const email = req.body.email;
        //console.log(`${email}`);
        const useremail = await studentInfo.findOne({ email: email });
        if (useremail == null) {
            const user = new studentInfo(req.body);

            console.log("Record Inserted Successfully");
            //res.send("Success")
            await user.save();
            return res.redirect("index.html");

        }
        else {
            res.send('Student is already Exist');
        }

    } catch (error) {
        res.status(400), send(error);

    }
})
app.post("/signup", async (req, res) => {
    try {
        const email = req.body.email;
        //console.log(`${email}`);
        const useremail = await studentInfo.findOne({ email: email });
        const useremail2 = await signupInfo.findOne({ email: email });
        //console.log(useremail);
        if (useremail) {
            //const useremail2 = semRegInfo.findOne({ email: email });
            //console.log(useremail2);
            if (useremail2) {
                res.send("User already have an account");

            }
            else {
                const user = new signupInfo(req.body);

                console.log("SignUp Successfull");
                //res.send("Success")
                await user.save();
                return res.redirect("index.html");

            }


        }
        else {
            res.send('Student not Exist');
        }

    } catch (error) {
        res.status(400). send(error);

    }
})
app.post("/studentlogin", async (req, res) => {

    try {
        const email = req.body.username;
        const password = req.body.password;
        //console.log(`${username}`);
        //console.log(`${password}`);
        const usernamee = await signupInfo.findOne({ email: email });
          const isMatch= await bcrypt.compare(password,usernamee.password);
          if(isMatch)
          {
            //const user = new signupInfo(req.body);

            console.log("login Successfull");
            //res.send("Success")
            //await user.save()
            return res.redirect("semReg.html");

        }
        else {
             return res.send("INVALID PASSWORD");
            // return res.redirect("student_login.html");
        }


    } catch (error) {
        res.status(400).send("not registered invalid id");

    }
})
app.post("/register", async (req, res) => {

    try {
        //console.log(req.body.deptname);
        //const email = req.body.email;
        //const registered = semRegInfo.findOne({ email: email });
       // if (registered) {
       //     res.send("Already Registered");
       // }
       // else {
            const p = new semRegInfo(req.body);

            console.log("Record Inserted Successfully");
            //res.send("Success")
            await p.save();
            return res.redirect("index.html");

        //}


    } catch (error) {
        res.status(400).send(error);

    }
})

app.listen(port, () => {
    console.log(`app is running on port ${port}`);

})