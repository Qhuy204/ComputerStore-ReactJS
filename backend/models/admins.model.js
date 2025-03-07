const db = require("../common/db");

const admins = function (admins) {
	this.user_id = admins.user_id;
	this.role = admins.role;
	this.created_at = admins.created_at;

};

// Lấy admins theo ID
admins.getById = (id, callback) => {
    const sqlString = "SELECT * FROM admins WHERE admin_id = ?";
    db.query(sqlString, id, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result[0]);
    });
};

// Lấy tất cả admins
admins.getAll = (callback) => {
    const sqlString = "SELECT * FROM admins";
    db.query(sqlString, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// Thêm admins mới
admins.insert = (newadmins, callback) => {
    const sqlString = "INSERT INTO admins SET ?";
    db.query(sqlString, newadmins, (err, res) => {
        if (err) {
            return callback(err);
        }
        callback(null, { id: res.insertId, ...newadmins });
    });
};

// Cập nhật thông tin admins
admins.update = (id, adminsData, callback) => {
    const sqlString = "UPDATE admins SET ? WHERE admin_id = ?";
    db.query(sqlString, [adminsData, id], (err, res) => {
        if (err) {
            return callback(err);
        }
        // callback(null, `Cập nhật admins ID = ${admin_id} thành công`);
    });
};

// Xóa admins
admins.delete = (id, callback) => {
    const sqlString = "DELETE FROM admins WHERE admin_id = ?";
    db.query(sqlString, id, (err, res) => {
        if (err) {
            return callback(err);
        }
    });
};

module.exports = admins;
