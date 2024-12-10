const { createPagination } = require("../lib/pagination");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const postCategory = async ({ req, res }) => {
  const { name } = req.body;
  try {
    const result = await prisma.category.create({
      data: {
        name,
      },
    });
    return res.status(201).json({ message: "Succes create category", result });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error.message || "Server error" });
  }
};

const putCategory = async ({ req, res, category_id }) => {
  const { name } = req.body;
  try {
    const result = await prisma.category.update({
      data: {
        name,
      },
      where: {
        id: category_id,
      },
    });
    return res.status(201).json({ message: "Succes update category", result });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error.message || "Server error" });
  }
};

const getCategory = async ({ req, res }) => {
  const { page = 1, per_page = 10, program_id } = req.query;
  const skip = (page - 1) * per_page;

  try {
    const count = await prisma.wallet.count({ where: filter });
    const pagination = createPagination({ page, per_page, total_data: count });
    const result = await prisma.category.findMany({
      skip,
      take: Number(per_page),

      select: {
        id: true,
        name: true,
      },
    });

    return res
      .status(200)
      .json({ message: "Success get wallet", result, pagination });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error.message || "Server error" });
  }
};

module.exports = {
  getCategory,
  postCategory,
  putCategory,
};
