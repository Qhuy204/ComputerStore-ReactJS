const admins = require("../models/admins.model");

module.exports = {
  getAll: (req, res) => {
    admins.getAll((err, result) => {
      if (err) {
        console.error("Lỗi khi lấy admins:", err);
        return res.status(500).send("Lỗi server khi lấy {tablename.ToLower()}!");
      }
      console.log("admins:", result);
      res.json(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    admins.getById(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi lấy admins theo ID:", err);
        return res.status(500).send("Lỗi server khi lấy {tablename.ToLower()} theo ID!");
      }
      if (result.length === 0) {
        return res.status(404).send("Không tìm thấy admins với ID: " + id);
      }
      res.json(result);
    });
  },

  insert: (req, res) => {
    const adminsData = req.body;
    admins.insert(adminsData, (err, result) => {
      if (err) {
        console.error("Lỗi khi thêm admins:", err);
        return res.status(500).send("Lỗi server khi thêm {tablename.ToLower()}!");
      }
      return res.status(200).json({
        message: `Admin đã được thêm thành công.`,
        adminsdt: adminsData
      });
    });
  },

  update: (req, res) => {
    const adminsData = req.body;
    const id = req.params.id;
    admins.update(id, adminsData, (xerr, result) => {
      if (err) {
        console.error("Lỗi khi cập nhật admins:", err);
        return res.status(500).send("Lỗi server khi cập nhật {tablename.ToLower()}!");
      }
      return res.status(200).json({
        message: `Admin với ID ${id}} đã được cập nhật thành công.`,
      });
    });
  },

  delete: (req, res) => {
    const id = req.params.id; // Lấy id từ params, không phải từ body hoặc object.
    
    if (!id) {
      return res.status(400).send("ID is required to delete record");
    }
  
    admins.delete(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi xóa admins:", err);
        return res.status(500).send("Lỗi server khi xóa admin!");
      }
      res.status(200).json({ message: `Admin với ID ${id} đã được xóa thành công` });
    });
  }
  

};
