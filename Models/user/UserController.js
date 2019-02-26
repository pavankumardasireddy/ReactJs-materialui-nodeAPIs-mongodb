var express = require('express');
const array = require('./array.json')
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

router.post('/export', (req, res) => {
    
    var len = array.length;
    var dir = './files';

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    array.map((obj, key)=>{
        if(obj.verses) {
            let quote = obj.verses;
            /* eg1 starts */
            // var regex = /(\d(?:[-:]\d)?)/g;
            // var subst = '\n$1';
            // var result = quote.replace(regex, subst);
           /*ends */
            /* eg2starts*/
            //var result = quote.replace(/(?!^)\s*(\d+(?:[-:]\d+)?)/g, '\n$1');
            /*ends */

            /*working code */ 
            var result = quote.replace("\n", "\\n").replace(/\s([0-9])/g, '\n$1');
            fs.writeFile(`${dir}/1bible_${obj.link}_29.txt`, `${result}`, function(err, res1) {
                if(err) console.log('error', err);
                else {
                    len --;
                    if(len == 0){
                        res.send({status:"files exported successfully!"})
                    }                
                }    
            });
        }       
    })
});

module.exports = router;