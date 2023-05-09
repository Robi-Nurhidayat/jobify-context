const notFoundMiddleware = (req, res) =>
  res.status(404).send("Halaman tidak ditemukan");

export default notFoundMiddleware;
