import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "Kayıt başarılı" });
  } catch (err) {
    res.status(400).json({ error: "Kayıt başarısız" });
  }
};

export const getMe = async (req, res) => {
  try {
    if (!req.user)
      return res.status(401).json({ error: "Kullanıcı bulunamadı" });
    res.json(req.user);
  } catch (err) {
    res.status(500).json({ error: "Kullanıcı bilgisi alınamadı" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "Kullanıcı bulunamadı" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Şifre yanlış" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Giriş başarısız" });
  }
};
