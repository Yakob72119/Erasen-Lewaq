const User = require('./../models/userModel');
const Educator = require('./../models/educatorModel');
const Student = require('./../models/studentModel');

const md5 = require("md5");

const login = (req, res) => {
  const email = req.body.email;
  const password = md5(req.body.password);

  User.findOne({ email: email })
    .then(foundUser => {
      if (foundUser) {
        if (foundUser.password === password) {
          const role = foundUser.role;
          const fname = foundUser.fname;
          const _id = foundUser._id;
          const department=foundUser.department;
          req.session.isAuthenticated = true; // Set isAuthenticated flag to true
          req.session.user = {
            email: email,
            fname:fname,
            role: role,
            _id: _id,
            department: department 
          };
          console.log('Session:', req.session.user); 
          res.status(200).json({ success: true, role: role, fname: fname, _id: _id, department: department });
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
  req.session.isAuthenticated = false;
  req.session.destroy();
  res.send('Logged out');
};

const getUsers = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 15;
    const role = req.query.role;

    let query = {};
    if (role && role.toLowerCase() !== 'all') {
      query = { role: role };
    }

    const users = await User.find(query)
                            .limit(limit)
                            .skip((page - 1) * limit);

    const totalCount = await User.countDocuments(query);

    res.json({ users, totalCount });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin already exists with this email' });
    }

    const user = new User({
      email: email,
      fname: name,
      password: md5(password),
      role: role
    });

    await user.save();
    res.status(201).json({ message: 'Admin registered successfully!' });
  } catch (error) {
    console.error('Error registering admin:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteUser = async (req, res) => {
  try {
      const userId = req.params.userId;

      // Delete user from User collection
      await User.findByIdAndDelete(userId);

      // Delete user references from Educator and Student collections
    await Educator.findOneAndDelete({ user: userId });
    await Student.findOneAndDelete({ user: userId });

      res.status(200).json({ message: 'User and associated references deleted successfully' });
  } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'An error occurred while deleting user' });
  }
};




module.exports={
  login,
  logout,
  getUsers,
  registerAdmin,
  deleteUser
};
