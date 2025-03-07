const users = require("../models/users.model");

module.exports = {
  getAll: (req, res) => {
    users.getAll((err, result) => {
      if (err) {
        console.error("Lỗi khi lấy users:", err);
        return res.status(500).send("Lỗi server khi lấy {tablename.ToLower()}!");
      }
      console.log("users:", result);
      res.json(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    users.getById(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi lấy users theo ID:", err);
        return res.status(500).send("Lỗi server khi lấy {tablename.ToLower()} theo ID!");
      }
      if (result.length === 0) {
        return res.status(404).send("Không tìm thấy users với ID: " + id);
      }
      res.json(result);
    });
  },

  insert: (req, res) => {
    const usersData = req.body;
    users.insert(usersData, (err, result) => {
      if (err) {
        console.error("Lỗi khi thêm users:", err);
        return res.status(500).send("Lỗi server khi thêm {tablename.ToLower()}!");
      }
      return res.status(200).json({
        message: `Admin với user_id ${users.user_id} đã được thêm thành công.`,
        usersdt: usersData
      });
    });
  },

  update: (req, res) => {
    const usersData = req.body;
    const id = req.params.id;
    users.update(id, usersData, (err, result) => {
      if (err) {
        console.error("Lỗi khi cập nhật users:", err);
        return res.status(500).send("Lỗi server khi cập nhật {tablename.ToLower()}!");
      }
      return res.status(200).json({
        message: `Admin với ID ${id}} đã được cập nhật thành công.`,
      });
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    users.delete(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi xóa users:", err);
        return res.status(500).send("Lỗi server khi xóa {id.ToLower()}!");
      }
    });
  },

};
