const product_attributes = require("../models/product_attributes.model");

module.exports = {
  getAll: (req, res) => {
    product_attributes.getAll((err, result) => {
      if (err) {
        console.error("Lỗi khi lấy product_attributes:", err);
        return res.status(500).send("Lỗi server khi lấy {tablename.ToLower()}!");
      }
      console.log("product_attributes:", result);
      res.json(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    product_attributes.getById(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi lấy product_attributes theo ID:", err);
        return res.status(500).send("Lỗi server khi lấy {tablename.ToLower()} theo ID!");
      }
      if (result.length === 0) {
        return res.status(404).send("Không tìm thấy product_attributes với ID: " + id);
      }
      res.json(result);
    });
  },

  insert: (req, res) => {
    const product_attributesData = req.body;
    product_attributes.insert(product_attributesData, (err, result) => {
      if (err) {
        console.error("Lỗi khi thêm product_attributes:", err);
        return res.status(500).send("Lỗi server khi thêm {tablename.ToLower()}!");
      }
      return res.status(200).json({
        message: `Admin với user_id ${product_attributes.user_id} đã được thêm thành công.`,
        product_attributesdt: product_attributesData
      });
    });
  },

  update: (req, res) => {
    const product_attributesData = req.body;
    const id = req.params.id;
    product_attributes.update(id, product_attributesData, (err, result) => {
      if (err) {
        console.error("Lỗi khi cập nhật product_attributes:", err);
        return res.status(500).send("Lỗi server khi cập nhật {tablename.ToLower()}!");
      }
      return res.status(200).json({
        message: `Admin với ID ${id}} đã được cập nhật thành công.`,
      });
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    product_attributes.delete(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi xóa product_attributes:", err);
        return res.status(500).send("Lỗi server khi xóa {id.ToLower()}!");
      }
    });
  },

};
