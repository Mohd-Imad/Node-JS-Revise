const express = require('express');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const Register = require('../model/Register');
const router = express.Router();

// Create user (registration) route
router.post("/users", async (req, res) => {
  try {
    const { fname, lname, mobile, email, password, confirm_password } = req.body;

    // Check if passwords match
    if (password !== confirm_password) {
      return res.status(400).send({ msg: "Passwords do not match" });
    }

    // Check if the user with the same email already exists
    const existingUser = await Register.findOne({ email });
    if (existingUser) {
      return res.status(409).send({ msg: "User with this email already exists" });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document
    const newUser = new Register({
      fname,
      lname,
      mobile,
      email,
      password: hashedPassword,
      confirm_password: hashedPassword // Save hashed password as confirm_password for simplicity (not necessary though)
    });

    // Save the new user to the database
    await newUser.save();

    //generating JWT
    const token = await newUser.generateAuthToken()
    console.log("the token part " + token);

    //adding token to cookie
    res.cookie("jwtCookie", token, {
        expires: new Date(Date.now() +6 * 360000),
        httpOnly: true
    })
    console.log(res.cookie);

    // Respond with success message and user data (if needed)
    res.status(201).send({ msg: "User created successfully", user: newUser });
  } catch (e) {
    // Handle any errors during the registration process
    res.status(500).send({ msg: "Registration error", error: e.message });
  }
});

// Get all users route
router.get("/users", async (req, res) => {
  try {
    const usersData = await Register.find();
    res.status(200).send(usersData);
  } catch (e) {
    res.status(500).send({ msg: "Error fetching users data", error: e.message });
  }
});

// Get single user route
router.get("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = await Register.findById(userId);
    if (!userData) {
      return res.status(404).send({ msg: "No User found for the given ID" });
    }
    res.status(200).send(userData);
  } catch (e) {
    res.status(500).send({ msg: "Error fetching user data", error: e.message });
  }
});

// Update user data route
router.patch("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updateUser = await Register.findByIdAndUpdate(userId, req.body, { new: true });
    res.status(200).send({ msg: "User data updated successfully", user: updateUser });
  } catch (e) {
    res.status(500).send({ msg: "Error updating user data", error: e.message });
  }
});

// Delete user route
router.delete("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await Register.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).send({ msg: "No user found with this ID" });
    }
    res.status(200).send({ msg: "User deleted successfully", deletedUser });
  } catch (e) {
    res.status(500).send({ msg: "Error deleting user", error: e.message });
  }
});

// Login route
router.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        console.log(email,password)

        // Find the user by email
        const user = await Register.findOne({ email });
        console.log(user.tokens)

        if (!user) {
            // User not found
            return res.status(404).send({ msg: "User not found" });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        console.log(isPasswordMatch)

    /*     if (!isPasswordMatch) {
            // Password doesn't match
            console.log("Invalid credentials")
            return res.status(401).send({ msg: "Invalid credentials" });
        } */

         // Generate JWT for the authenticated user
         const token = await user.generateAuthToken();

         // Add the token to the cookie
         res.cookie("jwtCookie", token, {
             expires: new Date(Date.now() + 360000),
             httpOnly: true
         });
 

        res.status(200).send({ msg: "Login successful", user, token });
    } catch (e) {
        res.status(500).send(e);
    }
});

//Secret page route
// Secret page route
router.get('/secret', auth, (req, res) => {
  try {
    // Check if the user data is available in the request (set by the auth middleware)
    if (!req.user) {
      return res.status(401).json({ msg: 'Unauthorized - User data not available' });
    }

    // Access the user data from req.user
    const userData = req.user;
    console.log(userData);

    // Check if the 'jwtCookie' cookie is available in the request (set by the auth middleware)
    if (!req.cookies.jwtCookie) {
      return res.status(401).json({ msg: 'Unauthorized - Cookie not available' });
    }

    // Access the 'jwtCookie' cookie value
    const jwtCookieValue = req.cookies.jwtCookie;
    console.log(`This is the value of the 'jwtCookie' cookie: ${jwtCookieValue}`);

    // Send a response with the user data and the 'jwtCookie' cookie value
    res.json({ user: userData, jwtCookieValue: jwtCookieValue });
  } catch (error) {
    // Handle any errors that may occur
    console.error('Error accessing secret page:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
});


// Logout route
router.post("/logout", async (req, res) => {
    try {
      // Clear the "jwtCookie" token cookie by setting it to an empty value and expiring it immediately
      res.cookie("jwtCookie", "", { expires: new Date(0), httpOnly: true });
      res.status(200).send({ msg: "Logout successful" });
    } catch (e) {
      res.status(500).send({ msg: "Logout error", error: e.message });
    }
  });


module.exports = router