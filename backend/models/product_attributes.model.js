const db = require("../common/db");

const product_attributes = function (product_attributes) {
	this.product_id = product_attributes.product_id;
	this.attribute_name = product_attributes.attribute_name;
	this.attribute_value = product_attributes.attribute_value;

};

// Lấy product_attributes theo ID
product_attributes.getById = (id, callback) => {
    const sqlString = "SELECT * FROM product_attributes WHERE attribute_id = ?";
    db.query(sqlString, id, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result[0]);
    });
};

// Lấy tất cả product_attributes
product_attributes.getAll = (callback) => {
    const sqlString = "SELECT * FROM product_attributes";
    db.query(sqlString, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// Thêm product_attributes mới
product_attributes.insert = (newproduct_attributes, callback) => {
    const sqlString = "INSERT INTO product_attributes SET ?";
    db.query(sqlString, newproduct_attributes, (err, res) => {
        if (err) {
            return callback(err);
        }
        callback(null, { id: res.insertId, ...newproduct_attributes });
    });
};

// Cập nhật thông tin product_attributes
product_attributes.update = (id, product_attributesData, callback) => {
    const sqlString = "UPDATE product_attributes SET ? WHERE attribute_id = ?";
    db.query(sqlString, [product_attributesData, id], (err, res) => {
        if (err) {
            return callback(err);
        }
        callback(null, `Cập nhật product_attributes ID = ${attribute_id} thành công`);
    });
};

// Xóa product_attributes
product_attributes.delete = (id, callback) => {
    const sqlString = "DELETE FROM product_attributes WHERE attribute_id = ?";
    db.query(sqlString, id, (err, res) => {
        if (err) {
            return callback(err);
        }
    });
};

module.exports = product_attributes;
