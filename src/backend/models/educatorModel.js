import mongoose from 'mongoose';

const educatorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    institution: {
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
    },
    role: {
        type: String,
        required: true
    }
},
{
    collection: 'EDUCATOR'
});

const educatorModel = mongoose.model('EDUCATOR', educatorSchema);

export { educatorModel };