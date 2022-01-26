const monk = require("monk");
require("dotenv").config();

const db = monk.default(process.env.DB_URL ?? "");
const info = db.get("info");

module.exports = { info, db };
