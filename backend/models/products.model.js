const db = require("../common/db");

const products = function (products) {
	this.category_id = products.category_id;
	this.sku = products.sku;
	this.product_name = products.product_name;
	this.brand = products.brand;
	this.model = products.model;
	this.description = products.description;
	this.price = products.price;
	this.stock_quantity = products.stock_quantity;
	this.is_featured = products.is_featured;
	this.created_at = products.created_at;

};

// Lấy products theo ID
products.getById = (id, callback) => {
    const sqlString = "SELECT * FROM products WHERE product_id = ?";
    db.query(sqlString, id, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result[0]);
    });
};

// Lấy tất cả products
products.getAll = (callback) => {
    const sqlString = "SELECT * FROM products";
    db.query(sqlString, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// Thêm products mới
products.insert = (newproducts, callback) => {
    const sqlString = "INSERT INTO products SET ?";
    db.query(sqlString, newproducts, (err, res) => {
        if (err) {
            return callback(err);
        }
        callback(null, { id: res.insertId, ...newproducts });
    });
};

// Cập nhật thông tin products
products.update = (id, productsData, callback) => {
    const sqlString = "UPDATE products SET ? WHERE product_id = ?";
    db.query(sqlString, [productsData, id], (err, res) => {
        if (err) {
            return callback(err);
        }
        callback(null, `Cập nhật products ID = ${product_id} thành công`);
    });
};

// Xóa products
products.delete = (id, callback) => {
    const sqlString = "DELETE FROM products WHERE product_id = ?";
    db.query(sqlString, id, (err, res) => {
        if (err) {
            return callback(err);
        }
    });
};

module.exports = products;
