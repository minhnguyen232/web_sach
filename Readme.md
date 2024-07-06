## Các bước cài đặt và chạy 
# Yêu cầu
- nodejs
- mysql
# Cài đặt môi trường ( Nếu đã càid đặt thì bỏ qua)

1. Tải xuống và cài đặt nodejs từ trang chủ `https://nodejs.org/fr`

2. Tải xuống và cài đặt xampp từ trang chủ `https://www.apachefriends.org/download.html`

# Cài đặt và chạy dự án
1. khởi chạy mysql server

- Mở xampp và chạy mysql server

2. tạo cơ sở dữ liệu
- mở trình quản lý database xampp trên trình duyệt qua đường dẫn `http://localhost/phpmyadmin`

- tạo cơ sở dữ liệu. ví dụ `shop`

- chèn tệp dữ liệu `database.sql` vào cơ sở dữ liệu `shop`

3. Cài đặt và chạy
- cấu hình file .env theo thông tin đã tạo ở bước 2
`DATABASE_HOST=127.0.0.1`
`DATABASE_PORT=3306`
`DATABASE_NAME=shop`
`DATABASE_USER=root`
`DATABASE_PASSWORD`

- cấu hình port 
`PORT=3000`

- mở terminal trong thư mục chứa dự án và chạy command
`npm install`

- chờ quá trình cài đặt package kết thúc và chạy tiếp command
`npm start`

- truy cập đường link hiển thị trong terminal để truy cập các chức năng của website