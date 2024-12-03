const { createPagination } = require("../lib/pagination");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const postNews = async ({ req, res }) => {
  const { date, description, thumbnail_img_id, program_id } = req.body;
  try {
    const result = await prisma.news.create({
      data: {
        thumbnail_img_id,
        description,
        date,
        program_id,
      },
    });
    return res.status(201).json({ message: "Berhasil buat news", result });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error.message || "Server error" });
  }
};

const putNews = async ({ req, res, news_id }) => {
  const { date, description, thumbnail_img_id, program_id } = req.body;
  try {
    const result = await prisma.news.update({
      data: {
        thumbnail_img_id,
        description,
        date,
        program_id,
      },
      where: {
        id: news_id,
      },
    });
    return res.status(201).json({ message: "Berhasil buat news", result });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: error.message || "Server error" });
  }
};

const deleteNews = async ({ res, news_id }) => {
  try {
    console.log({ news_id });

    const result = await prisma.news.delete({
      where: {
        id: news_id,
      },
    });
    return res.status(201).json({ message: "Berhasil buat news", result });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ message: error.message || "Server error" });
  }
};
const getNews = async ({ req, res }) => {
  const { page = 1, per_page = 10, program_id } = req.query;
  const skip = (page - 1) * per_page;
  let filter = {};

  if (program_id) filter.program_id = program_id;
  try {
    const count = await prisma.news.count({ where: filter });
    const pagination = createPagination({ page, per_page, total_data: count });
    const result = await prisma.news.findMany({
      skip,
      take: Number(per_page),
      orderBy: {
        date: "desc",
      },
      where: filter,
      select: {
        id: true,
        date: true,
        description: true,
        thumbnail: true,
        program_id: true,
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
  getNews,
  postNews,
  putNews,
  deleteNews,
};
