var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require('./User');

// CREATES A NEW USER
router.post('/register', function (req, res) {
    var user =  User.create({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        phone : req.body.phone,
        email : req.body.email,
        password : req.body.password
    }, 
    function (err, user) {
        if (err) return res.status(500).send("There was a problem adding the user information to the database.");
        res.status(200).send(user);
        console.log("post service// "+user)
    });
});

// LOGIN USER
router.post('/login', function (req, res) {
    var username = req.body.email
    User.findOne({ email: username }).then((err,user) => {
       
        if (!user) {
            res.send({status:"failure",message:"User is not valid"})
        }
        if (req.body.password != user.password) {
            res.send({status:"failure",message:"Password is not valid"})
        }
        else {
            res.send({status:"success",userId:user._id})
        }
    }
    )
})

module.exports = router;