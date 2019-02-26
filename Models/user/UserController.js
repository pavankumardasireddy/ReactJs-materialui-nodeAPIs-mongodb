var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var fs = require('fs');
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

router.post('/export', function (req, res) {
    const array = [
        { value: 'Received', label: 'Received' },
        { value: 'In Progress', label: 'In Progress' },
        { value: 'Responded', label: 'Responded' },
        { value: 'Closed', label: 'Closed' }
    ]
    var len = array.length;
    
    array.map((obj, key)=>{
        fs.writeFile(`file${key}.txt`, JSON.stringify(obj, null, 2), function(err, result) {
            if(err) {
                console.log('error', err);
            } else {
                len --;
                if(len == 0){
                    res.send({status:"exported"})
                }                
            }    
        });
    })
    
})

module.exports = router;