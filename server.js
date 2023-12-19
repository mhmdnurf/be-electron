const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");
const jadwalEndpoint = require("./routes/jadwal");
const anggaranEndpoint = require("./routes/anggaran");

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.use("/api/jadwal", jadwalEndpoint);
app.use("/api/anggaran", anggaranEndpoint);

db.connect((err) => {
  if (err) {
    console.error("Error koneksi ke database:", err);
  } else {
    console.log("Terhubung ke database MySQL");
  }
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
