// Assuming this is in your server/index.js or similar file

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/Employee'); // Assuming Employee is the User model
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/User_Registration', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    // Example implementation to find a user by email and password
    User.findOne({ email, password })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            // Replace this with appropriate authentication logic
            if (user.password === password) {
                res.json("success");
            } else {
                res.status(400).json({
                    message: "Incorrect password"
                });
            }
        })
        .catch(error => {
            console.error("Error during login:", error);
            res.status(500).json({
                message: "Something went wrong"
            });
        });
});

// Start the server
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
