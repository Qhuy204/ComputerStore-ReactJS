const product_promotions = require("../models/product_promotions.model");

module.exports = {
  getAll: (req, res) => {
    product_promotions.getAll((err, result) => {
      if (err) {
        console.error("Lỗi khi lấy product_promotions:", err);
        return res.status(500).send("Lỗi server khi lấy {tablename.ToLower()}!");
      }
      console.log("product_promotions:", result);
      res.json(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    product_promotions.getById(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi lấy product_promotions theo ID:", err);
        return res.status(500).send("Lỗi server khi lấy {tablename.ToLower()} theo ID!");
      }
      if (result.length === 0) {
        return res.status(404).send("Không tìm thấy product_promotions với ID: " + id);
      }
      res.json(result);
    });
  },

  insert: (req, res) => {
    const product_promotionsData = req.body;
    product_promotions.insert(product_promotionsData, (err, result) => {
      if (err) {
        console.error("Lỗi khi thêm product_promotions:", err);
        return res.status(500).send("Lỗi server khi thêm {tablename.ToLower()}!");
      }
      return res.status(200).json({
        message: `Admin với user_id ${product_promotions.user_id} đã được thêm thành công.`,
        product_promotionsdt: product_promotionsData
      });
    });
  },

  update: (req, res) => {
    const product_promotionsData = req.body;
    const id = req.params.id;
    product_promotions.update(id, product_promotionsData, (err, result) => {
      if (err) {
        console.error("Lỗi khi cập nhật product_promotions:", err);
        return res.status(500).send("Lỗi server khi cập nhật {tablename.ToLower()}!");
      }
      return res.status(200).json({
        message: `Admin với ID ${id}} đã được cập nhật thành công.`,
      });
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    product_promotions.delete(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi xóa product_promotions:", err);
        return res.status(500).send("Lỗi server khi xóa {id.ToLower()}!");
      }
    });
  },

};
