const promotions = require("../models/promotions.model");

module.exports = {
  getAll: (req, res) => {
    promotions.getAll((err, result) => {
      if (err) {
        console.error("Lỗi khi lấy promotions:", err);
        return res.status(500).send("Lỗi server khi lấy {tablename.ToLower()}!");
      }
      console.log("promotions:", result);
      res.json(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    promotions.getById(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi lấy promotions theo ID:", err);
        return res.status(500).send("Lỗi server khi lấy {tablename.ToLower()} theo ID!");
      }
      if (result.length === 0) {
        return res.status(404).send("Không tìm thấy promotions với ID: " + id);
      }
      res.json(result);
    });
  },

  insert: (req, res) => {
    const promotionsData = req.body;
    promotions.insert(promotionsData, (err, result) => {
      if (err) {
        console.error("Lỗi khi thêm promotions:", err);
        return res.status(500).send("Lỗi server khi thêm {tablename.ToLower()}!");
      }
      return res.status(200).json({
        message: `Admin với user_id ${promotions.user_id} đã được thêm thành công.`,
        promotionsdt: promotionsData
      });
    });
  },

  update: (req, res) => {
    const promotionsData = req.body;
    const id = req.params.id;
    promotions.update(id, promotionsData, (err, result) => {
      if (err) {
        console.error("Lỗi khi cập nhật promotions:", err);
        return res.status(500).send("Lỗi server khi cập nhật {tablename.ToLower()}!");
      }
      return res.status(200).json({
        message: `Admin với ID ${id}} đã được cập nhật thành công.`,
      });
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    promotions.delete(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi xóa promotions:", err);
        return res.status(500).send("Lỗi server khi xóa {id.ToLower()}!");
      }
    });
  },

};
