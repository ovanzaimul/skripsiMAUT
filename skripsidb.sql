-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 27, 2021 at 08:31 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `skripsidb`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id_admin` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id_admin`, `username`, `fullname`, `password`) VALUES
(17, 'admin', 'adminullah', '$2b$12$qbtJS.5xl69dqJ7Cw0pMTeCga1dchEopcBd5cwAj2Ly72qE/3knmu'),
(25, 'ovan', 'Ovan zaimul', '$2b$12$Y9iFyn.Zo7VTMJzlcVEJB.lQAZIlX58G518NspFt.pjly3.Yktc2W');

-- --------------------------------------------------------

--
-- Table structure for table `karyawan`
--

CREATE TABLE `karyawan` (
  `nama` varchar(100) NOT NULL,
  `tgllahir` date NOT NULL,
  `npwp` varchar(100) NOT NULL,
  `ktp` varchar(100) NOT NULL,
  `id_karyawan` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `karyawan`
--

INSERT INTO `karyawan` (`nama`, `tgllahir`, `npwp`, `ktp`, `id_karyawan`) VALUES
('Pieter Leony MP,S.Kom', '1986-08-07', '71.461.851.9-432.000', '3275051608860020', 29),
('Juricho Sattya Putra,SSn', '1990-01-25', '44.951.895.0-432.000', '3275052601900004', 30),
('Edward Roosdartono SL,ST', '1966-09-20', '26.394.869.7-517.000', '3374092109660000', 35),
('Sandi Ariyadi,S,Kom', '1986-03-03', '70.942.832.0-805.000', '7371123103880000', 36),
('Guntur Roosminto ML Am', '1972-05-11', '92.224.517.7-543.000', '3402121205720000', 37),
('Irvan SM.Am', '1974-01-27', '83.884.321.7-805.000', '7371132701740001', 38),
('Yussi Vegillia', '1996-06-02', '-', '9109014208980002', 50);

-- --------------------------------------------------------

--
-- Table structure for table `kriteria`
--

CREATE TABLE `kriteria` (
  `id_kriteria` int(11) NOT NULL,
  `kode` varchar(100) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `bobot` float(5,4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kriteria`
--

INSERT INTO `kriteria` (`id_kriteria`, `kode`, `nama`, `bobot`) VALUES
(1, 'C1', 'Kedisiplinan', 0.2500),
(2, 'C2', 'Inisiatif', 0.2500),
(3, 'C3', 'Kepatuhan', 0.2500),
(20, 'C4', 'Tanggung Jawab', 0.2500);

-- --------------------------------------------------------

--
-- Table structure for table `penilaian`
--

CREATE TABLE `penilaian` (
  `id_penilaian` int(11) NOT NULL,
  `id_kriteria` int(11) NOT NULL,
  `id_karyawan` int(11) NOT NULL,
  `id_subkriteria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `penilaian`
--

INSERT INTO `penilaian` (`id_penilaian`, `id_kriteria`, `id_karyawan`, `id_subkriteria`) VALUES
(153, 1, 29, 10),
(154, 2, 29, 3),
(155, 3, 29, 12),
(156, 20, 29, 33),
(157, 1, 30, 16),
(158, 2, 30, 4),
(159, 3, 30, 28),
(160, 20, 30, 30),
(161, 1, 35, 16),
(162, 2, 35, 2),
(163, 3, 35, 20),
(164, 20, 35, 33),
(165, 1, 36, 16),
(166, 2, 36, 2),
(167, 3, 36, 29),
(168, 20, 36, 31),
(169, 1, 37, 22),
(170, 2, 37, 3),
(171, 3, 37, 29),
(172, 20, 37, 31),
(173, 1, 38, 10),
(174, 2, 38, 2),
(175, 3, 38, 27),
(176, 20, 38, 34),
(177, 1, 50, 10),
(178, 2, 50, 3),
(179, 3, 50, 29),
(180, 20, 50, 34);

-- --------------------------------------------------------

--
-- Table structure for table `subkriteria`
--

CREATE TABLE `subkriteria` (
  `id_subkriteria` int(11) NOT NULL,
  `id_kriteria` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `bobot` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subkriteria`
--

INSERT INTO `subkriteria` (`id_subkriteria`, `id_kriteria`, `nama`, `bobot`) VALUES
(2, 2, 'Sangat Baik', '5'),
(3, 2, 'Baik', '4'),
(4, 2, 'Cukup', '3'),
(5, 2, 'Buruk', '2'),
(10, 1, 'Sangat baik', '5'),
(12, 3, 'Cukup', '3'),
(13, 1, 'Buruk', '2'),
(15, 1, 'Cukup', '3'),
(16, 1, 'Sangat Buruk', '1'),
(20, 3, 'Buruk', '2'),
(22, 1, 'Baik', '4'),
(23, 2, 'Sangat Buruk', '1'),
(27, 3, 'Sangat Buruk', '1'),
(28, 3, 'Baik', '4'),
(29, 3, 'Sangat baik', '5'),
(30, 20, 'Sangat baik', '5'),
(31, 20, 'Baik', '4'),
(32, 20, 'Cukup', '3'),
(33, 20, 'Buruk', '2'),
(34, 20, 'Sangat Buruk', '1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id_admin`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `karyawan`
--
ALTER TABLE `karyawan`
  ADD PRIMARY KEY (`id_karyawan`);

--
-- Indexes for table `kriteria`
--
ALTER TABLE `kriteria`
  ADD PRIMARY KEY (`id_kriteria`);

--
-- Indexes for table `penilaian`
--
ALTER TABLE `penilaian`
  ADD PRIMARY KEY (`id_penilaian`),
  ADD KEY `id_karyawan` (`id_karyawan`),
  ADD KEY `id_subkriteria` (`id_subkriteria`),
  ADD KEY `id_kriteria` (`id_kriteria`);

--
-- Indexes for table `subkriteria`
--
ALTER TABLE `subkriteria`
  ADD PRIMARY KEY (`id_subkriteria`),
  ADD KEY `id_kriteria` (`id_kriteria`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id_admin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `karyawan`
--
ALTER TABLE `karyawan`
  MODIFY `id_karyawan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT for table `kriteria`
--
ALTER TABLE `kriteria`
  MODIFY `id_kriteria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `penilaian`
--
ALTER TABLE `penilaian`
  MODIFY `id_penilaian` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=197;

--
-- AUTO_INCREMENT for table `subkriteria`
--
ALTER TABLE `subkriteria`
  MODIFY `id_subkriteria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `penilaian`
--
ALTER TABLE `penilaian`
  ADD CONSTRAINT `penilaian_ibfk_1` FOREIGN KEY (`id_karyawan`) REFERENCES `karyawan` (`id_karyawan`) ON DELETE CASCADE,
  ADD CONSTRAINT `penilaian_ibfk_2` FOREIGN KEY (`id_subkriteria`) REFERENCES `subkriteria` (`id_subkriteria`) ON DELETE CASCADE,
  ADD CONSTRAINT `penilaian_ibfk_3` FOREIGN KEY (`id_kriteria`) REFERENCES `kriteria` (`id_kriteria`) ON DELETE CASCADE;

--
-- Constraints for table `subkriteria`
--
ALTER TABLE `subkriteria`
  ADD CONSTRAINT `subkriteria_ibfk_1` FOREIGN KEY (`id_kriteria`) REFERENCES `kriteria` (`id_kriteria`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
