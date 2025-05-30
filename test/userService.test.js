import { createUser } from "../src/backend/services/userService.js";
import * as bcrypt from "bcrypt";
import * as userModel from "../src/backend/models/userModel.js";
import * as validation from "../src/backend/utils/validation.js";
import { expect } from "chai";
import sinon from "sinon";

describe("createUser", () => {
  let findOneStub;

  beforeEach(() => {
    sinon.restore();
    findOneStub = sinon.stub(userModel, "userModel").get(() => ({
      findOne: sinon.stub()
    }));
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should resolve to undefined if username or password is missing", async () => {
    const result = await createUser({});
    expect(result).to.be.undefined;
  });

  it("should resolve to undefined if username is taken", async () => {
    const fakeUser = { username: "koos123", password: "123456", email: "koos@fakemail.com" };
    const findOne = sinon.stub().resolves(true);
    findOneStub.value.findOne = findOne;
    const result = await createUser(fakeUser);
    expect(result).to.be.undefined;
    expect(findOne.calledOnceWith({ username: "koos123" })).to.be.true;
  });
});