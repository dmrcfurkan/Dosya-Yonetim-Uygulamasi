import File from "../models/File.js";
import fs from "fs";
import path from "path";

export const uploadFile = async (req, res) => {
  try {
    const file = new File({
      filename: req.file.filename,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      userId: req.user._id,
    });

    await file.save();
    res.status(201).json({ message: "Dosya yüklendi", file });
  } catch (err) {
    res.status(500).json({ error: "Yükleme hatası" });
  }
};

export const listFiles = async (req, res) => {
  try {
    const files = await File.find({ userId: req.user.id }).sort({
      uploadDate: -1,
    });
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: "Listeleme hatası" });
  }
};

export const deleteFile = async (req, res) => {
  try {
    const file = await File.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!file) return res.status(404).json({ error: "Dosya bulunamadı" });

    const filePath = path.join("uploads", file.filename);
    fs.unlinkSync(filePath); 

    await File.deleteOne({ _id: req.params.id });
    res.json({ message: "Dosya silindi" });
  } catch (err) {
    res.status(500).json({ error: "Silme hatası" });
  }
};
