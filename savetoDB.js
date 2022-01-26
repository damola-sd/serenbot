const db = require("./db");
const yup = require("yup");

const responseSchema = yup.object().shape({
  user_id: yup.string().required().trim(),
  user_name: yup.string().required().trim(),
  mood: yup.string().required(),
  hobby: yup.string().required(),
});

// function that saves responses to Db
const saveToDB = async (data) => {
  try {
    await responseSchema.validate(data);
    const saved = await db.info.insert(data);
    if (saved) {
      return `${data.user_name}'s responses saved to the DB`;
    }
  } catch (error) {
    return error;
  }
};

module.exports = saveToDB;
