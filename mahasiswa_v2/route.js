const route = require("express").Router();
const Mahasiswa = require("./model");

route.post("/mahasiswaV2", async (req, res) => {
  const { nim, nama_lengkap, kelas, alamat } = req.body;

  try {
    await Mahasiswa.sync();
    const result = await Mahasiswa.create({
      nim,
      nama_lengkap,
      kelas,
      alamat,
    });
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send("Error pak: " + error.message);
  }
});

module.exports = route;
