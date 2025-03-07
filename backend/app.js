var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
const mysql = require('mysql2');
var cors = require('cors');
const express = require('express');
const app = express();

app.use(express.json()); // Cho phép nhận dữ liệu JSON trong body
app.use(express.urlencoded({ extended: true })); // Cho phép nhận dữ liệu từ form

app.use(cors());

// Cấu hình EJS
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Lắng nghe trên cổng 3000
const port = 5000;
app.listen(port, function() {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});

// Cấu hình kết nối MySQL sử dụng connection pool
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',        // Thay đổi theo cấu hình của bạn
  password: 'Qhuy204', // Thay đổi mật khẩu của bạn
  database: 'computerstore', // Thay đổi tên database của bạn
  waitForConnections: true,
  connectionLimit: 10, // Số lượng kết nối tối đa
  queueLimit: 0        // Không giới hạn số lượng kết nối trong hàng đợi
});

// Thực hiện truy vấn
function executeQuery() {
  db.query('SELECT * FROM categories', (err, results) => {
    if (err) {
      console.error('Lỗi trong truy vấn:', err);
      return;
    }
    console.log('Kết quả truy vấn:', results);
  });
}

// Gọi hàm thực thi truy vấn
executeQuery();

// Route Trang chủ
app.get('/', (req, res) => {
  res.render('index', { title: 'Trang Chủ' });
});

// Đảm bảo đường dẫn đúng và các file tồn tại
var adminsRouter = require('./routes/admins.route');
app.use('/admins', adminsRouter);

var cartRouter = require('./routes/cart.route');
app.use('/cart', cartRouter);

var categoriesRouter = require('./routes/categories.route');
app.use('/categories', categoriesRouter);

var order_itemsRouter = require('./routes/order_items.route');
app.use('/order_items', order_itemsRouter);

var ordersRouter = require('./routes/orders.route');
app.use('/orders', ordersRouter);

var payment_methodsRouter = require('./routes/payment_methods.route');
app.use('/payment_methods', payment_methodsRouter);

var product_attributesRouter = require('./routes/product_attributes.route');
app.use('/product_attributes', product_attributesRouter);

var product_imagesRouter = require('./routes/product_images.route');
app.use('/product_images', product_imagesRouter);

var product_promotionsRouter = require('./routes/product_promotions.route');
app.use('/product_promotions', product_promotionsRouter);

var product_variantsRouter = require('./routes/product_variants.route');
app.use('/product_variants', product_variantsRouter);

var productsRouter = require('./routes/products.route');
app.use('/products', productsRouter);

var promotionsRouter = require('./routes/promotions.route');
app.use('/promotions', promotionsRouter);

var reviewsRouter = require('./routes/reviews.route');
app.use('/reviews', reviewsRouter);

var user_addressesRouter = require('./routes/user_addresses.route');
app.use('/user_addresses', user_addressesRouter);

var usersRouter = require('./routes/users.route');
app.use('/users', usersRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
