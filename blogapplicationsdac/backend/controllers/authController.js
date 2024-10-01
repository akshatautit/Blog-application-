const User = require("../models/userModel"); // Assuming you have a Blog model



exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        console.log("exist")
        return res.status(400).json({ message: "already exist" });
    }
    const newUser = new User({ name, email, password });
    await newUser.save(); // Save the new blog
    res.status(201).json(newUser);
    console.log(name, email, password);
  } catch (error) {
    console.error(error);
  }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" }); // Provide a message for the response
        }

        // Compare the provided password with the stored hashed password
        const isMatch = password === user.password
        
        if (isMatch) {
            console.log("Login successful");
            return res.status(200).json({ message: "Login successful", user: { id: user._id, name: user.name, email: user.email } }); // Send a success response
        } else {
            console.log("Incorrect password");
            return res.status(401).json({ message: "Incorrect password" }); // Send an unauthorized response
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" }); // Handle server errors
    }
};