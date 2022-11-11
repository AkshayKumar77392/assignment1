const userModel = require('../model/userModel')
const JWT = require("jsonwebtoken");

const isValid = function (value) {
    if (typeof value === "undefined" || !value ) return false
    if (typeof value !== "string" || value.trim().length === 0) return false
    return true
}

const createUser = async function (req, res) {
    try {
        let data = req.body
        const { name, subject, email, password } = data

        if (Object.keys(data).length < 1) { return res.status(400).send({ status:false, message: "Insert data :Bad request" }) }


        //name validation
        if (!isValid(name)) { return res.status(400).send({ status: false, message: "name is required and it must be string" }) }

        let fname = /^[a-zA-Z]{2,20}$/.test(name.trim())
        if (!fname) return res.status(400).send({ status: false, message: "enter valid name" })


        
       // subject validation
       if (!isValid(subject)) { return res.status(400).send({ status: false, message: "subject is required and it must be string" }) }

       let subject1 = /^(Mr|Mrs|Miss){0,3}$/.test(title.trim())
      if (!subject1) return res.status(400).send({ status: false, message: "enter valid subject" })


        //email validation
        if (!isValid(email)) { return res.status(400).send({ status: false, message: "email is required and it must be string" }) }

        let mail1 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.trim())
        if (!mail1) return res.status(400).send({ status: false, message: "enter valid mail" })
        let findUser = await userModel.find({ email: email })
        if (findUser.length !== 0) return res.status(400).send({ status: false, message: "Email is aleardy Exist" })

        //password validation
        if (!isValid(password)) { return res.status(400).send({ status: false, message: "password is required and it must be string" }) }

        let pass = /^[a-zA-Z0-9]{8,15}$/.test(password.trim())
        if (!pass) return res.status(400).send({ status: false, message: "enter valid password" })

       
       
       

        let saveUserData = await userModel.create(data)
        res.status(201).send({ status: true,message:"Success", data: saveUserData })
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}






const loginUser = async function (req, res) {
    try {
        let userName = req.body.email
        let password = req.body.password
        if(Object.keys(req.body)<1) return res.status(400).send({ status: false, message: "please enter email and password"});
        if (!userName) return res.status(400).send({ status: false, message: "user Name is required" });
        if (!password) return res.status(400).send({ status: false, message: "password is required" });
        const check = await userModel.findOne({ email: userName, password: password });
        if (!check) return res.status(401).send({ status: false, message: "userName or password is wrong" });
        let token = JWT.sign(
            {
                userId: check._id.toString(),
                iat: Math.floor(new Date() / 1000),
                exp: Math.floor(new Date() / 1000) +10*60*60 
            },
            "book-management"
        );
        res.setHeader("x-api-key", token);
        res.status(200).send({ status: true,message:"Success", data: token });
    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message });
    }
}

module.exports = { loginUser, createUser, isValid }

