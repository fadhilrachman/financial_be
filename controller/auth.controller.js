const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const postLogin = async ({ req, res }) => {
  const { password, email } = req.body;
  try {
    const checkCredenttial = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!checkCredenttial)
      return res.status(401).json({ message: "Login failed" });

    const checkPassword = await bcrypt.compare(
      password,
      checkCredenttial.password
    );

    if (!checkPassword) return res.status(403).json({ message: "Gagal login" });

    const token = await jwt.sign(checkCredenttial, process.env.JWT_KEY, {
      expiresIn: "28d",
    });
    return res.status(200).json({
      message: "Login sukses",
      result: {
        token,
      },
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error.message || "Server error" });
  }
};

const postRegister = async ({ req, res }) => {
  const { user_name, email, password, is_super_admin = false } = req.body;
  try {
    const checkDuplicateEmail = await prisma.user.findUnique({
      where: { email },
    });
    if (checkDuplicateEmail)
      return res.status(400).json({ message: "Email sudah dipakai" });
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await prisma.user.create({
      data: {
        password: hashedPassword,
        user_name,
        email,
        is_super_admin,
      },
    });
    return res.status(201).json({ message: "Berhasil buat admin", result });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error.message || "Server error" });
  }
};
module.exports = {
  postLogin,
  postRegister,
};
