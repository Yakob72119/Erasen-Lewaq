const User = require('./../models/userModel');
const md5=require("md5");

const login = (req, res) => {
  const email = req.body.email;
  const password = md5(req.body.password);

  User.findOne({ email: email })
    .then(foundUser => {
      if (foundUser) {
        if (foundUser.password === password) {
          const role = foundUser.role;
          req.session.user = {
            email: email,
            role: role
          };
          res.status(200).json({ success: true, role: role });
        } else {
          res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
      } else {
        res.status(404).json({ success: false, message: 'User not found' });
      }
    })
    .catch(err => {
      console.error('Error logging in:', err);
      res.status(500).json({ success: false, message: 'Internal server error' });
    });
};

  
  
  const logout = (req, res) => {
    req.session.destroy();
    res.send('Logged out');
  };
  
  module.exports = {
    login,
    logout
  };
  