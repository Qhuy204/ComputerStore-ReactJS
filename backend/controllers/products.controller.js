const products = require("../models/products.model");

module.exports = {
  getAll: (req, res) => {
    products.getAll((err, result) => {
      if (err) {
        console.error("Lỗi khi lấy products:", err);
        return res.status(500).send("Lỗi server khi lấy {tablename.ToLower()}!");
      }
      console.log("products:", result);
      res.json(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    products.getById(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi lấy products theo ID:", err);
        return res.status(500).send("Lỗi server khi lấy {tablename.ToLower()} theo ID!");
      }
      if (result.length === 0) {
        return res.status(404).send("Không tìm thấy products với ID: " + id);
      }
      res.json(result);
    });
  },

  insert: (req, res) => {
    const productsData = req.body;
    products.insert(productsData, (err, result) => {
      if (err) {
        console.error("Lỗi khi thêm products:", err);
        return res.status(500).send("Lỗi server khi thêm {tablename.ToLower()}!");
      }
      return res.status(200).json({
        message: `Admin với user_id ${products.user_id} đã được thêm thành công.`,
        productsdt: productsData
      });
    });
  },

  update: (req, res) => {
    const productsData = req.body;
    const id = req.params.id;
    products.update(id, productsData, (err, result) => {
      if (err) {
        console.error("Lỗi khi cập nhật products:", err);
        return res.status(500).send("Lỗi server khi cập nhật {tablename.ToLower()}!");
      }
      return res.status(200).json({
        message: `Admin với ID ${id}} đã được cập nhật thành công.`,
      });
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    products.delete(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi xóa products:", err);
        return res.status(500).send("Lỗi server khi xóa {id.ToLower()}!");
      }
    });
  },

};
