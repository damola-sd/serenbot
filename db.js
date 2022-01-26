const monk = require("monk");

const db = monk.default(process.env.DB_URL ?? "");
const info = db.get("info");

module.exports = info;
