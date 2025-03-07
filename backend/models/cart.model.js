const db = require("../common/db");

const cart = function (cart) {
	this.user_id = cart.user_id;
	this.product_id = cart.product_id;
	this.quantity = cart.quantity;
	this.added_at = cart.added_at;
	this.is_active = cart.is_active;

};

// Lấy cart theo ID
cart.getById = (id, callback) => {
    const sqlString = "SELECT * FROM cart WHERE cart_id = ?";
    db.query(sqlString, id, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result[0]);
    });
};

// Lấy tất cả cart
cart.getAll = (callback) => {
    const sqlString = "SELECT * FROM cart";
    db.query(sqlString, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// Thêm cart mới
cart.insert = (newcart, callback) => {
    const sqlString = "INSERT INTO cart SET ?";
    db.query(sqlString, newcart, (err, res) => {
        if (err) {
            return callback(err);
        }
        callback(null, { id: res.insertId, ...newcart });
    });
};

// Cập nhật thông tin cart
cart.update = (id, cartData, callback) => {
    const sqlString = "UPDATE cart SET ? WHERE cart_id = ?";
    db.query(sqlString, [cartData, id], (err, res) => {
        if (err) {
            return callback(err);
        }
        callback(null, `Cập nhật cart ID = ${cart_id} thành công`);
    });
};

// Xóa cart
cart.delete = (id, callback) => {
    const sqlString = "DELETE FROM cart WHERE cart_id = ?";
    db.query(sqlString, id, (err, res) => {
        if (err) {
            return callback(err);
        }
    });
};

module.exports = cart;
