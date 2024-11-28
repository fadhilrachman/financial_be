const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export const postDonation = async ({ req, res, program_id }) => {
  const { user_name, phone, message, is_hide_name } = req.body;
  try {
    const payload = {
      user_name: is_hide_name ? "Seseorang" : user_name,
      phone,
      message,
    };

    const result = await prisma.donation.create({ data: payload });
    res.status(200).json({ message: "Success send donation", result });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error: error.message || "Server error" });
  }
};

export const getDonation = async ({ res, res }) => {
  try {
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error: error.message || "Server error" });
  }
};
