const order_items = require("../models/order_items.model");

module.exports = {
  getAll: (req, res) => {
    order_items.getAll((err, result) => {
      if (err) {
        console.error("Lỗi khi lấy order_items:", err);
        return res.status(500).send("Lỗi server khi lấy {tablename.ToLower()}!");
      }
      console.log("order_items:", result);
      res.json(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    order_items.getById(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi lấy order_items theo ID:", err);
        return res.status(500).send("Lỗi server khi lấy {tablename.ToLower()} theo ID!");
      }
      if (result.length === 0) {
        return res.status(404).send("Không tìm thấy order_items với ID: " + id);
      }
      res.json(result);
    });
  },

  insert: (req, res) => {
    const order_itemsData = req.body;
    order_items.insert(order_itemsData, (err, result) => {
      if (err) {
        console.error("Lỗi khi thêm order_items:", err);
        return res.status(500).send("Lỗi server khi thêm {tablename.ToLower()}!");
      }
      return res.status(200).json({
        message: `Admin với user_id ${order_items.user_id} đã được thêm thành công.`,
        order_itemsdt: order_itemsData
      });
    });
  },

  update: (req, res) => {
    const order_itemsData = req.body;
    const id = req.params.id;
    order_items.update(id, order_itemsData, (err, result) => {
      if (err) {
        console.error("Lỗi khi cập nhật order_items:", err);
        return res.status(500).send("Lỗi server khi cập nhật {tablename.ToLower()}!");
      }
      return res.status(200).json({
        message: `Admin với ID ${id}} đã được cập nhật thành công.`,
      });
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    order_items.delete(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi xóa order_items:", err);
        return res.status(500).send("Lỗi server khi xóa {id.ToLower()}!");
      }
    });
  },

};
