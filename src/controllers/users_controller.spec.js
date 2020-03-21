// /* eslint-disable no-unused-expressions */
// /* eslint-disable node/no-unpublished-require */
// const { expect } = require("chai");
// const uuid = require("uuid/v4");
// const sinon = require("sinon");

// const { User } = require("../models");
// const { addNewUser } = require("./users_controller");

// describe("Controllers :: users", () => {
//   describe("#addNewUser", () => {
//     const id = uuid();

//     it("should return a new user", async () => {
//       // Given
//       const data = {
//         name: "JeSappelUser",
//         email: "jesappel@user.com",
//       };

//       const returnObject = {
//         id,
//         ...data,
//       };
//       // When
//       const createStub = sinon.stub(User, "create").returns(returnObject);
//       const createdObject = await addNewUser(data);

//       // Then
//       expect(createdObject).to.deep.equal(returnObject);
//       expect(createdObject).to.have.own.property("id");
//       expect(createStub.calledOnce).to.be.true;
//     });
//   });
// });
