const { createPagination } = require("../lib/pagination");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const moment = require("moment");
const getTransactionCount = async ({ req, res, user_id }) => {
  try {
    const { year, month, wallet_id } = req.query;

    // Validasi input
    if (!year || !month) {
      return res.status(400).json({
        message: "Tolong sertakan 'year' dan 'month' di query params.",
      });
    }

    const yearInt = parseInt(year, 10);
    const monthInt = parseInt(month, 10);

    if (monthInt < 1 || monthInt > 12) {
      return res.status(400).json({
        message: "Bulan harus di antara 1 dan 12.",
      });
    }

    const startOfMonth = moment(`${yearInt}-${monthInt}`, "YYYY-MM")
      .startOf("month")
      .toDate();
    const endOfMonth = moment(startOfMonth).endOf("month").toDate();

    const [incomeSum, expenseSum, incomeSumAll, expenseSumAll] =
      await Promise.all([
        prisma.transaction.aggregate({
          _sum: {
            count: true,
          },
          where: {
            type: "income",
            wallet_id,
            date: {
              gte: startOfMonth,
              lte: endOfMonth,
            },
          },
        }),
        prisma.transaction.aggregate({
          _sum: {
            count: true,
          },
          where: {
            type: "expense",
            wallet_id,
            date: {
              gte: startOfMonth,
              lte: endOfMonth,
            },
          },
        }),
        prisma.transaction.aggregate({
          _sum: {
            count: true,
          },
          where: {
            type: "income",
            wallet_id,
          },
        }),
        prisma.transaction.aggregate({
          _sum: {
            count: true,
          },
          where: {
            type: "expense",
            wallet_id,
          },
        }),
      ]);

    // Response
    return res.status(200).json({
      result: {
        income: incomeSum._sum.count || 0, // Default 0 jika tidak ada hasil
        expense: expenseSum._sum.count || 0, // Default 0 jika tidak ada hasil
        money_total:
          expenseSumAll._sum.count || 0 - incomeSumAll._sum.count || 0,
      },
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error.message || "Server error" });
  }
};
const postTransaction = async ({ req, res }) => {
  const { count, type, category_id, date, description, wallet_id } = req.body;
  try {
    const result = await prisma.transaction.create({
      data: {
        count: Number(count),
        type,
        category_id,
        date,
        description,
        wallet_id,
      },
    });
    return res.status(201).json({ message: `Succes record ${type}`, result });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error.message || "Server error" });
  }
};

const putTransaction = async ({ req, res, transaction_id }) => {
  const { count, type, category_id, date, description } = req.body;
  try {
    const result = await prisma.transaction.update({
      data: {
        count: Number(count),
        type,
        category_id,
        date,
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
        date: true,
        description: true,
        type: true,
        category: {
          select: {
            id: true,
            name: true,
            icon: true,
          },
        },
        wallet: {
          select: {
            id: true,
            name: true,
          },
        },
        // wallet_id: true,

        created_at: true,
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
        date: "desc",
      },
      where: filter,
      select: {
        id: true,
        count: true,
        date: true,
        description: true,
        type: true,
        category: {
          select: {
            id: true,
            name: true,
            icon: true,
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
  getTransactionCount,
};
