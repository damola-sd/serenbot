const saveToDB = require("./savetoDB");
const { db } = require("./db");

const sampleDataCorrect = {
  user_id: "U0304M0BT36",
  user_name: "damola",
  hobby: "Football",
  mood: "Sleep",
};

const sampleDataWrong = {
  user_id: "U0304M0BT36",
  user_name: "damola",
  football: "Football",
  mood: "Sleep",
};

afterAll(async () => await db.close());

describe("Save to DB", () => {
  it("Should successfully save to db", () => {
    return saveToDB(sampleDataCorrect).then((res) => {
      expect(res).toBe(
        `${sampleDataCorrect.user_name}'s responses saved to the DB`
      );
    });
  });

  it("Should fail to save to db", () => {
    return saveToDB(sampleDataWrong).then((res) => {
      expect(res.errors[0]).toBe("hobby is a required field");
    });
  });
});
