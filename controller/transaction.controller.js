const { createPagination } = require("../lib/pagination");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const postTransaction = async ({ req, res }) => {
  const { count, type, category_id, wallet_id, description } = req.body;
  try {
    const result = await prisma.transaction.create({
      data: {
        count,
        type,
        category_id,
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

const putTransaction = async ({ req, res, transaction_id }) => {
  const { count, type, category_id, wallet_id, description } = req.body;
  try {
    const result = await prisma.transaction.update({
      data: {
        count,
        type,
        category_id,
        wallet_id,
        description,
      },
      where: {
        id: transaction_id,
      },
    });
    return res.status(201).json({ message: `Succes update ${type}`, result });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error.message || "Server error" });
  }
};

const deleteTransaction = async ({ res, transaction_id }) => {
  try {
    const result = await prisma.transaction.delete({
      where: {
        id: transaction_id,
      },
    });
    return res
      .status(201)
      .json({ message: `Succes delete ${result.type}`, result });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ message: error.message || "Server error" });
  }
};

const getTransactionDetail = async ({ req, res, transaction_id }) => {
  try {
    const result = await prisma.transaction.findUnique({
      where: {
        id: transaction_id,
      },
      select: {
        id: true,
        count: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        created_at: true,
        wallet: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return res.status(201).json({ message: "Succes get transaction", result });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error.message || "Server error" });
  }
};
const getTransaction = async ({ req, res, user_id }) => {
  const { page = 1, per_page = 10, category_id, wallet_id } = req.query;
  const skip = (page - 1) * per_page;
  let filter = {
    wallet: {
      user_id,
    },
  };

  if (category_id) filter.category_id = category_id;
  if (wallet_id) filter.wallet_id = wallet_id;
  try {
    const count = await prisma.transaction.count({ where: filter });
    const pagination = createPagination({ page, per_page, total_data: count });
    const result = await prisma.transaction.findMany({
      skip,
      take: Number(per_page),
      orderBy: {
        created_at: "desc",
      },
      where: filter,
      select: {
        id: true,
        count: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        wallet_id: true,
        created_at: true,
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
  postTransaction,
  putTransaction,
  deleteTransaction,
  getTransactionDetail,
  getTransaction,
};
