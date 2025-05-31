/**
 * Utility to validate a user's email address
 * @param {*} email - User email address
 */
const validateEmail = async (email) => {
    if (!email.includes("@") || !email.includes(".") || email.length == 0) {
        return false;
    }

    return true;
};

/**
 * Utility to validate the user's password
 * @param {*} password - User's password
 * @returns - True/False
 */
const validatePassword = async (password) => {
    if (password.length < 8 || password.length == 0) {
        return false;
    }

    return true
};

export { validateEmail, validatePassword };