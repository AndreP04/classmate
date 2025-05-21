import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        require: true
    }
    
});

const userModel = mongoose.model('userModel', userSchema);