const express = require("express");
const app = express();
const port = 4000;
const bodyParser = require("body-parser");
const database = require("./connect");
const response = require("./response");
const mahasiswaV2 = require("./mahasiswa_v2/route");

app.use(bodyParser.json());
app.use("/apiv2", mahasiswaV2);

app.get("/", (req, res) => {
  response(200, "API V1 ready to go", "SUCCESS", res);
});

app.get("/mahasiswa", (req, res) => {
  const sql = `SELECT * FROM mahasiswa`;

  database.query(sql, (err, fields) => {
    if (err) throw err;
    response(200, fields, "find mahasiswa name", res);
  });
});

app.get("/mahasiswa/:nim", (req, res) => {
  const nim = req.params.nim;
  const sql = `SELECT * FROM mahasiswa WHERE nim = '${nim}'`;

  database.query(sql, (err, fields) => {
    if (err) throw err;
    response(200, fields, `find mahasiswa ${nim}`, res);
  });
});

app.post("/mahasiswa", (req, res) => {
  const { nim, namaLengkap, kelas, alamat } = req.body;

  const sql = `INSERT INTO mahasiswa (nim, nama_lengkap, kelas, alamat) VALUES 
  (${nim}, '${namaLengkap}', '${kelas}', '${alamat}')`;

  database.query(sql, (err, fields) => {
    if (err) response(500, "invalid", "error cuy", res);
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        id: fields.insertId,
      };
      response(200, data, "Data add success", res);
    }
  });
});

app.put("/mahasiswa", (req, res) => {
  const { nim, namaLengkap, kelas, alamat } = req.body;
  const sql = `UPDATE mahasiswa SET nama_lengkap = '${namaLengkap}', kelas = '${kelas}',
  alamat = '${alamat}' WHERE nim = '${nim}'`;

  database.query(sql, (err, fields) => {
    if (err) response(500, "Gagal", "error", err);
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        message: fields.message,
      };
      response(200, data, " UPDATE DATA SUCCESS", res);
    } else {
      response(500, "user not found", "TIDAK ADA DATA", res);
    }
  });
});

app.delete("/mahasiswa", (req, res) => {
  const { nim } = req.body;
  const sql = `DELETE FROM mahasiswa WHERE nim = ${nim}`;
  database.query(sql, (err, fields) => {
    if (err) response(500, "invalid", "error", res);

    if (fields?.affectedRows) {
      const data = {
        isDeleted: fields.affectedRows,
      };
      response(200, data, "delete sukses", res);
    } else {
      response(404, "user tidak ada", "error", res);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
