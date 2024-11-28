const { createPagination } = require("../lib/pagination");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export const postProgram = async ({ req, res }) => {
  const {
    name,
    thumbnail_img_id,
    target_nominal,
    target_date_donation,
    is_not_target_donaion,
    description,
  } = req.body;
  try {
    const result = await prisma.program.create({
      data: {
        name,
        thumbnail_img_id,
        target_nominal,
        target_date_donation,
        is_not_target_donaion,
        description,
      },
    });
    return res.status(201).json({ message: "Berhasil buat program", result });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error.message || "Server error" });
  }
};

export const putProgram = async ({ req, res, program_id }) => {
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

export const deleteProgram = async ({ res, program_id }) => {
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
export const getProgram = async ({ res, res }) => {
  const { page = 1, per_page = 10, program_id } = req.queryParams;
  const skip = (page - 1) * per_page;

  try {
    const count = await prisma.program.count();
    const pagination = createPagination({ page, per_page, total_data: count });
    const result = await prisma.program.findMany({
      skip,
      take: per_page,
    });

    return res
      .status(200)
      .json({ message: "Success get donation", result, pagination });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error.message || "Server error" });
  }
};
