-- Users Table
CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    phone_number VARCHAR(20),
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    is_admin BOOLEAN DEFAULT FALSE,
    email_verified BOOLEAN DEFAULT FALSE
);

-- Admins Table
CREATE TABLE Admins (
    admin_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT, -- Tham chiếu đến bảng Users
    role ENUM('SuperAdmin', 'Manager', 'Support') NOT NULL, -- Các quyền hạn của admin
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- User Addresses Table
CREATE TABLE User_Addresses (
    address_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    recipient_name VARCHAR(100) NOT NULL, -- Tên người nhận
    phone_number VARCHAR(20) NOT NULL, -- Số điện thoại người nhận
    address TEXT NOT NULL, -- Địa chỉ chi tiết
    city VARCHAR(50) NOT NULL, -- Thành phố
    state VARCHAR(50) NOT NULL, -- Bang/Tiểu bang
    country VARCHAR(50) NOT NULL, -- Quốc gia
    postal_code VARCHAR(20), -- Mã bưu điện
    is_default BOOLEAN DEFAULT FALSE, -- Cờ đánh dấu địa chỉ mặc định
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Product Categories Table
CREATE TABLE Categories (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(50) NOT NULL,
    description TEXT
);

-- Products Table
CREATE TABLE Products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT,
    sku VARCHAR(50) UNIQUE NOT NULL, -- Mã sản phẩm SKU
    product_name VARCHAR(100) NOT NULL,
    brand VARCHAR(50),
    model VARCHAR(50),
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);

-- Product Attributes Table (to store product attributes like color, size, material)
CREATE TABLE Product_Attributes (
    attribute_id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    attribute_name VARCHAR(50) NOT NULL, -- Ví dụ: Màu sắc, Kích thước, Chất liệu
    attribute_value VARCHAR(255) NOT NULL, -- Giá trị của thuộc tính (ví dụ: Đỏ, M, Cotton)
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

-- Product Variants Table (to store product variants like different colors, sizes, versions)
CREATE TABLE Product_Variants (
    variant_id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    variant_sku VARCHAR(50) UNIQUE NOT NULL, -- Mã SKU cho từng biến thể (ví dụ: SKU cho phiên bản Màu Đỏ, Kích thước M)
    price DECIMAL(10,2) NOT NULL, -- Giá của biến thể sản phẩm
    stock_quantity INT NOT NULL, -- Số lượng còn lại của biến thể này
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

-- Product Images Table (to store multiple images for a product)
CREATE TABLE Product_Images (
    image_id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    image_url VARCHAR(255) NOT NULL, -- URL của hình ảnh sản phẩm
    is_primary BOOLEAN DEFAULT FALSE, -- Cờ đánh dấu hình ảnh chính của sản phẩm
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

-- Shopping Cart Table
CREATE TABLE Cart (
    cart_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    product_id INT,
    quantity INT NOT NULL CHECK (quantity > 0),
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE, -- Giỏ hàng có thể bị hủy
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

-- Orders Table
CREATE TABLE Orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    total_amount DECIMAL(10,2) NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled') DEFAULT 'Pending',
    shipping_address TEXT,
    payment_method_id INT,
    payment_status ENUM('Pending', 'Completed', 'Failed') DEFAULT 'Pending', -- Trạng thái thanh toán
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (payment_method_id) REFERENCES Payment_Methods(payment_method_id)
);

-- Order Items Table
CREATE TABLE Order_Items (
    order_item_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    price_at_time DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

-- Reviews Table
CREATE TABLE Reviews (
    review_id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    user_id INT,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    review_text TEXT,
    review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES Products(product_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Discount/Promotions Table
CREATE TABLE Promotions (
    promotion_id INT PRIMARY KEY AUTO_INCREMENT,
    promotion_name VARCHAR(100) NOT NULL,
    description TEXT,
    discount_type ENUM('Percentage', 'Fixed') DEFAULT 'Percentage', -- Kiểu giảm giá
    discount_value DECIMAL(10,2) NOT NULL, -- Giá trị giảm giá
    start_date DATE,
    end_date DATE,
    is_active BOOLEAN DEFAULT TRUE
);

-- Product Promotion Mapping Table
CREATE TABLE Product_Promotions (
    product_id INT,
    promotion_id INT,
    PRIMARY KEY (product_id, promotion_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id),
    FOREIGN KEY (promotion_id) REFERENCES Promotions(promotion_id)
);

-- Payment Methods Table
CREATE TABLE Payment_Methods (
    payment_method_id INT PRIMARY KEY AUTO_INCREMENT,
    payment_method_name VARCHAR(50) NOT NULL, -- Tên phương thức thanh toán
    description TEXT
);

-- Indexes for performance optimization
-- CREATE INDEX idx_product_category ON Products(category_id);
-- CREATE INDEX idx_order_user ON Orders(user_id);
-- CREATE INDEX idx_review_product ON Reviews(product_id);
-- CREATE INDEX idx_cart_user ON Cart(user_id);
-- CREATE INDEX idx_product_promotion ON Product_Promotions(promotion_id); -- Index cho bảng Product_Promotions
-- CREATE INDEX idx_product_sku ON Products(sku);
-- CREATE INDEX idx_product_variant_sku ON Product_Variants(variant_sku);
-- CREATE INDEX idx_product_attribute ON Product_Attributes(attribute_name);
-- CREATE INDEX idx_product_image ON Product_Images(product_id);