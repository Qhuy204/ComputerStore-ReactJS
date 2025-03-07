const db = require("../common/db");

const categories = function (categories) {
	this.category_name = categories.category_name;
	this.description = categories.description;

};

// Lấy categories theo ID
categories.getById = (id, callback) => {
    const sqlString = "SELECT * FROM categories WHERE category_id = ?";
    db.query(sqlString, id, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result[0]);
    });
};

// Lấy tất cả categories
categories.getAll = (callback) => {
    const sqlString = "SELECT * FROM categories";
    db.query(sqlString, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// Thêm categories mới
categories.insert = (newcategories, callback) => {
    const sqlString = "INSERT INTO categories SET ?";
    db.query(sqlString, newcategories, (err, res) => {
        if (err) {
            return callback(err);
        }
        callback(null, { id: res.insertId, ...newcategories });
    });
};

// Cập nhật thông tin categories
categories.update = (id, categoriesData, callback) => {
    const sqlString = "UPDATE categories SET ? WHERE category_id = ?";
    db.query(sqlString, [categoriesData, id], (err, res) => {
        if (err) {
            return callback(err);
        }
        callback(null, `Cập nhật categories ID = ${category_id} thành công`);
    });
};

// Xóa categories
categories.delete = (id, callback) => {
    const sqlString = "DELETE FROM categories WHERE category_id = ?";
    db.query(sqlString, id, (err, res) => {
        if (err) {
            return callback(err);
        }
    });
};

module.exports = categories;
