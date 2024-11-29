const { createPagination } = require("../lib/pagination");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const postUser = async ({ req, res }) => {
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

const deleteUser = async ({ res, user_id }) => {
  try {
    const result = await prisma.user.delete({
      where: {
        id: user_id,
      },
    });
    return res.status(201).json({ message: "Berhasil hapus admin", result });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error.message || "Server error" });
  }
};
const getUser = async ({ req, res }) => {
  const { page = 1, per_page = 10 } = req.query;
  const skip = (page - 1) * per_page;

  try {
    const count = await prisma.user.count();
    const pagination = createPagination({ page, per_page, total_data: count });
    const result = await prisma.user.findMany({
      skip,
      take: Number(per_page),
      select: {
        id: true,
        user_name: true,
        email: true,
        is_super_admin: true,
      },
    });

    return res
      .status(200)
      .json({ message: "Success get user", result, pagination });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error.message || "Server error" });
  }
};

const getUserDetail = async ({ req, res, user_id }) => {
  try {
    const result = await prisma.user.findUnique({
      where: {
        id: user_id,
      },
      select: {
        id: true,
        user_name: true,
        email: true,
        is_super_admin: true,
      },
    });

    return res.status(200).json({ message: "Success get user", result });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error.message || "Server error" });
  }
};
module.exports = {
  getUser,
  postUser,
  deleteUser,
  getUserDetail,
};
