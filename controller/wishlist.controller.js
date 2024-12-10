const { createPagination } = require("../lib/pagination");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const postWishlist = async ({ req, res, user_id }) => {
  const { name, target_date, target_nominal } = req.body;
  try {
    const result = await prisma.wishlist.create({
      data: {
        target_date,
        target_nominal,
        name,
        user_id,
      },
    });
    return res.status(201).json({ message: "Succes create wishlist", result });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error.message || "Server error" });
  }
};

const putWishlist = async ({ req, res, wishlist_id, user_id }) => {
  const { name, target_date, target_nomina } = req.body;
  try {
    const result = await prisma.wishlist.update({
      data: {
        name,
        target_date,
        target_nomina,
        user_id,
      },
      where: {
        id: wishlist_id,
      },
    });
    return res.status(201).json({ message: "Succes update wishlist", result });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error.message || "Server error" });
  }
};

const deleteWishlist = async ({ res, wishlist_id }) => {
  try {
    const result = await prisma.wishlist.delete({
      where: {
        id: wishlist_id,
      },
    });
    return res.status(201).json({ message: "Succes delete wishlist", result });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ message: error.message || "Server error" });
  }
};

const getWishlistDetail = async ({ req, res, wishlist_id }) => {
  try {
    const result = await prisma.wishlist.findUnique({
      where: {
        id: wishlist_id,
      },
      select: {
        id: true,
        name: true,
        target_date: true,
        created_at: true,
        target_nominal: true,
      },
    });
    return res.status(201).json({ message: "Succes get wishlist", result });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error.message || "Server error" });
  }
};
const getWishlist = async ({ req, res, user_id }) => {
  const { page = 1, per_page = 10, program_id } = req.query;
  const skip = (page - 1) * per_page;

  try {
    const count = await prisma.wishlist.count({ where: filter });
    const pagination = createPagination({ page, per_page, total_data: count });
    const result = await prisma.wishlist.findMany({
      skip,
      take: Number(per_page),
      orderBy: {
        created_at: "desc",
      },
      where: {
        user_id,
      },
      select: {
        id: true,
        name: true,
        target_date: true,
        created_at: true,
        target_nominal: true,
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
  postWishlist,
  putWishlist,
  deleteWishlist,
  getWishlistDetail,
  getWishlist,
};
