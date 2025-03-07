const db = require("../common/db");

const product_variants = function (product_variants) {
	this.product_id = product_variants.product_id;
	this.variant_sku = product_variants.variant_sku;
	this.price = product_variants.price;
	this.stock_quantity = product_variants.stock_quantity;

};

// Lấy product_variants theo ID
product_variants.getById = (id, callback) => {
    const sqlString = "SELECT * FROM product_variants WHERE variant_id = ?";
    db.query(sqlString, id, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result[0]);
    });
};

// Lấy tất cả product_variants
product_variants.getAll = (callback) => {
    const sqlString = "SELECT * FROM product_variants";
    db.query(sqlString, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// Thêm product_variants mới
product_variants.insert = (newproduct_variants, callback) => {
    const sqlString = "INSERT INTO product_variants SET ?";
    db.query(sqlString, newproduct_variants, (err, res) => {
        if (err) {
            return callback(err);
        }
        callback(null, { id: res.insertId, ...newproduct_variants });
    });
};

// Cập nhật thông tin product_variants
product_variants.update = (id, product_variantsData, callback) => {
    const sqlString = "UPDATE product_variants SET ? WHERE variant_id = ?";
    db.query(sqlString, [product_variantsData, id], (err, res) => {
        if (err) {
            return callback(err);
        }
        callback(null, `Cập nhật product_variants ID = ${variant_id} thành công`);
    });
};

// Xóa product_variants
product_variants.delete = (id, callback) => {
    const sqlString = "DELETE FROM product_variants WHERE variant_id = ?";
    db.query(sqlString, id, (err, res) => {
        if (err) {
            return callback(err);
        }
    });
};

module.exports = product_variants;
