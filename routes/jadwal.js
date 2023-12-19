const express = require("express");
const router = express.Router();
const db = require("../db");
router.get("/", (req, res) => {
  const query = `
    SELECT wbs, task_proyek, tenaga_ahli, durasi, tgl_mulai, tgl_selesai
    FROM jadwal
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Gagal mengambil data jadwal:", err);
      res.status(500).json({ error: "Gagal mengambil data jadwal" });
    } else if (result.length === 0) {
      res.status(404).json({ error: "Data jadwal tidak ditemukan" });
    } else {
      const dataJadwal = result;
      res.status(200).json(dataJadwal);
    }
  });
});

router.post("/", (req, res) => {
  const { wbs, task_proyek, tenaga_ahli, durasi, tgl_mulai, tgl_selesai } =
    req.body;
  const query = `
    INSERT INTO jadwal (wbs, task_proyek, tenaga_ahli, durasi, tgl_mulai, tgl_selesai)
    VALUES (?, ?, ?, ?, ?, ?)`;

  const values = [
    wbs,
    task_proyek,
    tenaga_ahli,
    durasi,
    tgl_mulai,
    tgl_selesai,
  ];

  db.query(query, values, (err) => {
    if (err) {
      res.status(500).json({ error: "Gagal menyimpan data jadwal" });
    } else {
      res.status(201).json({ message: "Data jadwal berhasil disimpan" });
    }
  });
});

router.delete("/:wbs", (req, res) => {
  const wbs = req.params.wbs;
  const query = `
        DELETE FROM jadwal
        WHERE wbs = ?
      `;

  db.query(query, [wbs], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Gagal menghapus data jadwal" });
    } else {
      res.status(200).json({
        message: `Data jadwal dengan kode WBS ${wbs} berhasil dihapus`,
      });
    }
  });
});

router.put("/:wbs", (req, res) => {
  const wbsToUpdate = req.params.wbs;
  const { task_proyek, tenaga_ahli, durasi, tgl_mulai, tgl_selesai } = req.body;

  const query = `
    UPDATE jadwal
    SET task_proyek = ?, tenaga_ahli = ?, durasi = ?, tgl_mulai = ?, tgl_selesai = ?
    WHERE wbs = ?`;

  const values = [
    task_proyek,
    tenaga_ahli,
    durasi,
    tgl_mulai,
    tgl_selesai,
    wbsToUpdate,
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Gagal mengubah data jadwal" });
    } else {
      res.status(200).json({ message: "Data jadwal berhasil diubah" });
    }
  });
});

module.exports = router;
