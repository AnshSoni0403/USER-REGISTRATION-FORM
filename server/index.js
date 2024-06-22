const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/Employee'); // Adjust based on your model structure
const app = express();

app.use(express.json());
app.use(cors());

// mongoose.connect('mongodb+srv://anshsoni0403:Ansh@0403@user-registration-form.7ytqayd.mongodb.net/User_Registration', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })

mongoose.connect('mongodb+srv://anshsoni0403:Ansh%400403@user-registration-form.7ytqayd.mongodb.net/User_Registration?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

mongoose.connection.on('error', err => {
    console.error('MongoDB connection error:', err);
});

app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    user.save()
        .then(() => res.status(201).json(user))
        .catch((error) => res.status(400).json(error));
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    // Find the user by email and password
    User.findOne({ email, password })
        .then(user => {
            // If user not found
            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            // If user is found
            res.status(200).json({
                message: "User found",
                user
            });
        })
        .catch(error => {
            // Handle any error that occurs during the query
            console.error("Error during login:", error);
            res.status(500).json({
                message: "Something went wrong"
            });
        });
});

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
