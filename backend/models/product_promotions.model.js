const db = require("../common/db");

const product_promotions = function (product_promotions) {

};

// Lấy product_promotions theo ID
product_promotions.getById = (id, callback) => {
    const sqlString = "SELECT * FROM product_promotions WHERE promotion_id = ?";
    db.query(sqlString, id, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result[0]);
    });
};

// Lấy tất cả product_promotions
product_promotions.getAll = (callback) => {
    const sqlString = "SELECT * FROM product_promotions";
    db.query(sqlString, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// Thêm product_promotions mới
product_promotions.insert = (newproduct_promotions, callback) => {
    const sqlString = "INSERT INTO product_promotions SET ?";
    db.query(sqlString, newproduct_promotions, (err, res) => {
        if (err) {
            return callback(err);
        }
        callback(null, { id: res.insertId, ...newproduct_promotions });
    });
};

// Cập nhật thông tin product_promotions
product_promotions.update = (id, product_promotionsData, callback) => {
    const sqlString = "UPDATE product_promotions SET ? WHERE promotion_id = ?";
    db.query(sqlString, [product_promotionsData, id], (err, res) => {
        if (err) {
            return callback(err);
        }
        callback(null, `Cập nhật product_promotions ID = ${promotion_id} thành công`);
    });
};

// Xóa product_promotions
product_promotions.delete = (id, callback) => {
    const sqlString = "DELETE FROM product_promotions WHERE promotion_id = ?";
    db.query(sqlString, id, (err, res) => {
        if (err) {
            return callback(err);
        }
    });
};

module.exports = product_promotions;
