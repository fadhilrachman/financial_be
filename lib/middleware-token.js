const jwt = require("jsonwebtoken");

// Middleware untuk verifikasi token
const verifyToken = (req, res, next) => {
  // Ambil token dari header Authorization
  const token = req.header("Authorization");

  // Jika token tidak ada, kirim respons 401 Unauthorized
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided." });
  }

  // Hapus prefix "Bearer " jika ada
  const tokenWithoutBearer = token.startsWith("Bearer ")
    ? token.slice(7)
    : token;

  // Verifikasi token
  jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token." });
    }

    // Simpan informasi pengguna yang sudah terdekode di req.user untuk digunakan di endpoint selanjutnya
    req.user = decoded;
    next(); // Lanjutkan ke handler berikutnya
  });
};

module.exports = verifyToken;
