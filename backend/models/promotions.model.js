const db = require("../common/db");

const promotions = function (promotions) {
	this.promotion_name = promotions.promotion_name;
	this.description = promotions.description;
	this.discount_type = promotions.discount_type;
	this.discount_value = promotions.discount_value;
	this.start_date = promotions.start_date;
	this.end_date = promotions.end_date;
	this.is_active = promotions.is_active;

};

// Lấy promotions theo ID
promotions.getById = (id, callback) => {
    const sqlString = "SELECT * FROM promotions WHERE promotion_id = ?";
    db.query(sqlString, id, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result[0]);
    });
};

// Lấy tất cả promotions
promotions.getAll = (callback) => {
    const sqlString = "SELECT * FROM promotions";
    db.query(sqlString, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// Thêm promotions mới
promotions.insert = (newpromotions, callback) => {
    const sqlString = "INSERT INTO promotions SET ?";
    db.query(sqlString, newpromotions, (err, res) => {
        if (err) {
            return callback(err);
        }
        callback(null, { id: res.insertId, ...newpromotions });
    });
};

// Cập nhật thông tin promotions
promotions.update = (id, promotionsData, callback) => {
    const sqlString = "UPDATE promotions SET ? WHERE promotion_id = ?";
    db.query(sqlString, [promotionsData, id], (err, res) => {
        if (err) {
            return callback(err);
        }
        callback(null, `Cập nhật promotions ID = ${promotion_id} thành công`);
    });
};

// Xóa promotions
promotions.delete = (id, callback) => {
    const sqlString = "DELETE FROM promotions WHERE promotion_id = ?";
    db.query(sqlString, id, (err, res) => {
        if (err) {
            return callback(err);
        }
    });
};

module.exports = promotions;
