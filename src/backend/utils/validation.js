/**
 * Utility to validate a user's email address
 * @param {*} email - User email address
 */
const validateEmail = async (email) => {
    if (!email.includes("@") || !email.includes(".")) {
        return false;
    }

    return true;
};

export { validateEmail };