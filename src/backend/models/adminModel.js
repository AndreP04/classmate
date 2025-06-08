import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
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
    institutionType: {
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
    collection: 'ADMIN'
});

const adminModel = mongoose.model('ADMIN', adminSchema);

export { adminModel };