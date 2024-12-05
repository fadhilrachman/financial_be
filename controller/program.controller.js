const { createPagination } = require("../lib/pagination");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const postProgram = async ({ req, res }) => {
  const {
    name,
    thumbnail_img_id,
    target_nominal,
    target_date_donation,
    is_not_target_donaion,
    description,
    is_not_target_date_donation,
  } = req.body;
  console.log({
    name,
    thumbnail_img_id,
    target_nominal,
    target_date_donation,
    is_not_target_donaion,
    description,
    is_not_target_date_donation,
  });

  try {
    const result = await prisma.program.create({
      data: {
        name,
        thumbnail_img_id,
        target_nominal: Number(target_nominal),
        target_date_donation,
        is_not_target_donaion,
        description,
        is_not_target_date_donation,
      },
    });
    return res.status(201).json({ message: "Berhasil buat program", result });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error.message || "Server error" });
  }
};

const putProgram = async ({ req, res, program_id }) => {
  const {
    name,
    thumbnail_img_id,
    target_nominal,
    target_date_donation,
    is_not_target_donaion,
    description,
  } = req.body;
  try {
    const result = await prisma.program.update({
      data: {
        name,
        thumbnail_img_id,
        target_nominal,
        target_date_donation,
        is_not_target_donaion,
        description,
      },
      where: {
        id: program_id,
      },
    });
    return res.status(201).json({ message: "Berhasil buat program", result });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error.message || "Server error" });
  }
};

const deleteProgram = async ({ res, program_id }) => {
  try {
    const result = await prisma.program.update({
      data: {
        deleted_at: new Date(),
      },
      where: {
        id: program_id,
      },
    });
    return res.status(201).json({ message: "Berhasil buat program", result });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error.message || "Server error" });
  }
};
const getProgram = async ({ req, res }) => {
  const { page = 1, per_page = 10, program_id } = req.query;
  const skip = (page - 1) * per_page;

  try {
    const count = await prisma.program.count();
    const pagination = createPagination({ page, per_page, total_data: count });
    const result = await prisma.program.findMany({
      skip,
      take: Number(per_page),
      include: {
        thumbnail: true,
        donation: {
          select: {
            donation: true,
          },
        },
      },
    });

    const finallyResult = result.map((val) => {
      const {
        id,
        name,
        target_nominal,
        thumbnail,
        description,
        is_not_target_donaion,
        target_date_donation,
        donation,
      } = val;
      let totalDonation = 0;

      donation.forEach((val) => {
        totalDonation += val.donation;
      });

      return {
        id,
        name,
        target_nominal,
        thumbnail,
        description,
        is_not_target_donaion,
        target_date_donation,
        total_donation: totalDonation,
      };
    });

    return res.status(200).json({
      message: "Success get donation",
      result: finallyResult,
      pagination,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error.message || "Server error" });
  }
};

const getProgramDetail = async ({ req, res, program_id }) => {
  try {
    const result = await prisma.program.findUnique({
      where: {
        id: program_id,
      },
      include: {
        thumbnail: true,
        donation: true,
      },
    });

    const {
      id,
      name,
      target_nominal,
      thumbnail,
      description,
      is_not_target_donaion,
      target_date_donation,
      donation,
    } = result;
    let totalDonation = 0;

    donation.forEach((val) => {
      totalDonation += val.donation;
    });

    const finallyResult = {
      id,
      name,
      target_nominal,
      thumbnail,
      description,
      is_not_target_donaion,
      target_date_donation,
      donation,
      total_donation: totalDonation,
    };

    return res
      .status(200)
      .json({ message: "Success get donation", result: finallyResult });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error.message || "Server error" });
  }
};

module.exports = {
  getProgramDetail,
  getProgram,
  postProgram,
  putProgram,
  deleteProgram,
};
