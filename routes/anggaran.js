const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  const query = `
    SELECT *
    FROM anggaran
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Gagal mengambil data anggaran:", err);
      res.status(500).json({ error: "Gagal mengambil data anggaran" });
    } else if (result.length === 0) {
      res.status(404).json({ error: "Data anggaran tidak ditemukan" });
    } else {
      const dataAnggaran = result;
      res.status(200).json(dataAnggaran);
    }
  });
});

router.post("/", (req, res) => {
  const { id, kategori, nama_item, harga, waktu, total_harga, keterangan } =
    req.body;
  const query = `
    INSERT INTO anggaran (id, kategori, nama_item, harga, waktu, total_harga, keterangan)
    VALUES (?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    id,
    kategori,
    nama_item,
    harga,
    waktu,
    total_harga,
    keterangan,
  ];

  db.query(query, values, (err) => {
    if (err) {
      res
        .status(500)
        .json({ error: "Gagal menyimpan data anggaran", values: values });
    } else {
      res.status(201).json({ message: "Data anggaran berhasil disimpan" });
    }
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const query = `
        DELETE FROM anggaran
        WHERE id = ?
      `;

  db.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Gagal menghapus data jadwal" });
    } else {
      res.status(200).json({
        message: `Data jadwal dengan ID ${id} berhasil dihapus`,
      });
    }
  });
});

router.put("/:id", (req, res) => {
  const idToUpdate = req.params.id;
  const { kategori, nama_item, harga, waktu, total_harga, keterangan } =
    req.body;

  const query = `
    UPDATE anggaran
    SET kategori = ?, nama_item = ?, harga = ?, waktu = ?, total_harga = ?, keterangan = ?
    WHERE id = ?`;

  const values = [
    kategori,
    nama_item,
    harga,
    waktu,
    total_harga,
    keterangan,
    idToUpdate,
  ];

  db.query(query, values, (err) => {
    if (err) {
      res.status(500).json({ error: "Gagal mengubah data anggaran" });
    } else {
      res.status(200).json({ message: "Data anggaran berhasil diubah" });
    }
  });
});

module.exports = router;
