-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 24, 2020 at 08:37 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pickbazar`
--
CREATE DATABASE IF NOT EXISTS `pickbazar` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `pickbazar`;

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
CREATE TABLE IF NOT EXISTS `brands` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_bin NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- RELATIONSHIPS FOR TABLE `brands`:
--

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`id`, `name`, `created_at`) VALUES
(1, 'Sukà', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
CREATE TABLE IF NOT EXISTS `carts` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(10) UNSIGNED NOT NULL,
  `total` int(10) UNSIGNED NOT NULL,
  `state` varchar(45) COLLATE utf8_bin NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- RELATIONSHIPS FOR TABLE `carts`:
--

-- --------------------------------------------------------

--
-- Table structure for table `cart_product`
--

DROP TABLE IF EXISTS `cart_product`;
CREATE TABLE IF NOT EXISTS `cart_product` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `units` int(10) UNSIGNED NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `discount` int(10) UNSIGNED NOT NULL,
  `subtotal` decimal(10,2) UNSIGNED NOT NULL,
  `cart_id` int(10) UNSIGNED NOT NULL,
  `product_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- RELATIONSHIPS FOR TABLE `cart_product`:
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_bin NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- RELATIONSHIPS FOR TABLE `categories`:
--

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `created_at`) VALUES
(1, 'Cocina', '2020-06-27 01:57:34'),
(2, 'Baño', '2020-07-09 19:01:59'),
(3, 'Decoración', '2020-07-09 20:51:08'),
(4, 'Limpieza', '2020-06-27 01:57:34');

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
CREATE TABLE IF NOT EXISTS `images` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(150) COLLATE utf8_bin NOT NULL,
  `main` tinyint(1) UNSIGNED DEFAULT NULL,
  `product_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- RELATIONSHIPS FOR TABLE `images`:
--

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `name`, `main`, `product_id`, `created_at`) VALUES
(1, 'sarten-antiadherente-28cm.jpg', 1, 1, '2020-07-02 18:56:32'),
(2, 'cesto-negro.jpg', 1, 2, '2020-07-02 18:56:32'),
(3, 'frasco-vidrio-decal-22cm.jpg', 1, 3, '2020-07-02 18:56:32'),
(4, 'canasto-laundry-bamboo-marron.jpg', 1, 4, '2020-07-02 18:56:32'),
(5, 'cacerola-enlozada-x3.jpg', 1, 5, '2020-07-02 18:56:32'),
(6, 'mopa.jpg', 1, 6, '2020-07-02 18:56:32'),
(7, 'cubiertero.jpg', 1, 7, '2020-07-02 18:56:32'),
(8, 'pava-silvadora-acero.jpg', 1, 8, '2020-07-02 18:56:32'),
(9, 'cacerola-antiadherente-x3.jpg', 1, 9, '2020-07-02 18:56:32'),
(10, 'canasto-laundry-tela-max.jpg', 1, 10, '2020-07-02 18:56:32'),
(11, 'cesto-elegance.jpg', 1, 11, '2020-07-02 18:56:32'),
(12, 'bandeja-cama.jpg', 1, 12, '2020-07-02 18:56:32'),
(13, 'mainPick-1593979283710.jpg', 1, 13, '2020-07-06 23:39:41');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_bin NOT NULL,
  `description` varchar(250) COLLATE utf8_bin NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `discount` int(10) UNSIGNED DEFAULT NULL,
  `tax` int(10) UNSIGNED DEFAULT NULL,
  `state` tinyint(1) UNSIGNED NOT NULL,
  `category_id` int(10) UNSIGNED NOT NULL,
  `subcategory_id` int(10) UNSIGNED NOT NULL,
  `brand_id` int(10) UNSIGNED NOT NULL,
  `provider_id` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- RELATIONSHIPS FOR TABLE `products`:
--

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `discount`, `tax`, `state`, `category_id`, `subcategory_id`, `brand_id`, `provider_id`, `created_at`, `updated_at`) VALUES
(1, 'Sarten antiadherente de 28cm', 'Sarten cerámico antiadherente de 28cm de diámetro. Colores \'Black\' o \'Aqua\'', '5000.00', 10, 21, 1, 1, 5, 1, NULL, '2020-07-01 18:51:22', '2020-07-01 18:51:22'),
(2, 'Cesto de residuos Black&Gold', 'Cesto de residuos con pedal Black&Gold, 3 litros de capacidad', '5000.00', 10, 21, 1, 2, 7, 1, NULL, '2020-07-01 18:51:22', '2020-07-01 18:51:22'),
(3, 'Frasco de vidrio de 22cm', 'Frasco de vidrio con tapa Simple Home de 22cm. de alto', '5000.00', 10, 21, 1, 1, 4, 1, NULL, '2020-07-01 18:51:22', '2020-07-01 18:51:22'),
(4, 'Canasto laundry de 40cm', 'Canasto laundry color chocolate de 40cm. de diámetro', '5000.00', 10, 21, 1, 2, 8, 1, NULL, '2020-07-01 18:51:22', '2020-07-01 18:51:22'),
(5, 'Cacerolas enlozadas - set de 3 piezas', 'Cacerolas enlozadas con tapa de vidrio - 3 piezas de 20, 22 y 24cm', '5000.00', 10, 21, 1, 1, 1, 1, NULL, '2020-07-01 18:51:22', '2020-07-01 18:51:22'),
(6, 'Mopa con balde centrífugo', 'Mopa con brazo extensible y balde centrífugo', '5000.00', 10, 21, 1, 4, 17, 1, NULL, '2020-07-01 18:51:22', '2020-07-01 18:51:22'),
(7, 'Cubiertero de bamboo', 'Cubiertero de bamboo con 5 divisiones - 30cm. x  40cm', '5000.00', 0, 21, 1, 1, 6, 1, NULL, '2020-07-01 18:51:22', '2020-07-01 18:51:22'),
(8, 'Pava silvadora acero', 'Pava silvadora acero color cobre - 3 litros de capacidad', '5000.00', 0, 21, 1, 1, 2, 1, NULL, '2020-07-01 18:51:22', '2020-07-01 18:51:22'),
(9, 'Cacerolas antiadherentes - set de 3 piezas', 'Set cacerolas antiadherentes con tapa de vidrio - 3 de piezas 20, 22 y 24cm', '5000.00', 0, 21, 1, 1, 1, 1, NULL, '2020-07-01 18:51:22', '2020-07-01 18:51:22'),
(10, 'Canasto laundry de tela', 'Canasto laundry de tela de 58cm de diámetro', '5000.00', 0, 21, 1, 2, 8, 1, NULL, '2020-07-01 18:51:22', '2020-07-01 18:51:22'),
(11, 'Cesto de residuos Elegance', 'Cesto de residuos Elegance con pedal - capacidad 3 litros', '5000.00', 0, 21, 1, 2, 7, 1, NULL, '2020-07-01 18:51:22', '2020-07-01 18:51:22'),
(12, 'Bandeja desayunador', 'Bandeja desayunador de bamboo con patas rebatibles', '5000.00', 0, 21, 1, 1, 6, 1, NULL, '2020-07-01 18:51:22', '2020-07-01 18:51:22'),
(13, 'Cacerola Antiadherente 24cm', 'Cacerola cerámica antiadherente de 24cm de diámetro. Colores \'Black\' o \'Aqua\'', '5000.00', 0, 21, 0, 1, 1, 1, NULL, '2020-07-06 23:44:33', '2020-07-06 23:44:33');

-- --------------------------------------------------------

--
-- Table structure for table `subcategories`
--

DROP TABLE IF EXISTS `subcategories`;
CREATE TABLE IF NOT EXISTS `subcategories` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_bin NOT NULL,
  `category_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- RELATIONSHIPS FOR TABLE `subcategories`:
