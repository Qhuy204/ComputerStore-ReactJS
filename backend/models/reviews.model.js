const db = require("../common/db");

const reviews = function (reviews) {
	this.product_id = reviews.product_id;
	this.user_id = reviews.user_id;
	this.rating = reviews.rating;
	this.review_text = reviews.review_text;
	this.review_date = reviews.review_date;

};

// Lấy reviews theo ID
reviews.getById = (id, callback) => {
    const sqlString = "SELECT * FROM reviews WHERE review_id = ?";
    db.query(sqlString, id, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result[0]);
    });
};

// Lấy tất cả reviews
reviews.getAll = (callback) => {
    const sqlString = "SELECT * FROM reviews";
    db.query(sqlString, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// Thêm reviews mới
reviews.insert = (newreviews, callback) => {
    const sqlString = "INSERT INTO reviews SET ?";
    db.query(sqlString, newreviews, (err, res) => {
        if (err) {
            return callback(err);
        }
        callback(null, { id: res.insertId, ...newreviews });
    });
};

// Cập nhật thông tin reviews
reviews.update = (id, reviewsData, callback) => {
    const sqlString = "UPDATE reviews SET ? WHERE review_id = ?";
    db.query(sqlString, [reviewsData, id], (err, res) => {
        if (err) {
            return callback(err);
        }
        callback(null, `Cập nhật reviews ID = ${review_id} thành công`);
    });
};

// Xóa reviews
reviews.delete = (id, callback) => {
    const sqlString = "DELETE FROM reviews WHERE review_id = ?";
    db.query(sqlString, id, (err, res) => {
        if (err) {
            return callback(err);
        }
    });
};

module.exports = reviews;
