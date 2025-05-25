/**
 * Utility to validate a user's email address
 * @param {*} email - User email address
 */
const validateEmail = async (email) => {
    if (!email.includes("@") || !email.includes(".")) {
        throw new Error('Email address format is incorrect');
    }
};

export { validateEmail };