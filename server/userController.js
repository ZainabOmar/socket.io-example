var User = require ('./userModule.js');
var jwt = require('jwt-simple');
var Q = require('q');

module.exports.handleUsers = {
  signin : function(req, res) {

    var username = req.body.username;
    var password = req.body.password;

    User.findOne({username: username})
    .then(function (user) {
      if (!user) {
        res.status(404).json("user not found")
      } else {
        user.comparePasswords(password)
        .then(function (isMatch) {
          if (isMatch) {
            var token = jwt.encode(user, 'secret');
            res.json({token : token, userid : user._id,username:username });
          } else {
            res.json("password not matched")
          }
        });
      }
    });
  },

  signup: function(req, res) {

      var username = req.body.username;
      var password = req.body.password;
      var email = req.body.email;

    User.findOne({username: username})
    .exec(function (err, user) {
      if (user) {
        res.json('User already exist!');
      } else {
          return User.create({
            username: username,
            password: password,
            email:email
          }, function (err, newUser) {
              if(err){
                res.json(err);
              } else {
                var token = jwt.encode(user, 'secret');

                res.json({token : token , username : username}); 
              }     
           });
        }
    });
},

  // get user in data base
  getUsers: function(req, res) {
    User.find({}, function(err, users){
      if(err){
        res.json(err);
      } else {
        res.json(users);
      }
    });
  }
}