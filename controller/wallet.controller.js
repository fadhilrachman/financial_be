const { createPagination } = require("../lib/pagination");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const postWallet = async ({ req, res }) => {
  const { name, description, initial_balance } = req.body;
  try {
    const result = await prisma.wallet.create({
      data: {
        name,
        description,
        initial_balance,
      },
    });
    return res.status(201).json({ message: "Succes create wallet", result });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error.message || "Server error" });
  }
};

const putWallet = async ({ req, res, wallet_id }) => {
  const { name, description, initial_balance } = req.body;
  try {
    const result = await prisma.wallet.update({
      data: {
        initial_balance,
        description,
        name,
      },
      where: {
        id: wallet_id,
      },
    });
    return res.status(201).json({ message: "Succes update wallet", result });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error.message || "Server error" });
  }
};

const deleteWallet = async ({ res, wallet_id }) => {
  try {
    const result = await prisma.wallet.delete({
      where: {
        id: wallet_id,
      },
    });
    return res.status(201).json({ message: "Succes delete wallet", result });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ message: error.message || "Server error" });
  }
};

const getWalletDetail = async ({ req, res, wallet_id }) => {
  try {
    const result = await prisma.wallet.findUnique({
      where: {
        id: wallet_id,
      },
    });
    return res.status(201).json({ message: "Succes get wallet", result });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error.message || "Server error" });
  }
};
const getWallet = async ({ req, res }) => {
  const { page = 1, per_page = 10, program_id } = req.query;
  const skip = (page - 1) * per_page;
  let filter = {};

  if (program_id) filter.program_id = program_id;
  try {
    const count = await prisma.wallet.count({ where: filter });
    const pagination = createPagination({ page, per_page, total_data: count });
    const result = await prisma.wallet.findMany({
      skip,
      take: Number(per_page),
      orderBy: {
        c: "desc",
      },
      where: filter,
      select: {
        id: true,
        name: true,
        description: true,
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
  getWallet,
  postWallet,
  putWallet,
  deleteWallet,
  getWalletDetail,
};
