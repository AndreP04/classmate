import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        requiredd: true
    },
    grade: {
        type: Number
    }

});

const studentModel = mongoose.model('STUDENT', studentSchema);

export { studentModel };