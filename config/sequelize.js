const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  database: "mahasiswav2",
  host: "localhost",
  username: "root",
  password: "",
  dialect: "mysql",
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("sequelize berhasil");
  } catch {
    console.log("error pak");
  }
})();

module.exports = sequelize;
