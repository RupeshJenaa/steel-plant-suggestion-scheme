-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 18, 2025 at 04:28 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `signup`
--

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `employeeid` varchar(50) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `designation` varchar(100) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `department` varchar(100) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`employeeid`, `name`, `designation`, `age`, `department`, `password`) VALUES
('100020', 'Rajesh Khanna', 'Software Engineer', 45, 'IT', 'Abcd1000'),
('10002001', NULL, NULL, NULL, NULL, 'Abcd20000'),
('10003456', NULL, NULL, NULL, NULL, 'Chotku2004'),
('1001', 'Rajesh Kumar', 'Senior Engineer', 32, 'Production', 'Password123'),
('1002', 'Priya Sharma', 'Safety Officer', 28, 'Safety & Environment', 'SecurePass1'),
('100200', 'jbvghsbdgb2', 'sbchsbv', 23, 'wjhfahs', '$2b$10$CJC7j/u65xDT2fifrjX1juF5nqcc1wZ4B0SNlrcpaBZ'),
('1003', 'Amit Singh', 'Quality Analyst', 35, 'Quality Control', 'QualityPass2'),
('1004', 'Meera Patel', 'Process Engineer', 30, 'Process Optimization', 'ProcessKey3'),
('1010', NULL, NULL, NULL, NULL, 'Password123'),
('1011', NULL, NULL, NULL, NULL, 'Abcd1011'),
('1012', 'XYYZ', 'Senior Engineer', 40, 'Production', '$2b$10$obbe72/DmmGFjQYOkYnnVeIJyFt5JU7barU1Xx6WQLw'),
('12312322', NULL, NULL, NULL, NULL, 'Abcd2345'),
('12345', 'gsgdkasfsdksafk', 'afhkjajkgkjgkskng', 56, 'gbkjjksghwgh', '$2b$10$3OJC2B8t2Cz0HT5qMzx6NeTDV1hym1PBhQeFHhZYepc'),
('123455', 'gshchsfhshgfh', 'jfbwajgbjsgbn', 23, 'rwhkfhsgjskgj', '$2b$10$koVoogHZaqtjCzmTlNBMTuPQQMhaqpDYg3AXTd56C6v'),
('12345678', NULL, NULL, NULL, NULL, 'Abc12345'),
('123457', 'Andhegwwrgg', 'sbjfkjdkjsnkb', 23, 'fjesegjgkhvja', '$2b$10$cw4IXTzhXcBzY5YtXYY.D.9V9MWrYfYwlRYc0xKXGyr'),
('123458', 'jsksvsjvsnjbgsnjb', 'wkgwbsfhjds', 23, 'wgsbxgb', 'Abcd1234'),
('124357', 'Chotku', 'Senior Engineer', 20, 'IT', 'Chotku2004');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`employeeid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
