import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({

    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        required: true
    },
    grade: {
        type: Number
    }

});

const studentModel = mongoose.model('EDUCATOR', studentSchema);

export { studentModel };