--

--
-- Dumping data for table `subcategories`
--

INSERT INTO `subcategories` (`id`, `name`, `category_id`, `created_at`, `updated_at`) VALUES
(1, 'Cacerolas', 1, '2020-07-02 20:23:55', '2020-07-02 20:23:55'),
(2, 'Pavas', 1, '2020-07-02 20:23:55', '2020-07-02 20:23:55'),
(3, 'Jarros', 1, '2020-07-02 20:26:02', '2020-07-02 20:26:02'),
(4, 'Frascos', 1, '2020-07-02 20:26:02', '2020-07-02 20:26:02'),
(5, 'Sartenes', 1, '2020-07-02 20:26:02', '2020-07-02 20:26:02'),
(6, 'Accesorios', 1, '2020-07-02 20:26:02', '2020-07-02 20:26:02'),
(7, 'Cestos', 2, '2020-07-02 20:26:02', '2020-07-02 20:26:02'),
(8, 'Canastos', 2, '2020-07-02 20:26:02', '2020-07-02 20:26:02'),
(9, 'Alfombras', 2, '2020-07-02 20:26:02', '2020-07-02 20:26:02'),
(10, 'Limas', 2, '2020-07-02 20:26:02', '2020-07-02 20:26:02'),
(11, 'Esponjas', 2, '2020-07-02 20:26:02', '2020-07-02 20:26:02'),
(12, 'Relojes', 3, '2020-07-02 20:26:02', '2020-07-02 20:26:02'),
(13, 'Espejos', 3, '2020-07-02 20:26:02', '2020-07-02 20:26:02'),
(14, 'Cuadros', 3, '2020-07-02 20:26:02', '2020-07-02 20:26:02'),
(15, 'Velas', 3, '2020-07-02 20:26:02', '2020-07-02 20:26:02'),
(16, 'Faroles', 3, '2020-07-02 20:26:02', '2020-07-02 20:26:02'),
(17, 'Mopas', 4, '2020-07-02 20:26:02', '2020-07-02 20:26:02');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) COLLATE utf8_bin NOT NULL,
  `lastName` varchar(45) COLLATE utf8_bin NOT NULL,
  `email` varchar(105) COLLATE utf8_bin NOT NULL,
  `password` varchar(500) COLLATE utf8_bin NOT NULL,
  `user` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `phone` varchar(45) COLLATE utf8_bin NOT NULL,
  `address` varchar(200) COLLATE utf8_bin NOT NULL,
  `userType` varchar(45) COLLATE utf8_bin NOT NULL,
  `state` tinyint(1) UNSIGNED NOT NULL,
  `avatar` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `country` varchar(500) COLLATE utf8_bin NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- RELATIONSHIPS FOR TABLE `users`:
