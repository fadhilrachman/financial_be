const { createPagination } = require("../lib/pagination");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export const postUser = async ({ req, res }) => {
  const { user_name, email, password, is_super_admin = false } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, process.env.SALT_ROUND);

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

export const deleteUser = async ({ res, user_id }) => {
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
export const getUser = async ({ req, res }) => {
  const { page = 1, per_page = 10 } = req.queryParams;
  const skip = (page - 1) * per_page;

  try {
    const count = await prisma.user.count();
    const pagination = createPagination({ page, per_page, total_data: count });
    const result = await prisma.user.findMany({
      skip,
      take: per_page,
    });

    return res
      .status(200)
      .json({ message: "Success get user", result, pagination });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error.message || "Server error" });
  }
};
