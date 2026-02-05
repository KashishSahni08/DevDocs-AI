const express = require('express');
const Model = require('../models/UserModel');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const router = express.Router();

const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, city } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const existingUser = await Model.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new Model({
      name,
      email,
      city,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed" });
  }
});



//getall
router.get('/getall' ,(req, res) => {
    Model.find()
    .then((result) =>{
        res.status(200).json(result);
    })
    .catch((err) =>{
        console.log(err);
        res.status(500).json(err);    
    });
});

router.get('/getbyemail/:email', (req, res) =>{
 Model.findOne({email: req.params.email}) // email is field in UserModel
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});  

//getbyid
router.get('/getbyid/:id', (req, res) =>{
  // Model.findOne({_id: req.params.id})
 Model.findById(req.params.id)    // id is field in UserModel
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});    

router.delete('/delete/:id', (req, res) => {
     Model.findByIdAndDelete(req.params.id)   
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/update/:id', (req, res) => {
     Model.findByIdAndUpdate(req.params.id, req.body, { new: true })   
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

                                                                                                           
router.post("/authenticate", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Model.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { _id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ token,
      user:{
        _id:user._id,
        name:user.name,
        email:user.email,
        picture:user.picture,
      },

    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Authentication failed" });
  }
});
router.post("/google-auth", async (req, res) => {
  try {
    const { email, name, picture } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    let user = await Model.findOne({ email });

    if (!user) {
      user = new Model({
        name,
        email,
        picture,
        provider: "google",
      });

      await user.save();
    }

    const token = jwt.sign(
      { _id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });

  } catch (err) {
    console.error("Google auth error:", err);
    res.status(500).json({ message: "Google authentication failed" });
  }
});



module.exports = router;    