--

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `password`, `user`, `phone`, `address`, `userType`, `state`, `avatar`, `country`, `created_at`, `updated_at`) VALUES
(1, 'David', 'Messina', 'davidmessina9@gmail.com', '$2b$10$a7dORGZNd0RYscUci59mQ.LdxxpmhtEE5SX8b66HnRNB/FCWqcoci', '', '1132146241', '', 'admin', 1, 'avatar-1593978857012.jpg', '', '2020-07-05 19:54:17', '2020-07-05 19:54:17'),
(2, 'David', 'Messina', 'davidmessina@speedy.com.ar', '$2b$10$kk/Fmfnj2kzYtGOZ83FfmeCYNHjHDqN9iOx50391d5J6x3v.jI1u.', '', '1132146241', '', 'client', 1, 'avatar-1594076314868.jpg', '', '2020-07-05 20:06:50', '2020-07-05 20:06:50');


--
-- Metadata
--
USE `phpmyadmin`;

--
-- Metadata for table brands
--

--
-- Metadata for table carts
--

--
-- Metadata for table cart_product
--

--
-- Metadata for table categories
--

--
-- Metadata for table images
--

--
-- Metadata for table products
--

--
-- Dumping data for table `pma__table_uiprefs`
--

INSERT INTO `pma__table_uiprefs` (`username`, `db_name`, `table_name`, `prefs`, `last_update`) VALUES
('root', 'pickbazar', 'products', '{\"sorted_col\":\"`products`.`state` ASC\"}', '2020-07-07 00:25:48');

--
-- Metadata for table subcategories
--

--
-- Metadata for table users
--

--
-- Metadata for database pickbazar
--
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
