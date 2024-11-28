const { createPagination } = require("../lib/pagination");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const postDonation = async ({ req, res, program_id }) => {
  const { user_name, phone, message, is_hide_name } = req.body;
  try {
    const payload = {
      user_name: is_hide_name ? "Seseorang" : user_name,
      phone,
      message,
      program_id,
    };

    const result = await prisma.donation.create({ data: payload });
    return res.status(201).json({ message: "Berhasil kirim donasi", result });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error.message || "Server error" });
  }
};

const getDonation = async ({ req, res }) => {
  const { page = 1, per_page = 10, program_id } = req.query;
  const skip = (page - 1) * per_page;

  try {
    const count = await prisma.donation.count({ where: { program_id } });
    const pagination = createPagination({ page, per_page, total_data: count });
    const result = await prisma.donation.findMany({
      skip,
      take: Number(per_page),
      where: {
        program_id,
      },
    });

    return res
      .status(200)
      .json({ message: "Success get donation", result, pagination });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error.message || "Server error" });
  }
};

module.exports = {
  getDonation,
  postDonation,
};
