-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 24, 2024 at 03:00 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shop1`
--

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `order_id` varchar(255) DEFAULT NULL,
  `product_code` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `order_id`, `product_code`, `quantity`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 2, '112014884008765', '0639570967', 1, 0, '2023-09-15 07:27:19', '2023-09-15 07:27:19');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `company` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `star` int(11) DEFAULT NULL,
  `rateCount` int(11) DEFAULT NULL,
  `promo` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`promo`)),
  `detail` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`detail`)),
  `code` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `company`, `img`, `price`, `star`, `rateCount`, `promo`, `detail`, `code`, `createdAt`, `updatedAt`) VALUES
(1, 'Chien thang cuoc choi cuoc song', '', 'img/products/Sach/Chienthangtrochoicuocsong.jpg', 49000, 3, 26, '{\"name\":\"moiramat\",\"value\":\"0\"}', '{\"size\":\"ABC\",\"xuatsu\":\"Tokyo\"}', '1722325789', '2023-09-15 07:26:41', '2023-09-15 07:26:41'),
(2, 'Tieng ken thien nga', '', 'img/products/Sach/Tiengkenthiennga.jpg', 69000, 0, 0, '{\"name\":\"moiramat\",\"value\":\"0\"}', '{\"size\":\"ABC\",\"xuatsu\":\"Tokyo\"}', '3570407178', '2023-09-15 07:26:41', '2023-09-15 07:26:41'),
(3, 'Nha Gia Kim', '', 'img/products/Sach/Nhagiakim.jpg', 79000, 5, 188, '{\"name\":\"giamgia\",\"value\":\"5.000\"}', '{\"size\":\"ABC\",\"xuatsu\":\"Tokyo\"}', '7003774980', '2023-09-15 07:26:41', '2023-09-15 07:26:41'),
(4, 'Dung De Tien Ngu Yen', '', 'img/products/Sach/Dungdetiennguyen.png', 25000, 0, 0, '{\"name\":\"giamgia\",\"value\":\"10.000\"}', '{\"size\":\"ABC\",\"xuatsu\":\"Tokyo\"}', '5051602047', '2023-09-15 07:26:41', '2023-09-15 07:26:41'),
(5, '?on Gian', '', 'img/products/Sach/Dongian.jpg', 47000, 5, 7, '{\"name\":\"giamgia\",\"value\":\"15.000\"}', '{\"size\":\"ABC\",\"xuatsu\":\"Tokyo\"}', '0833945140', '2023-09-15 07:26:41', '2023-09-15 07:26:41'),
(6, 'Hay Nho Ten Anh Ay', '', 'img/products/Sach/Haynhotenanhay.jpg', 31000, 4, 10, '{\"name\":\"giareonline\",\"value\":\"27.000\"}', '{\"size\":\"ABC\",\"xuatsu\":\"Tokyo\"}', '3408061182', '2023-09-15 07:26:41', '2023-09-15 07:26:41'),
(7, 'Hom Nay Toi That Tinh', '', 'img/products/Sach/Homnaytoithattinh.jpg', 46000, 0, 0, '{\"name\":\"moiramat\",\"value\":\"0\"}', '{\"size\":\"ABC\",\"xuatsu\":\"Tokyo\"}', '9279823703', '2023-09-15 07:26:41', '2023-09-15 07:26:41'),
(8, 'Lam Ban Voi Bau Troi', '', 'img/products/Sach/Lambanvoibautroi.jpg', 62000, 0, 0, '{\"name\":\"giamgia\",\"value\":\"15.000\"}', '{\"size\":\"ABC\",\"xuatsu\":\"Tokyo\"}', '1647255370', '2023-09-15 07:26:41', '2023-09-15 07:26:41'),
(9, 'Nguoi Don Tau', '', 'img/products/Sach/Nguoidontau.jpg', 59000, 0, 0, '{\"name\":\"moiramat\",\"value\":\"0\"}', '{\"size\":\"ABC\",\"xuatsu\":\"Tokyo\"}', '4924712263', '2023-09-15 07:26:41', '2023-09-15 07:26:41'),
(10, 'Tieng Anh 10', '', 'img/products/SachGiaoKhoa/Tienganh10.jpg', 51000, 0, 0, '{\"name\":\"giareonline\",\"value\":\"20.000\"}', '{\"size\":\"ABC\",\"xuatsu\":\"Tokyo\"}', '7748960300', '2023-09-15 07:26:41', '2023-09-15 07:26:41'),
(11, 'Toan 10', '', 'img/products/SachGiaoKhoa/Toan10.jpg', 62000, 0, 0, '{\"name\":\"\",\"value\":\"0\"}', '{\"size\":\"ABC\",\"xuatsu\":\"Tokyo\"}', '3088423681', '2023-09-15 07:26:41', '2023-09-15 07:26:41'),
(12, 'Ngu Van 10', '', 'img/products/SachGiaoKhoa/Nguvan10.jpg', 34000, 4, 16, '{\"name\":\"moiramat\",\"value\":\"0\"}', '{\"size\":\"ABC\",\"xuatsu\":\"Tokyo\"}', '2394642592', '2023-09-15 07:26:41', '2023-09-15 07:26:41'),
(13, 'Tin Hoc 10', '', 'img/products/SachGiaoKhoa/Tinhoc10.jpg', 85000, 4, 104, '{\"name\":\"moiramat\",\"value\":\"\"}', '{\"size\":\"ABC\",\"xuatsu\":\"Tokyo\"}', '5824777385', '2023-09-15 07:26:41', '2023-09-15 07:26:41'),
(14, 'Sinh Hoc 10', '', 'img/products/SachGiaoKhoa/Sinhhoc10.jpg', 49000, 4, 80, '{\"name\":\"\",\"value\":\"\"}', '{\"size\":\"ABC\",\"xuatsu\":\"Tokyo\"}', '4109257208', '2023-09-15 07:26:41', '2023-09-15 07:26:41'),
(15, 'Vat Ly 10', '', 'img/products/SachGiaoKhoa/Vatly10.jpg', 60000, 5, 87, '{\"name\":\"moiramat\",\"value\":\"\"}', '{\"size\":\"ABC\",\"xuatsu\":\"Tokyo\"}', '1809362515', '2023-09-15 07:26:41', '2023-09-15 07:26:41'),
(16, 'Hoa Hoc 10', '', 'img/products/SachGiaoKhoa/Hoahoc10.jpg', 69000, 4, 372, '{\"name\":\"moiramat\",\"value\":\"\"}', '{\"size\":\"nha giao vn\",\"xuatsu\":\"Viet Nam\"}', '3080220055', '2023-09-15 07:26:41', '2023-09-15 07:26:41'),
(17, 'Dia Li 10', '??a lí', 'img/products/SachGiaoKhoa/Diali10.jpg', 77000, 5, 347, '{\"name\":\"\",\"value\":\"\"}', '{\"size\":\"ABC\",\"xuatsu\":\"Tokyo\"}', '8555866857', '2023-09-15 07:26:41', '2023-09-15 07:26:41'),
(18, 'Cong Nghe 10', '', 'img/products/SachGiaoKhoa/Congnghe10.jpg', 71000, 5, 4, '{\"name\":\"moiramat\",\"value\":\"0\"}', '{\"size\":\"ABC\",\"xuatsu\":\"Tokyo\"}', '0602612137', '2023-09-15 07:26:41', '2023-09-15 07:26:41'),
(19, '5 Centimet Tren Giay', '', 'img/products/SachHoatHinh/5centimettrengiay.jpg', 98000, 4, 22, '{\"name\":\"moiramat\",\"value\":\"0\"}', '{\"size\":\"ABC\",\"xuatsu\":\"Tokyo\"}', '3109396774', '2023-09-15 07:26:41', '2023-09-15 07:26:41'),
(20, 'Co Gai Vuot Thoi Gian', '', 'img/products/SachHoatHinh/Cogaivuotthoigian.jpg', 54000, 5, 54, '{\"name\":\"\",\"value\":\"\"}', '{\"size\":\"ABC\",\"xuatsu\":\"Tokyo\"}', '2745646524', '2023-09-15 07:26:41', '2023-09-15 07:26:41'),
(21, 'Dieu Bi Mat', '', 'img/products/SachHoatHinh/Dieubimat.jpg', 99000, 5, 999, '{\"name\":\"giamgia\",\"value\":\"15.000\"}', '{\"size\":\"ABC\",\"xuatsu\":\"Tokyo\"}', '8188695082', '2023-09-15 07:26:41', '2023-09-15 07:26:41'),
(22, 'Ngoi Nha Nghin Hang Lnag', '', 'img/products/SachHoatHinh/Ngoinhanghinhanhlang.jpg', 89000, 4, 22, '{\"name\":\"moiramat\",\"value\":\"0\"}', '{\"size\":\"ABC\",\"xuatsu\":\"Tokyo\"}', '0065303451', '2023-09-15 07:26:41', '2023-09-15 07:26:41'),
(23, 'Ty Quay', 'Realme', 'img/products/SachHoatHinh/Tyquay.jpg', 69000, 5, 16, '{\"name\":\"moiramat\",\"value\":\"\"}', '{\"size\":\"ABC\",\"xuatsu\":\"Tokyo\"}', '3712106494', '2023-09-15 07:26:41', '2023-09-15 07:26:41'),
(24, 'Chuyen Con E Co Chong', 'Realme', 'img/products/SachHoatHinh/Chuyenconecochong.jpg', 49000, 5, 7, '{\"name\":\"moiramat\",\"value\":\"\"}', '{\"size\":\"ABC\",\"xuatsu\":\"Tokyo\"}', '2982113477', '2023-09-15 07:26:41', '2023-09-15 07:26:41'),
(25, 'One Piece 2', 'Realme', 'img/products/SachHoatHinh/Onepiece2.jpg', 80000, 4, 4, '{\"name\":\"moiramat\",\"value\":\"\"}', '{\"size\":\"ABC\",\"xuatsu\":\"Tokyo\"}', '6446330016', '2023-09-15 07:26:41', '2023-09-15 07:26:41'),
(26, 'One Piece 57', 'Realme', 'img/products/SachHoatHinh/Onepiece57.jpg', 80000, 4, 11, '{\"name\":\"moiramat\",\"value\":\"\"}', '{\"size\":\"Echiro Oda\",\"xuatsu\":\"Nhật bản\"}', '0301441407', '2023-09-15 07:26:41', '2023-09-15 07:26:41'),
(27, 'Shin Cau Be But Chi 47', 'Philips', 'img/products/SachHoatHinh/Shincaubebutchi47.jpg', 75000, 5, 6, '{\"name\":\"\",\"value\":\"\"}', '{\"size\":\"ABC\",\"xuatsu\":\"Tokyo\"}', '7336062295', '2023-09-15 07:26:41', '2023-09-15 07:26:41'),
(28, 'NARUTO 1', 'Philips', 'img/products/SachHoatHinh/Naruto1.jpg', 63000, 3, 30, '{\"name\":\"\",\"value\":\"\"}', '{\"size\":\"ABC\",\"xuatsu\":\"Tokyo\"}', '6939489098', '2023-09-15 07:26:41', '2023-09-15 07:26:41'),
(29, 'Conan 13', 'Philips', 'img/products/SachHoatHinh/Conan13.jpg', 58000, 5, 126, '{\"name\":\"\",\"value\":\"\"}', '{\"size\":\"ABC\",\"xuatsu\":\"Tokyo\"}', '8631367101', '2023-09-15 07:26:41', '2023-09-15 07:26:41'),
(30, 'Doremon 1', '', 'img/products/SachHoatHinh/Doremon1.jpg', 45000, 0, 0, '{\"name\":\"moiramat\",\"value\":\"0\"}', '{\"size\":\"ABC\",\"xuatsu\":\"Tokyo\"}', '7396723011', '2023-09-15 07:26:41', '2023-09-15 07:26:41'),
(31, 'Tua And The Elephant', '', 'img/products/SachHoatHinh/Elephant.jpg', 74000, 5, 168, '{\"name\":\"giamgia\",\"value\":\"20.000\"}', '{}', '6935549504', '2023-09-15 07:26:41', '2023-09-15 07:26:41'),
(32, 'Muon Nhanh THi Phai Tu Tu', '', 'img/products/SachHoatHinh/Muonnhanhthiphaitutu.jpg', 49000, 4, 60, '{\"name\":\"giamgia\",\"value\":\"5.000\"}', '{\"size\":\"ABC\",\"xuatsu\":\"Tokyo\"}', '2354545498', '2023-09-15 07:26:41', '2023-09-15 07:26:41'),
(33, 'Victor Hugo - Nhung Nguoi Khon Kho 1', '', 'img/products/SachVanHoc/Nhungnguoikhonkho1.jpg', 220000, 4, 60, '{\"name\":\"moiramat\",\"value\":\"0\"}', '{\"size\":\"ABC\",\"xuatsu\":\"Tokyo\"}', '9323326899', '2023-09-15 07:26:41', '2023-09-15 07:26:41'),
(34, 'Victor Huygo - Notre-Dame de Paris ', 'Mobell', 'img/products/SachVanHoc/Thanggunhathoducba.jpg', 250000, 4, 37, '{\"name\":\"\",\"value\":\"\"}', '{\"size\":\"ABC\",\"xuatsu\":\"Tokyo\"}', '5334143000', '2023-09-15 07:26:41', '2023-09-15 07:26:41'),
(35, 'Tieng Chim Hot Trong Bui Man Gai', 'Mobell', 'img/products/SachVanHoc/Tiengchimhottrongbuimangai.jpg', 590000, 4, 58, '{\"name\":\"\",\"value\":\"\"}', '{\"size\":\"ABC\",\"xuatsu\":\"Tokyo\"}', '4398234375', '2023-09-15 07:26:41', '2023-09-15 07:26:41'),
(36, 'Nha Tho Paris', 'Mobell', 'img/products/SachVanHoc/Nhathoducbaparis.jpg', 290000, 0, 0, '{\"name\":\"moiramat\",\"value\":\"\"}', '{\"size\":\"ABC\",\"xuatsu\":\"Tokyo\"}', '0658889535', '2023-09-15 07:26:41', '2023-09-15 07:26:41'),
(37, 'Ba Ga Cung Thuyen', '', 'img/products/SachVanHoc/Bagacungthuyen.jpg', 890000, 4, 12, '{\"name\":\"\",\"value\":\"\"}', '{\"size\":\"ABC\",\"xuatsu\":\"Tokyo\"}', '3382132602', '2023-09-15 07:26:41', '2023-09-15 07:26:41'),
(38, '45 Do F', '', 'img/products/SachVanHoc/45dof.jpg', 350000, 5, 3, '{\"name\":\"moiramat\",\"value\":\"\"}', '{\"size\":\"ABC\",\"xuatsu\":\"Tokyo\"}', '3499624720', '2023-09-15 07:26:41', '2023-09-15 07:26:41'),
(39, 'The Secret Tree', '', 'img/products/SachVanHoc/Thesecrettree.jpg', 160000, 5, 302, '{\"name\":\"\",\"value\":\"\"}', '{\"size\":\"ABC\",\"xuatsu\":\"Tokyo\"}', '6885544992', '2023-09-15 07:26:41', '2023-09-15 07:26:41'),
(40, 'Ngay Cuoi CUng Cua Mot Tu Tu', '', 'img/products/SachVanHoc/Ngaycuoicungcuamottutu.jfif', 170000, 5, 33, '{\"name\":\"moiramat\",\"value\":\"\"}', '{\"size\":\"ABC\",\"xuatsu\":\"Tokyo\"}', '8304756760', '2023-09-15 07:26:41', '2023-09-15 07:26:41'),
(41, '33 Ngay That Tinh', '', 'img/products/SachTieuThuyet/33ngaythattinh.jpg', 390000, 0, 0, '{\"name\":\"moiramat\",\"value\":\"\"}', '{\"size\":\"ABC\",\"xuatsu\":\"Tokyo\"}', '0661677528', '2023-09-15 07:26:41', '2023-09-15 07:26:41'),
(42, 'Cau Yeu Toi Phai Khong', '', 'img/products/SachTieuThuyet/Cauyeutoiphaikhong.jpg', 590000, 3, 3, '{\"name\":\"moiramat\",\"value\":\"\"}', '{\"size\":\"ABC\",\"xuatsu\":\"Tokyo\"}', '3686268997', '2023-09-15 07:26:41', '2023-09-15 07:26:41'),
(43, 'Du Gan Ma Khong Dau Don - Du Xa Ma Khong Co Don', '', 'img/products/SachTieuThuyet/Duganduxa.jfif', 280000, 4, 2, '{\"name\":\"moiramat\",\"value\":\"\"}', '{\"size\":\"ABC\",\"xuatsu\":\"Tokyo\"}', '0760830462', '2023-09-15 07:26:41', '2023-09-15 07:26:41'),
(44, 'Hoang Tu Be', '', 'img/products/SachTieuThuyet/Hoangtube.jpg', 690000, 4, 12, '{\"name\":\"moiramat\",\"value\":\"\"}', '{\"size\":\"ABC\",\"xuatsu\":\"Tokyo\"}', '1945822281', '2023-09-15 07:26:41', '2023-09-15 07:26:41'),
(45, 'So Do', 'Motorola', 'img/products/SachTieuThuyet/Sodo.jpg', 290000, 4, 14, '{\"name\":\"\",\"value\":\"\"}', '{\"size\":\"ABC\",\"xuatsu\":\"Tokyo\"}', '2505002610', '2023-09-15 07:26:41', '2023-09-15 07:26:41'),
(46, 'Song La Am Thanh Bung No', '', 'img/products/SachTieuThuyet/Songlaamthambungno.jfif', 990000, 0, 0, '{\"name\":\"giareonline\",\"value\":\"500.000\"}', '{\"size\":\"ABC\",\"xuatsu\":\"Tokyo\"}', '2284992697', '2023-09-15 07:26:41', '2023-09-15 07:26:41'),
(47, 'Thach Lam', '', 'img/products/SachTieuThuyet/Thachlam.jpg', 190000, 5, 230, '{\"name\":\"moiramat\",\"value\":\"0\"}', '{\"size\":\"ABC\",\"xuatsu\":\"Tokyo\"}', '5388504265', '2023-09-15 07:26:41', '2023-09-15 07:26:41'),
(48, 'Thoi Gian Tuoi Dep', '', 'img/products/SachTieuThuyet/Thoigiantuoidep.jpg', 490000, 5, 16, '{\"name\":\"giamgia\",\"value\":\"30.000\"}', '{\"size\":\"ABC\",\"xuatsu\":\"Tokyo\"}', '4204048603', '2023-09-15 07:26:41', '2023-09-15 07:26:41'),
(49, 'Toi Bi Bo Bat Coc', '', 'img/products/SachTieuThuyet/Toibibobatcoc.jpg', 300000, 4, 5, '{\"name\":\"giareonline\",\"value\":\"150.000\"}', '{\"size\":\"ABC\",\"xuatsu\":\"Tokyo\"}', '0076292983', '2023-09-15 07:26:41', '2023-09-15 07:26:41'),
(50, 'Tokyo On Foot', '', 'img/products/SachTieuThuyet/Tokyoonfoot.jpg', 299000, 4, 804, '{\"name\":\"giareonline\",\"value\":\"199.000\"}', '{\"size\":\"ABC\",\"xuatsu\":\"Tokyo\"}', '0639570967', '2023-09-15 07:26:41', '2023-09-15 07:26:41');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20220319115035-create-user.js'),
('20230908152550-create-product.js'),
('20230909133331-create-order.js');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` int(11) DEFAULT 0,
  `token` varchar(255) DEFAULT NULL,
  `refreshToken` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `fullname`, `email`, `password`, `role`, `token`, `refreshToken`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'Min', 'Min', 'Min@gmail.com', '$2b$10$OWsu4HI/y2F//WIRw3GUUeyU8x/6PhrKGcryrImpjxR0sKo2y1jIa', 0, '80706c26d97b5', 'C1tdMEQf9MkMgpxgmTUkuNBn9uKV4l97uATuskRVKdFXEOxtD24oEPkySl3nuC6RrWM08N4b1eLpmzyox50aoiKu0Jv0sfbpNWUY', 0, '2023-09-10 13:55:17', '2023-09-10 14:55:53'),
(2, 'Admin', 'Admin', 'Admin@gmail.com', '$2b$10$/4nAJvq0f2dDbjoCGQzXBeW4k7Ikq7KgAoMksgl.7WxgPogpU/e.O', 1, '374297709e7d7', 'IxQpjb9EOl88GKIEzgD4vrG0tMGCVJbQUGVhnHxwUzjoeO85oH8x9gAKyWImPlsKruKpQSvOCYi6ljnNaKkND0tRsQCHj26lKECX', 0, '2023-09-10 13:55:31', '2023-09-15 07:20:54');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
