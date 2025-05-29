import { createUser, loginUser, deleteUser } from "../backend/services/userService.js";
import bcrypt from 'bcrypt';
import { userModel } from "../backend/models/userModel.js";
import { validateEmail } from "../backend/utils/validation.js";

jest.mock('bcrypt');
jest.mock('../backend/models/userModel.js');
jest.mock('../backend/utils/validation.js');

describe('createUser', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should throw an error if username or password is missing', async () => {
        await expect(createUser({})).resolves.toBeUndefined();
    });

    it('should throw an error if username is taken', async () => {
        userModel.findOne.mockResolvedValue(true);
        const userData = { username: 'koos123', password: '123456', email: 'koos@fakemail.com' };

        await expect(createUser(userData)).resolves.toBeUndefined();
        expect(userModel.findOne).toHaveBeenCalledWith({ username: 'koos123' });
    });

});