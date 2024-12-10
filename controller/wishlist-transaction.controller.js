const { createPagination } = require("../lib/pagination");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const postWishlistTransaction = async ({ req, res }) => {
  const { count, type, description, wallet_id } = req.body;
  try {
    const result = await prisma.wishlistTransaction.create({
      data: {
        count,
        type,
        wallet_id,
        description,
      },
    });
    return res.status(201).json({ message: `Succes record ${type}`, result });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error.message || "Server error" });
  }
};

const getWishlistTransaction = async ({ req, res }) => {
  const { page = 1, per_page = 10, category_id, wallet_id } = req.query;

  try {
    const count = await prisma.wishlistTransaction.count({ where: filter });
    const pagination = createPagination({ page, per_page, total_data: count });
    const result = await prisma.wishlistTransaction.findMany({
      skip,
      take: Number(per_page),
      orderBy: {
        created_at: "desc",
      },
      select: {
        id: true,
        count: true,
        description: true,
        created_at: true,
        type: true,
        wallet: {
          select: {
            id: true,
            name: true,
          },
        },
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
  getWishlistTransaction,
  postWishlistTransaction,
};
