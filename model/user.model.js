import mongoose from "mongoose";

// Define the User Schema
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Create a User model based on the User Schema
var User = mongoose.model('User', UserSchema);

// Export the User model
export { User };
