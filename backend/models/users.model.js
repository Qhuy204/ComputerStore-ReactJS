const db = require("../common/db");

const users = function (users) {
	this.username = users.username;
	this.email = users.email;
	this.password_hash = users.password_hash;
	this.full_name = users.full_name;
	this.phone_number = users.phone_number;
	this.registration_date = users.registration_date;
	this.last_login = users.last_login;
	this.is_admin = users.is_admin;
	this.email_verified = users.email_verified;

};

// Lấy users theo ID
users.getById = (id, callback) => {
    const sqlString = "SELECT * FROM users WHERE user_id = ?";
    db.query(sqlString, id, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result[0]);
    });
};

// Lấy tất cả users
users.getAll = (callback) => {
    const sqlString = "SELECT * FROM users";
    db.query(sqlString, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// Thêm users mới
users.insert = (newusers, callback) => {
    const sqlString = "INSERT INTO users SET ?";
    db.query(sqlString, newusers, (err, res) => {
        if (err) {
            return callback(err);
        }
        callback(null, { id: res.insertId, ...newusers });
    });
};

// Cập nhật thông tin users
users.update = (id, usersData, callback) => {
    const sqlString = "UPDATE users SET ? WHERE user_id = ?";
    db.query(sqlString, [usersData, id], (err, res) => {
        if (err) {
            return callback(err);
        }
        callback(null, `Cập nhật users ID = ${user_id} thành công`);
    });
};

// Xóa users
users.delete = (id, callback) => {
    const sqlString = "DELETE FROM users WHERE user_id = ?";
    db.query(sqlString, id, (err, res) => {
        if (err) {
            return callback(err);
        }
    });
};

module.exports = users;
