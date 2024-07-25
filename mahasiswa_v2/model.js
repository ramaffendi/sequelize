const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = new Sequelize("sqlite::memory:");
const sequelize = require("../config/sequelize");

const Mahasiswa = sequelize.define("mahasiswa", {
  nim: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  nama_lengkap: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  kelas: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  alamat: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
{
  tableName: "mahasiswa",

})

module.exports = Mahasiswa;
