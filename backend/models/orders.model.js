const db = require("../common/db");

const orders = function (orders) {
	this.user_id = orders.user_id;
	this.total_amount = orders.total_amount;
	this.order_date = orders.order_date;
	this.status = orders.status;
	this.shipping_address = orders.shipping_address;
	this.payment_method_id = orders.payment_method_id;
	this.payment_status = orders.payment_status;

};

// Lấy orders theo ID
orders.getById = (id, callback) => {
    const sqlString = "SELECT * FROM orders WHERE order_id = ?";
    db.query(sqlString, id, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result[0]);
    });
};

// Lấy tất cả orders
orders.getAll = (callback) => {
    const sqlString = "SELECT * FROM orders";
    db.query(sqlString, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// Thêm orders mới
orders.insert = (neworders, callback) => {
    const sqlString = "INSERT INTO orders SET ?";
    db.query(sqlString, neworders, (err, res) => {
        if (err) {
            return callback(err);
        }
        callback(null, { id: res.insertId, ...neworders });
    });
};

// Cập nhật thông tin orders
orders.update = (id, ordersData, callback) => {
    const sqlString = "UPDATE orders SET ? WHERE order_id = ?";
    db.query(sqlString, [ordersData, id], (err, res) => {
        if (err) {
            return callback(err);
        }
        callback(null, `Cập nhật orders ID = ${order_id} thành công`);
    });
};

// Xóa orders
orders.delete = (id, callback) => {
    const sqlString = "DELETE FROM orders WHERE order_id = ?";
    db.query(sqlString, id, (err, res) => {
        if (err) {
            return callback(err);
        }
    });
};

module.exports = orders;
