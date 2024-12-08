const { createPagination } = require("../lib/pagination");

require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const Midtrans = require("midtrans-client");

const snap = new Midtrans.Snap({
  serverKey: "SB-Mid-server-lsZOhr116-vSzAtP7EIKOXwJ",
  clientKey: "SB-Mid-client-czgI8ZHcPpqKvGVY",
  isProduction: false,
});
const postDonation = async ({ req, res, program_id }) => {
  const { user_name, phone, message, is_hide_name, donation } = req.body;
  let parameterMidtrans = {
    transaction_details: {
      order_id: "test-transaction-6",
      gross_amount: donation,
    },
  };

  try {
    const payload = {
      user_name: is_hide_name ? "Seseorang" : user_name,
      phone,
      message,
      program_id,
      donation,
    };

    const token = await snap.createTransactionToken(parameterMidtrans);
    // const result = await prisma.donation.create({ data: payload });
    return res.status(201).json({ message: "Berhasil kirim donasi", token });
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
      orderBy: { created_at: "desc" },
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
