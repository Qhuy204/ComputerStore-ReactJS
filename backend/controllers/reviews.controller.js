const reviews = require("../models/reviews.model");

module.exports = {
  getAll: (req, res) => {
    reviews.getAll((err, result) => {
      if (err) {
        console.error("Lỗi khi lấy reviews:", err);
        return res.status(500).send("Lỗi server khi lấy {tablename.ToLower()}!");
      }
      console.log("reviews:", result);
      res.json(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    reviews.getById(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi lấy reviews theo ID:", err);
        return res.status(500).send("Lỗi server khi lấy {tablename.ToLower()} theo ID!");
      }
      if (result.length === 0) {
        return res.status(404).send("Không tìm thấy reviews với ID: " + id);
      }
      res.json(result);
    });
  },

  insert: (req, res) => {
    const reviewsData = req.body;
    reviews.insert(reviewsData, (err, result) => {
      if (err) {
        console.error("Lỗi khi thêm reviews:", err);
        return res.status(500).send("Lỗi server khi thêm {tablename.ToLower()}!");
      }
      return res.status(200).json({
        message: `Admin với user_id ${reviews.user_id} đã được thêm thành công.`,
        reviewsdt: reviewsData
      });
    });
  },

  update: (req, res) => {
    const reviewsData = req.body;
    const id = req.params.id;
    reviews.update(id, reviewsData, (err, result) => {
      if (err) {
        console.error("Lỗi khi cập nhật reviews:", err);
        return res.status(500).send("Lỗi server khi cập nhật {tablename.ToLower()}!");
      }
      return res.status(200).json({
        message: `Admin với ID ${id}} đã được cập nhật thành công.`,
      });
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    reviews.delete(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi xóa reviews:", err);
        return res.status(500).send("Lỗi server khi xóa {id.ToLower()}!");
      }
    });
  },

};
