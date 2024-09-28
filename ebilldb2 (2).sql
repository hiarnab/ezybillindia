-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 09, 2024 at 04:12 PM
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
-- Database: `ebilldb2`
--

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(2, '2024_06_22_185400_create_tblMasterCountry_table', 1),
(3, '2024_06_22_185400_create_tblcall_table', 1),
(4, '2024_06_22_185400_create_tblconsultation_table', 1),
(5, '2024_06_22_185400_create_tbldemo_table', 1),
(6, '2024_06_22_185400_create_tblimagemenu_table', 1),
(7, '2024_06_22_185400_create_tblitemcategory_table', 1),
(8, '2024_06_22_185400_create_tblitemname_table', 1),
(9, '2024_06_22_185400_create_tblmastercustomer_table', 1),
(10, '2024_06_22_185400_create_tblmasterproperty_table', 1),
(11, '2024_06_22_185400_create_tblotp_table', 1),
(12, '2024_06_22_185400_create_tblproductname_table', 1),
(13, '2024_06_22_185403_add_foreign_keys_to_tblimagemenu_table', 1),
(14, '2024_06_22_185403_add_foreign_keys_to_tblitemcategory_table', 1),
(15, '2024_06_22_185403_add_foreign_keys_to_tblitemname_table', 1),
(16, '2024_06_22_185403_add_foreign_keys_to_tblmasterproperty_table', 1),
(17, '2024_06_22_185403_add_foreign_keys_to_tblproductname_table', 1),
(18, '2024_07_16_122444_create_tblpackageplan_table', 1),
(20, '2024_07_16_133608_create_tblnotification_table', 1),
(23, '2024_07_16_183333_create_tbltransaction_table', 1),
(24, '2024_07_19_191620_create_tblsettings_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tblcall`
--

CREATE TABLE `tblcall` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `subject` varchar(100) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `date` varchar(100) NOT NULL,
  `time` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tblcall`
--

INSERT INTO `tblcall` (`id`, `name`, `email`, `subject`, `phone`, `date`, `time`) VALUES
(1, 'namrata', 'fff@ggg.com', 'Restaurant Management Software (RMS)', '9898898989', '2023-08-08', '13:21'),
(2, 'Prottay Basu', 'prottaybasu@gmail.com', 'Hotel Management Software (HMS)', '7003238122', '2023-09-08', '15:00'),
(3, 'Prottay Basu', 'prottaybasu@gmail.com', 'Hotel Management Software (HMS)', '7003238122', '2023-08-16', '19:00'),
(4, 'ss', 'qewa@f.c', 'Restaurant Management Software (RMS)', '78451', '2023-08-27', '14:15'),
(5, 'test', 'suryansgoel1998@gmail.com', 'Hotel Management Software (HMS)', '7980632384', '2023-08-28', '19:19'),
(6, 'we', 'ananyachatte@gma', 'Hotel Management Software (HMS)', '888888', '2023-09-01', '05:17'),
(7, 'we', 'jhhh@gmil.com', 'Hotel Management Software (HMS)', '7777', '2023-09-08', '06:19'),
(8, 'Test test hello ', 'anany03@gmail.com', 'Restaurant Management Software (RMS)', '7888', '2023-08-31', '22:59'),
(9, 'gourangoaich@gmail.com', 'gourangoaich@gmail.com', 'Hotel Management Software (HMS)', '9062462268', '2023-09-08', '13:45'),
(10, 'test', 'ttt@hhh.com', 'Restaurant Management Software (RMS)', '6676767899', '2023-09-25', '17:14'),
(11, 'G', 'gourangoaich@gmail.com', 'Hotel Management Software (HMS)', '9062462268', '2023-10-10', '18:00'),
(12, 'Gourango Aich', 'gourangoaich@gmail.com', 'Hotel Management Software (HMS)', '9062462268', '2023-11-02', '15:45'),
(13, 'Gourango Aich', 'gourangoaich@gmail.com', 'Hotel Management Software (HMS)', '9062462268', '2023-11-07', '11:08'),
(14, 'Gourango', 'gourangoaich@gmail.com', 'Hotel Management Software (HMS)', '9062462268', '2023-12-27', '10:33'),
(15, 'GOURANGO AICH', 'gourangoaich@gmail.com', 'Cloud Menu(CM)', '9062462268', '2023-12-31', '20:56'),
(16, 'gourango aich', 'gourangoaich@gmail.com', 'Hotel Management Software (HMS)', '9062462268', '2024-02-20', '18:00'),
(17, 'gourango aich', 'gourangoaich@gmail.com', 'Hotel Management Software (HMS)', '9062462268', '2024-01-19', '23:38'),
(18, 'Suryans', 'suryansgoel1998@gmail.com', 'Hotel Management Software (HMS)', '1121111111', '2024-01-22', '14:07'),
(19, 'Surya', 'suryansgoel@zohomail.in', 'Hotel Management Software (HMS)', '1212121211', '2024-01-20', '14:32'),
(20, 'Kamal Lahiri', 'kamallahiri@gmail.com', 'Hotel Management Software (HMS)', '9476190294', '2024-01-27', '15:24'),
(21, 'Surya', 'suryansgoel1998@gmail.com', 'Restaurant Management Software (RMS)', '7980632384', '2024-01-27', '19:07'),
(22, 'Surya', 'suryansgoel1998@gmail.com', 'Hotel Management Software (HMS)', '7980632384', '2024-01-27', '17:11'),
(23, 'Surya', 'suryansgoel1998@gmail.com', 'Hotel Management Software (HMS)', '7980632384', '2024-01-27', '17:22'),
(24, 'gourangoaich@gmail.com', 'gourangoaich@gmail.com', 'Hotel Management Software (HMS)', '9062462268', '2024-03-01', '14:36'),
(25, 'gourangoaich@gmail.com', 'gourangoaich@gmail.com', 'Restaurant Management Software (RMS)', '9062462268', '2024-02-28', '03:19'),
(26, 's goel', 'suryansgoel1998@gmail.com', 'Restaurant Management Software (RMS)', '7980632384', '2024-03-28', '03:12'),
(27, 'Gourango Aich', 'gourangoaich@gmail.com', 'Restaurant Management Software (RMS)', '9062462268', '2024-03-20', '19:50'),
(28, 'Dr. Gourango', 'gourangoaich@gmail.com', 'Cloud Menu(CM)', '9062462268', '2024-03-21', '18:30'),
(29, 'gourangoaich@gmail.com', 'gourangoaich@gmail.com', 'Hotel Management Software (HMS)', '9062462268', '2024-05-18', '16:19'),
(30, 'Gourango Aich', 'gourangoaich@gmail.com', 'Hotel Management Software (HMS)', '9062462268', '2024-07-22', '11:45');

-- --------------------------------------------------------

--
-- Table structure for table `tblconsultation`
--

CREATE TABLE `tblconsultation` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `subject` varchar(100) NOT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `pincode` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tblconsultation`
--

INSERT INTO `tblconsultation` (`id`, `name`, `email`, `subject`, `phone`, `state`, `pincode`) VALUES
(1, 'maths', 'ggg@kkk.com', 'Customized Tools & Reporting', '9886756554', 'comp', NULL),
(2, 'we', 'we', 'System Requirements & Infrastructure', 'we', 'we', NULL),
(3, 'kkkkkk', 'kkkkkk', 'Pricing Inquiry', '8888888888', 'hhh', NULL),
(4, 'test', 'ttt@ggg.com', 'Customized Tools & Reporting', '6868686868', 'comp', '676767'),
(5, 'G', 'gourangoaich@gmail.com', 'System Requirements & Infrastructure', '9062462268', 'West Bengal ', '700129'),
(6, 'test', 'namratadas334@gmail.com', 'Customized Tools & Reporting', '8775645454', 'Assam', '786001'),
(7, 'GOURANGOAICH AICH', 'gourangoaich@gmail.com', 'System Requirements & Infrastructure', '9062462268', 'WEST BENGAL', '700129'),
(8, 'GOURANGO AICH', 'gourangoaich@gmail.com', 'System Requirements & Infrastructure', '9062462268', 'West Bengal', '700129'),
(9, 'GOURANGOAICH AICH', 'gourangoaich@gmail.com', 'System Requirements & Infrastructure', '9062462268', 'West Bengal', '700129'),
(10, 'GOURANGOAICH AICH', 'gourangoaich@gmail.com', 'System Requirements & Infrastructure', '9062462268', 'West Bengal', '700129');

-- --------------------------------------------------------

--
-- Table structure for table `tbldemo`
--

CREATE TABLE `tbldemo` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `subject` varchar(100) NOT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `pincode` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbldemo`
--

INSERT INTO `tbldemo` (`id`, `name`, `email`, `subject`, `phone`, `state`, `pincode`) VALUES
(1, 'namrata', 'ggg@ddd.com', 'Restaurant Management Software (RMS) Demo', '7878787878', 'maths', NULL),
(2, 'test', 'ggg@gg.com', 'Cloud Menu (CM)', '6767676767', 'test', '676767'),
(3, 'GOURANGOAICH AICH', 'gourangoaich@gmail.com', 'Combined Demo', '9062462268', 'WEST BENGAL', '700129'),
(4, 'Gourango Aich', 'gourangoaich@gmail.com', 'Combined Demo', '9062462268', 'West Bengal', '700129'),
(5, 'qeafdscz', 'suryansgoel1998@gmail.com', 'Hotel Management Software (HMS) Demo', '7980632384', 'WB', '713301'),
(6, 'TEST', 'suryangoel1998@gmail.com', 'Restaurant Management Software (RMS) Demo', '7980632384', 'WB', '710000'),
(7, 'aefibhc efa', 'suryansgoel1998@gmail.com', 'Restaurant Management Software (RMS) Demo', '7485612395', 'WB', '784652'),
(8, 'TEST', 'suryansgoel1998@gmail.com', 'Restaurant Management Software (RMS) Demo', '1234567890', 'WB', '123'),
(9, 'suryansgoel1998@gmail.com', 'suryansgoel1998@gmail.com', 'Hotel Management Software (HMS) Demo', '1234567890', 'WB', '123'),
(10, 'suryansgoel1998@gmail.com', 'suryansgoel1998@gmail.com', 'Hotel Management Software (HMS) Demo', '7418529630', 'erf', '741'),
(11, 'Suryans', 'suryansgoel1998@gmail.com', 'Restaurant Management Software (RMS) Demo', '7980632384', 'WB', '711331'),
(12, 'TEST', 'suryansgoel1998@gmail.com', 'Restaurant Management Software (RMS) Demo', '7980632384', 'WB', '713301'),
(13, 'test', 'namratadas334@gmail.com', 'Restaurant Management Software (RMS) Demo', '5667676768', 'ASSAM', '786001'),
(14, 'GOURANGO AICH', 'gourangoaich@gmail.com', 'Restaurant Management Software (RMS) Demo', '9062462268', 'West Bengal', '700129'),
(15, 'GOURANGOAICH AICH', 'gourangoaich@gmail.com', 'Restaurant Management Software (RMS) Demo', '9062462268', 'West Bengal', '700129'),
(16, 'GOURANGOAICH AICH', 'gourangoaich@gmail.com', 'Cloud Menu (CM)', '9062462268', 'West Bengal', '700129'),
(17, 'GOURANGOAICH AICH', 'ezybillindia@gmail.com', 'Restaurant Management Software (RMS) Demo', '9062462268', 'West Bengal', '700129'),
(18, 'GOURANGOAICH AICH', 'gourangoaich@gmail.com', 'Restaurant Management Software (RMS) Demo', '9062462268', 'West Bengal', '700129'),
(19, 'ranit', 'ranitg.timd@gmail.com', 'Hotel Management Software (HMS) Demo', '9748970011', 'West Bengal', '753951'),
(20, 'arnab', 'arnabr.timd@gmail.com', 'Restaurant Management Software (RMS) Demo', '9088777845', 'West Bengal', '753951');

-- --------------------------------------------------------

--
-- Table structure for table `tblimagemenu`
--

CREATE TABLE `tblimagemenu` (
  `MenuID` bigint(20) NOT NULL,
  `PropertyNo` bigint(20) NOT NULL,
  `PropertyMenuName` varchar(100) NOT NULL,
  `ImageSequence` varchar(8192) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tblimagemenu`
--

INSERT INTO `tblimagemenu` (`MenuID`, `PropertyNo`, `PropertyMenuName`, `ImageSequence`) VALUES
(34, 30, 'hhuh-1683731183164', '[{\"imageUrl\":\"https://myawsbucket-free.s3.amazonaws.com/30_40/30_1691553974751\",\"text\":\"Test Data 3\"}]'),
(35, 40, 'huh-1683731644037', '[{\"imageUrl\":\"https://myawsbucket-free.s3.amazonaws.com/40_50/40_1691553980030\",\"text\":\"Test Data 3\"}]'),
(36, 60, 'sc-1683733239214', '[{\"imageUrl\":\"https://myawsbucket-free.s3.amazonaws.com/60_70/ImageMenu/60_1691905155985\",\"text\":\"Heeloo\"},{\"imageUrl\":\"https://myawsbucket-free.s3.amazonaws.com/60_70/ImageMenu/60_1691905220340\",\"text\":\"Heeloo\"}]'),
(37, 10, 'P1-1682527722997', '[{\"imageUrl\":\"https://myawsbucket-free.s3.amazonaws.com/60_70/ImageMenu/60_1691905155985\",\"text\":\"Heeloo\"},{\"imageUrl\":\"https://myawsbucket-free.s3.amazonaws.com/60_70/ImageMenu/60_1691905220340\",\"text\":\"Heeloo\"}]'),
(40, 320, 'Aich-1705738280480', '[{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/320_220/ImageMenu/320_1706362848338\",\"text\":\"Hot Sip\"},{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/320_220/ImageMenu/320_1706362865782\",\"text\":\"Pett or Mann Varna Chahiye\"},{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/320_220/ImageMenu/320_1706362878048\",\"text\":\"Let`s Stay Together\"},{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/320_220/ImageMenu/320_1706362899422\",\"text\":\"Swaad North India Ka\"},{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/320_220/ImageMenu/320_1706362909150\",\"text\":\"Save Water\"}]'),
(41, 370, 'Chaat-puchka-1708021514996', '[{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/370_240/ImageMenu/370_1708180485110\"},{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/370_240/ImageMenu/370_1708180496566\"},{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/370_240/ImageMenu/370_1708181293330\"},{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/370_240/ImageMenu/370_1708181384535\"},{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/370_240/ImageMenu/370_1708181410942\"},{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/370_240/ImageMenu/370_1708181457114\"},{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/370_240/ImageMenu/370_1708181488384\"},{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/370_240/ImageMenu/370_1708181500366\"}]'),
(42, 380, 'The-Crown Hotel & Restaurent-1708612538472', '[{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/380_250/ImageMenu/380_1708612645126\"},{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/380_250/ImageMenu/380_1708612649868\"},{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/380_250/ImageMenu/380_1708612657044\"},{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/380_250/ImageMenu/380_1708612663193\"},{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/380_250/ImageMenu/380_1708612668916\"},{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/380_250/ImageMenu/380_1708612674754\"},{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/380_250/ImageMenu/380_1708612681310\"}]'),
(43, 360, 'Test-1707025658172', '[]'),
(44, 390, 'HOTEL-GOLDEN TULIP-1711555958650', '[{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/390_260/ImageMenu/390_1711556451643\"},{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/390_260/ImageMenu/390_1711556464767\"},{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/390_260/ImageMenu/390_1711556474441\"},{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/390_260/ImageMenu/390_1711556482784\"},{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/390_260/ImageMenu/390_1711556490358\"},{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/390_260/ImageMenu/390_1711556498698\"},{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/390_260/ImageMenu/390_1711556505494\"},{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/390_260/ImageMenu/390_1711556511193\"}]'),
(45, 400, 'HOTEL-DE L PRETOM-1711649749691', '[{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/400_270/ImageMenu/400_1711649843256\"}]'),
(46, 410, 'RAJ-2-1713271448313', '[{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/410_280/ImageMenu/410_1713271527139\"}]'),
(47, 420, 'HOTEL-RATNADEEP-1715971874222', '[{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/420_290/ImageMenu/420_1715972051030\"},{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/420_290/ImageMenu/420_1715972055642\"},{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/420_290/ImageMenu/420_1715972060897\"},{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/420_290/ImageMenu/420_1715972066764\"},{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/420_290/ImageMenu/420_1715972074512\"},{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/420_290/ImageMenu/420_1715972080452\"},{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/420_290/ImageMenu/420_1715972087504\"},{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/420_290/ImageMenu/420_1715972093898\"},{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/420_290/ImageMenu/420_1715972105503\"},{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/420_290/ImageMenu/420_1715972115642\"},{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/420_290/ImageMenu/420_1715972126051\"},{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/420_290/ImageMenu/420_1715972136019\"},{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/420_290/ImageMenu/420_1715972143287\"},{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/420_290/ImageMenu/420_1715972151083\"}]'),
(48, 440, 'Club-24-1718009071880', '[{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/440_300/ImageMenu/440_1718009270660\"},{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/440_300/ImageMenu/440_1718009277490\"},{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/440_300/ImageMenu/440_1718009284849\"},{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/440_300/ImageMenu/440_1718009296341\"},{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/440_300/ImageMenu/440_1718009324958\"},{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/440_300/ImageMenu/440_1718009333514\"},{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/440_300/ImageMenu/440_1718009342245\"},{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/440_300/ImageMenu/440_1718009355544\"},{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/440_300/ImageMenu/440_1718009367063\"},{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/440_300/ImageMenu/440_1718009378567\"},{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/440_300/ImageMenu/440_1718009391110\"},{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/440_300/ImageMenu/440_1718009403602\"},{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/440_300/ImageMenu/440_1718009416838\"},{\"imageUrl\":\"https://ezybill-menu.s3.amazonaws.com/440_300/ImageMenu/440_1718009430714\"}]'),
(49, 520, 'woo-momo-1723537962656', '[{\"imageUrl\":{\"success\":false,\"status\":500,\"message\":\"Error uploading object from S3.\"}}]'),
(50, 540, 'Ranit-Hotel-1724500050259', '[{\"imageUrl\":\"https://ezybill.s3.amazonaws.com/540_400/ImageMenu/540_1724501095068\",\"text\":\"Momo\"}]'),
(51, 550, 'Chicken-Kunfu-1725267118911', '[{\"imageUrl\":\"https://ezybill.s3.amazonaws.com/550_400/ImageMenu/550_1725267315874\"},{\"imageUrl\":\"https://ezybill.s3.amazonaws.com/550_400/ImageMenu/550_1725267326759\"},{\"imageUrl\":\"https://ezybill.s3.amazonaws.com/550_400/ImageMenu/550_1725267404672\"}]'),
(52, 560, 'Chicken-woo-1725272244332', '[{\"imageUrl\":\"https://ezybill.s3.amazonaws.com/560_400/ImageMenu/560_1725272549193\"}]'),
(53, 570, 'satya-hotel-1725276331873', '[{\"imageUrl\":\"https://ezybill.s3.amazonaws.com/570_410/ImageMenu/570_1725277082729\"}]'),
(54, 590, 'test-resturent-1725441080768', '[{\"imageUrl\":\"https://ezybill.s3.amazonaws.com/590_420/ImageMenu/590_1725441184852\"}]'),
(55, 600, 'sarvanu-resturant-1725446415506', '[{\"imageUrl\":\"https://ezybill.s3.amazonaws.com/600_430/ImageMenu/600_1725446565565\"}]'),
(56, 610, 'Ranit-Hotel-1725881441635', '[{\"imageUrl\":\"https://ezybill.s3.amazonaws.com/610_440/ImageMenu/610_1725882614127\"}]');

-- --------------------------------------------------------

--
-- Table structure for table `tblitemcategory`
--

CREATE TABLE `tblitemcategory` (
  `ID` bigint(20) DEFAULT NULL,
  `CategoryRN` bigint(20) NOT NULL,
  `PropertyNo` bigint(20) NOT NULL,
  `ItemCategory` varchar(50) NOT NULL,
  `NoteOnItemCategory` varchar(150) NOT NULL DEFAULT 'NONE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tblitemcategory`
--

INSERT INTO `tblitemcategory` (`ID`, `CategoryRN`, `PropertyNo`, `ItemCategory`, `NoteOnItemCategory`) VALUES
(NULL, 71, 580, 'test', 'NONE'),
(NULL, 72, 550, 'Indian', 'NONE'),
(NULL, 73, 550, 'Chinese', 'NONE'),
(NULL, 74, 610, 'Indian', 'NONE'),
(NULL, 75, 610, 'Chinese', 'NONE');

-- --------------------------------------------------------

--
-- Table structure for table `tblitemname`
--

CREATE TABLE `tblitemname` (
  `ID` bigint(20) DEFAULT NULL,
  `CategoryID` bigint(20) DEFAULT NULL,
  `ItemNameRN` bigint(20) NOT NULL,
  `CategoryRN` bigint(20) NOT NULL,
  `PropertyNo` bigint(20) NOT NULL,
  `ItemName` varchar(50) NOT NULL,
  `NoteOnItem` varchar(150) NOT NULL DEFAULT 'NONE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tblitemname`
--

INSERT INTO `tblitemname` (`ID`, `CategoryID`, `ItemNameRN`, `CategoryRN`, `PropertyNo`, `ItemName`, `NoteOnItem`) VALUES
(NULL, NULL, 7, 71, 580, 'suba', 'NONE'),
(NULL, NULL, 8, 71, 580, 'subb', 'NONE'),
(NULL, NULL, 9, 72, 550, 'veg', 'NONE'),
(NULL, NULL, 10, 72, 550, 'Non Veg', 'NONE'),
(NULL, NULL, 11, 74, 610, 'Non Veg', 'NONE'),
(NULL, NULL, 12, 74, 610, 'Veg', 'NONE');

-- --------------------------------------------------------

--
-- Table structure for table `tblmastercountry`
--

CREATE TABLE `tblmastercountry` (
  `country_id` int(11) NOT NULL,
  `country_name` varchar(100) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='This table will maintain the list of the countries where EzyBill is going to operate';

-- --------------------------------------------------------

--
-- Table structure for table `tblmastercustomer`
--

CREATE TABLE `tblmastercustomer` (
  `ID` bigint(20) DEFAULT NULL,
  `CustomerNo` bigint(20) NOT NULL,
  `CustomerName` varchar(100) NOT NULL,
  `RegMobile` bigint(20) NOT NULL,
  `RegEmail` varchar(100) DEFAULT NULL,
  `State` varchar(100) NOT NULL,
  `Country` varchar(100) NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `AllotedPropertyQuota` int(11) NOT NULL DEFAULT 4,
  `LastDateModalDisplayed` datetime DEFAULT current_timestamp(),
  `CreatedAt` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tblmastercustomer`
--

INSERT INTO `tblmastercustomer` (`ID`, `CustomerNo`, `CustomerName`, `RegMobile`, `RegEmail`, `State`, `Country`, `isActive`, `AllotedPropertyQuota`, `LastDateModalDisplayed`, `CreatedAt`) VALUES
(NULL, 10, 'TEst', 0, '0', 'Puducherry', 'IN', 1, 4, '2023-07-20 17:46:07', '2024-05-24 13:20:43'),
(NULL, 40, 'uhuh', 5655656565, 'test2@gmail.com', 'Bihar', 'jjb', 1, 4, '2023-05-10 15:06:22', '2024-05-24 13:20:43'),
(NULL, 50, 'namrata_test', 7625378927, NULL, 'Jharkhand', 'uhu', 1, 4, '2024-01-23 08:30:28', '2024-05-24 13:20:43'),
(NULL, 60, 'nam_test', 6763698298, NULL, 'Haryana', 'india', 1, 4, '2024-02-04 07:47:10', '2024-05-24 13:20:43'),
(NULL, 70, 'n_test', 898988989, NULL, 'Andhra Pradesh', 'india', 1, 4, '2024-01-17 15:58:05', '2024-05-24 13:20:43'),
(NULL, 80, 'testuser', 6767655555, NULL, 'Meghalaya', 'india', 1, 4, '2023-05-10 15:47:21', '2024-05-24 13:20:43'),
(NULL, 90, 'namrataTest', 283723787, NULL, 'Chhattisgarh', 'India', 1, 4, '2024-01-16 17:54:57', '2024-05-24 13:20:43'),
(NULL, 110, 'namrata test name', 9276726762, NULL, 'Jharkhand', 'india', 1, 4, '2023-06-05 15:35:41', '2024-05-24 13:20:43'),
(NULL, 120, 'no name', 528981898, NULL, 'Kerala', 'india', 1, 4, '2023-06-05 15:48:18', '2024-05-24 13:20:43'),
(NULL, 130, 'nam test user', 1827767627, NULL, 'Bihar', 'india', 1, 4, '2023-06-05 15:57:42', '2024-05-24 13:20:43'),
(NULL, 140, 'namedit', 2971826762, NULL, 'Himachal Pradesh', 'india', 1, 4, '2023-06-05 16:02:53', '2024-05-24 13:20:43'),
(NULL, 150, 'Namrata', 9101043391, 'namratadas334@gmail.com', 'Haryana', 'India', 1, 4, '2024-01-17 14:46:57', '2024-05-24 13:20:43'),
(NULL, 160, 'nam-test', 1972676276, NULL, 'Maharashtra', 'india', 1, 4, '2023-06-07 12:38:58', '2024-05-24 13:20:43'),
(NULL, 170, 'nam-test-user', 9954646830, NULL, 'Kerala', 'india', 1, 4, '2023-06-07 13:02:16', '2024-05-24 13:20:43'),
(NULL, 180, 'namratatset', 1727872878, NULL, 'Jharkhand', 'india', 1, 4, '2023-06-10 19:02:47', '2024-05-24 13:20:43'),
(NULL, 190, 'yyytest', 6767676767, NULL, 'Jammu and Kashmir', 'ygyg', 1, 4, '2023-08-07 08:14:58', '2024-05-24 13:20:43'),
(NULL, 200, 'testtest', 7980632384, 'suryansgoel1998@gmail.com', 'Kerala', 'india', 1, 4, '2024-01-15 17:13:42', '2024-05-24 13:20:43'),
(NULL, 210, 'Michael Moulin', 7003238122, 'prottaybasu@gmail.com', 'Jammu and Kashmir', 'France', 1, 4, '2023-12-05 11:06:25', '2024-05-24 13:20:43'),
(NULL, 220, 'Gourango Aich', 9062462268, 'gourangoaich@gmail.com', 'West Bengal', 'India', 1, 4, '2024-01-24 18:11:35', '2024-05-24 13:20:43'),
(NULL, 230, 'Kamal Lahiri', 9804648024, 'kamallahiri@gmail.com', 'West Bengal', 'India', 1, 4, '2024-01-27 10:09:05', '2024-05-24 13:20:43'),
(NULL, 240, 'Pankaj agarwal ', 9547805647, NULL, 'West Bengal', 'India', 1, 4, '2024-02-15 18:25:14', '2024-05-24 13:20:43'),
(NULL, 250, 'Raja Das', 7980764110, NULL, 'West Bengal', 'India', 1, 4, '2024-02-22 14:35:38', '2024-05-24 13:20:43'),
(NULL, 260, 'SAYANTAN SARKAR', 9434999995, NULL, 'West Bengal', 'INDIA', 1, 4, '2024-03-27 16:12:38', '2024-05-24 13:20:43'),
(NULL, 270, 'ARUP GANGULY', 9434041718, NULL, 'West Bengal', 'India', 1, 4, '2024-03-28 18:15:49', '2024-05-24 13:20:43'),
(NULL, 280, 'Anubhaav Dutta', 9804999888, NULL, 'West Bengal', 'India', 1, 4, '2024-04-16 12:44:08', '2024-05-24 13:20:43'),
(NULL, 290, 'SUNNY CHOUDHURY', 8670465405, NULL, 'West Bengal', 'INDIA', 1, 4, '2024-05-17 18:51:14', '2024-05-24 13:20:43'),
(NULL, 300, 'Dipankar Dey', 9836062060, NULL, 'West Bengal', 'India', 1, 4, '2024-06-10 08:44:31', '2024-06-10 03:14:31'),
(NULL, 310, 'Wyatt', 7250634942, 'rohit@gmail.com', 'Madhya Pradesh', 'Aubrey', 1, 4, '2024-06-20 18:07:22', '2024-06-20 12:37:22'),
(NULL, 320, 'ranit', 9748970012, 'ranitg.timdd@gmail.com', 'West Bengal', 'India', 1, 4, '2024-07-01 19:58:24', '2024-07-01 14:28:24'),
(NULL, 330, 'Arnab', 9088777845, NULL, 'West Bengal', 'italy', 1, 4, '2024-07-22 06:23:02', '2024-07-15 11:11:29'),
(NULL, 340, 'Ranit Ghosh', 9748970013, NULL, 'West Bengal', 'India', 1, 4, '2024-08-05 07:58:09', '2024-08-01 13:36:40'),
(NULL, 350, 'Ranit Ghosh', 9748970055, NULL, 'West Bengal', 'India', 1, 4, '2024-08-12 12:58:54', '2024-08-08 14:05:18'),
(NULL, 360, 'Abhishek', 9564902516, NULL, 'West Bengal', 'India', 1, 4, '2024-08-09 14:17:37', '2024-08-09 08:47:37'),
(NULL, 370, 'Abhishek', 9564902517, NULL, 'West Bengal', 'India', 1, 4, '2024-08-09 15:04:39', '2024-08-09 09:34:39'),
(NULL, 380, 'Ranit Ghosh', 9748970033, NULL, 'West Bengal', 'India', 1, 4, '2024-08-23 07:05:15', '2024-08-13 08:32:42'),
(NULL, 390, 'Ranit Ghosh', 9748970044, NULL, 'West Bengal', 'India', 1, 4, '2024-08-24 16:31:07', '2024-08-24 11:01:07'),
(NULL, 400, 'Ranit Ghosh', 9748970015, NULL, 'West Bengal', 'India', 1, 4, '2024-09-09 07:48:30', '2024-08-24 11:47:30'),
(NULL, 410, 'Satya Chowdhury', 8016399686, NULL, 'West Bengal', 'India', 1, 4, '2024-09-02 16:55:31', '2024-09-02 11:25:31'),
(NULL, 420, 'joydev', 7478362081, NULL, 'West Bengal', 'India', 1, 4, '2024-09-04 12:58:44', '2024-09-04 07:28:44'),
(NULL, 430, 'sarvanu', 9903513706, NULL, 'West Bengal', 'India', 1, 4, '2024-09-04 16:10:15', '2024-09-04 10:40:15'),
(NULL, 440, 'ranit', 9748970011, NULL, 'West Bengal', 'India', 1, 4, '2024-09-09 17:00:41', '2024-09-09 11:30:41');

-- --------------------------------------------------------

--
-- Table structure for table `tblmasterproperty`
--

CREATE TABLE `tblmasterproperty` (
  `ID` bigint(20) DEFAULT NULL,
  `PropertyNo` bigint(20) NOT NULL,
  `CustomerNo` bigint(20) NOT NULL,
  `PropType` varchar(100) NOT NULL,
  `PropName` varchar(100) NOT NULL,
  `PropAddress` varchar(100) NOT NULL,
  `PropEmail` varchar(100) NOT NULL,
  `PropPhone` bigint(20) NOT NULL,
  `PropState` varchar(100) NOT NULL,
  `PropCountry` varchar(100) NOT NULL,
  `MenuType` varchar(100) NOT NULL DEFAULT 'text',
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `hasActiveDesktopLicense` tinyint(1) NOT NULL DEFAULT 0,
  `PropertyMenuName` varchar(100) DEFAULT NULL,
  `isMenuActive` tinyint(1) DEFAULT 1,
  `rms_active` tinyint(1) NOT NULL DEFAULT 0,
  `rms_cust_id` bigint(20) DEFAULT NULL,
  `rms_prop_id` bigint(20) DEFAULT NULL,
  `LastSyncDate` datetime DEFAULT NULL,
  `QRLocation` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tblmasterproperty`
--

INSERT INTO `tblmasterproperty` (`ID`, `PropertyNo`, `CustomerNo`, `PropType`, `PropName`, `PropAddress`, `PropEmail`, `PropPhone`, `PropState`, `PropCountry`, `MenuType`, `isActive`, `hasActiveDesktopLicense`, `PropertyMenuName`, `isMenuActive`, `rms_active`, `rms_cust_id`, `rms_prop_id`, `LastSyncDate`, `QRLocation`) VALUES
(NULL, 10, 10, 'Hotel', 'P1', 'PA1', 'PE1', 7980, 'Andhra Pradesh', 'PC', 'image', 1, 0, 'P1-1682527722997', 1, 0, NULL, NULL, NULL, 'http://localhost:4000/assets/qrcodes/P1-1682527722997.png'),
(NULL, 30, 40, 'Restaurant', 'hhuh', 'bbb', 'huhu@test.com', 0, 'Bihar', 'nb', 'text', 1, 0, 'hhuh-1683731183164', 1, 0, NULL, NULL, NULL, 'http://localhost:4000/assets/qrcodes/hhuh-1683731183164.png'),
(NULL, 40, 50, 'Restaurant', 'huh', 'hihi', 'huhu@test.com', 0, 'Himachal Pradesh', 'hih', 'text', 1, 0, 'huh-1683731644037', 1, 0, NULL, NULL, NULL, 'http://localhost:4000/assets/qrcodes/huh-1683731644037.png'),
(NULL, 50, 60, 'Restaurant', 'huhu', 'gguu', 'dtdt@test.com', 0, 'Haryana', 'gug', 'Image menu', 1, 0, 'huhu-1683732960425', 1, 0, NULL, NULL, NULL, 'http://localhost:4000/assets/qrcodes/huhu-1683732960425.png'),
(NULL, 60, 70, 'Restaurant', 'PropName', 'ouu', 'buhu@tset.com', 7797977798, 'Himachal Pradesh', 'IND', 'text', 1, 0, 'sc-1683733239214', 1, 0, NULL, NULL, NULL, 'http://localhost:4000/assets/qrcodes/sc-1683733239214.png'),
(NULL, 70, 70, 'Hotel', 'uTEST', 'guguughg', 'huhu@test.com', 0, 'Uttarakhand', 'gugyhu9j', 'text', 1, 0, 'uhuh-1683733239630', 1, 0, NULL, NULL, NULL, 'http://localhost:4000/assets/qrcodes/uhuh-1683733239630.png'),
(NULL, 80, 70, 'Restaurant', 'huhu', '@tset.com', 'huh', 0, 'Himachal Pradesh', 'hihi', 'image', 1, 1, 'huhu-1683733240017', 1, 0, NULL, NULL, NULL, 'http://localhost:4000/assets/qrcodes/huhu-1683733240017.png'),
(NULL, 100, 80, 'Restaurant', 'jnjnjn', 'hhihih', 'njnj@test.com', 0, 'Goa', 'hih', 'text', 1, 0, 'jnjnjn-1683733642322', 1, 0, NULL, NULL, NULL, 'http://localhost:4000/assets/qrcodes/jnjnjn-1683733642322.png'),
(NULL, 120, 90, 'Restaurant', 'testname', 'iqiswuhsuh', 'test@gmail.com', 289819828, 'Assam', 'india', 'text', 1, 0, 'testname-1684589258914', 1, 0, NULL, NULL, NULL, 'http://localhost:4000/assets/qrcodes/testname-1684589258914.png'),
(NULL, 150, 110, 'Restaurant', 'namrata property name', 'namrata property address', 'test@gmail.com', 72989982787, 'Manipur', 'namrata property country', 'text', 1, 0, 'namrata-property name-1685979342399', 1, 0, NULL, NULL, NULL, 'http://localhost:4000/assets/qrcodes/namrata-property name-1685979342399.png'),
(NULL, 160, 120, 'Restaurant', 'prop', 'address', 'prop@test.com', 7782862768, 'Jammu and Kashmir', 'india', 'text', 1, 0, 'prop-1685980098951', 1, 0, NULL, NULL, NULL, 'http://localhost:4000/assets/qrcodes/prop-1685980098951.png'),
(NULL, 170, 130, 'Restaurant', 'nam props', 'uhjaugs', 'namprops@tset.com', 892787827, 'Jammu and Kashmir', 'india', 'text', 1, 0, 'nam-props-1685980662965', 1, 0, NULL, NULL, NULL, 'http://localhost:4000/assets/qrcodes/nam-props-1685980662965.png'),
(NULL, 180, 140, 'Restaurant', 'namtestedited', 'namtestpropaddress', 'namtestprop@test.com', 829788727, 'Jharkhand', 'india', 'text', 1, 0, 'namtestprop-1685980973738', 1, 0, NULL, NULL, NULL, 'http://localhost:4000/assets/qrcodes/namtestprop-1685980973738.png'),
(NULL, 200, 180, 'Restaurant', 'namratatsetprop', 'address', 'test@gmail.com', 829829829, 'Mizoram', 'india', 'text', 1, 0, 'namratatsetprop-1686423768146', 1, 0, NULL, NULL, NULL, 'http://localhost:4000/assets/qrcodes/namratatsetprop-1686423768146.png'),
(NULL, 210, 90, 'Restaurant', 'propname', 'address', 'prop@test.com', 1892972878, 'Bihar', 'india', 'text', 1, 0, 'propname-1686670992431', 1, 0, NULL, NULL, NULL, 'http://localhost:4000/assets/qrcodes/propname-1686670992431.png'),
(NULL, 220, 90, 'Restaurant', 'tsetname', 'addrss', 'tsetname@gmail.com', 787287872, 'Odisha', 'india', 'text', 1, 0, 'tsetname-1686685164744', 1, 0, NULL, NULL, NULL, 'http://localhost:4000/assets/qrcodes/tsetname-1686685164744.png'),
(NULL, 230, 10, 'Hotel', 'Test2', 'test23', 'test2', 123, 'West Bengal', 'IN', 'text', 1, 0, 'Test2-1686938751543', 1, 0, NULL, NULL, NULL, 'http://localhost:4000/assets/qrcodes/Test2-1686938751543.png'),
(NULL, 240, 70, 'Restaurant', 'testttt', 'ftaftf', 'tes@gmail.com', 0, 'Nagaland', 'ftftf', 'text', 1, 0, 'testttt-1687273610205', 1, 0, NULL, NULL, NULL, 'http://localhost:4000/assets/qrcodes/testttt-1687273610205.png'),
(NULL, 250, 190, 'Hotel', 'yyyprop', 'address', 'yyy@ss.com', 9878676767, 'Himachal Pradesh', 'india', 'text', 1, 0, 'yyyprop-1691396099761', 1, 0, NULL, NULL, NULL, 'http://localhost:4000/assets/qrcodes/yyyprop-1691396099761.png'),
(NULL, 260, 140, 'Hotel', 'ttest', 'address', 'test@gmail.com', 289389893, 'Karnataka', 'india', 'text', 1, 0, 'ttest-1691397309961', 1, 0, NULL, NULL, NULL, 'http://localhost:4000/assets/qrcodes/ttest-1691397309961.png'),
(NULL, 280, 210, 'Hotel', 'Hyatt Regency Pvt. Ltd', 'JA-1, JA Block, Sector 3, Bidhannagar, Kolkata, West Bengal 700106', 'hyattreg@gmai.com', 6290109098, 'Telangana', 'India', 'image', 1, 0, 'Hyatt-Regency-1691942062377', 1, 0, NULL, NULL, NULL, 'http://localhost:4000/assets/qrcodes/Hyatt-Regency-1691942062377.png'),
(NULL, 290, 210, 'Hotel', 'Taj Bengal', '34-B, Belvedere Rd, Alipore, Kolkata, West Bengal 700027', 'prottaybasu@gmail.com', 8420990997, 'West Bengal', 'India', 'text', 1, 1, 'Taj-Bengal-1691942062488', 1, 0, NULL, NULL, NULL, 'http://localhost:4000/assets/qrcodes/Taj-Bengal-1691942062488.png'),
(NULL, 310, 200, 'Hotel', 'awdz', 'qwdas', 'wdasc@qwaf.aefcs', 1111111111, 'Goa', 'wqdsac', 'image', 1, 0, 'awdz-1705342915926', 1, 0, NULL, NULL, NULL, 'https://ezybill-menu.s3.amazonaws.com/QRCodes/awdz-1705342915926.png'),
(NULL, 320, 220, 'Sample', 'EzyBill India', 'Barasat', 'gourangoaich@gmail.com', 9062462268, 'West Bengal', 'India', 'image', 1, 0, 'Aich-1705738280480', 1, 0, NULL, NULL, NULL, 'https://ezybill-menu.s3.amazonaws.com/QRCodes/Aich-1705738280480.png'),
(NULL, 330, 220, 'Restaurant', 'Aich', '136 Basunagar Gate no 1', 'gourangoaich@gmail.com', 9062462268, 'West Bengal', 'Hotel', 'text', 1, 0, 'Aich-1706098752555', 1, 0, NULL, NULL, NULL, 'https://ezybill-menu.s3.amazonaws.com/QRCodes/Aich-1706098752555.png'),
(NULL, 340, 230, 'Hotel', 'Hotel Barasat LLP', 'Malancha Road, P.O. Noapara, Barasat, Kolkata 700125', 'kamallahiri@gmail.com', 9804648024, 'West Bengal', 'India', 'text', 1, 0, 'Hotel-Barasat LLP-1706350145091', 1, 0, NULL, NULL, NULL, 'https://ezybill-menu.s3.amazonaws.com/QRCodes/Hotel-Barasat LLP-1706350145091.png'),
(NULL, 350, 230, 'Restaurant', 'Barasat Cafe LLP', 'Malancha Road, P.O. Noapara, Barasat, Kolkata 700125', 'kamallahiri@gmail.com', 9804648024, 'West Bengal', 'India', 'text', 1, 0, 'Barasat-Cafe LLP-1706350145324', 1, 0, NULL, NULL, NULL, 'https://ezybill-menu.s3.amazonaws.com/QRCodes/Barasat-Cafe LLP-1706350145324.png'),
(NULL, 360, 150, 'Hotel', 'Test ', 'Address', 'test@gmail.com', 5225555555, 'Goa', 'Hotel', 'text', 1, 0, 'Test-1707025658172', 1, 0, NULL, NULL, NULL, 'https://ezybill-menu.s3.amazonaws.com/QRCodes/Test-1707025658172.png'),
(NULL, 370, 240, 'Restaurant', 'Chaat puchka ', 'Dinbazar , opp nahata house', 'pankajagarwal58313@gmail.comp', 9547805647, 'West Bengal', 'India', 'image', 1, 0, 'Chaat-puchka-1708021514996', 1, 0, NULL, NULL, NULL, 'https://ezybill-menu.s3.amazonaws.com/QRCodes/Chaat-puchka-1708021514996.png'),
(NULL, 380, 250, 'Hotel', 'The Crown Hotel & Restaurent', '103/D/2, Jessore Rd, Madhyamgram, Kol - 700129', 'thecrowninn5@gmail.com', 6290402549, 'West Bengal', 'India', 'image', 1, 0, 'The-Crown Hotel & Restaurent-1708612538472', 1, 0, NULL, NULL, NULL, 'https://ezybill-menu.s3.amazonaws.com/QRCodes/The-Crown Hotel & Restaurent-1708612538472.png'),
(NULL, 390, 260, 'Hotel', 'HOTEL GOLDEN TULIP', 'KADAMTALA, JALPAIGURI', 'HOTELGOLDENTULIPJPG@GMAIL.COM', 9434999995, 'West Bengal', 'India', 'image', 1, 0, 'HOTEL-GOLDEN TULIP-1711555958650', 1, 0, NULL, NULL, NULL, 'https://ezybill-menu.s3.amazonaws.com/QRCodes/HOTEL-GOLDEN TULIP-1711555958650.png'),
(NULL, 400, 270, 'Hotel', 'HOTEL DE L PRETOM', 'HOTEL DE L PRETOM,DBC ROAD,KADAMTALA', 'hoteldelpretomjpg@gmail.com', 9434041718, 'West Bengal', 'India', 'image', 1, 0, 'HOTEL-DE L PRETOM-1711649749691', 1, 0, NULL, NULL, NULL, 'https://ezybill-menu.s3.amazonaws.com/QRCodes/HOTEL-DE L PRETOM-1711649749691.png'),
(NULL, 410, 280, 'Restaurant', 'RAJ-2', '307,Bamkinpally East Madhyamgram', 'dutta.anubhav94@gmail.com', 8910336633, 'West Bengal', 'India', 'image', 1, 0, 'RAJ-2-1713271448313', 1, 0, NULL, NULL, NULL, 'https://ezybill-menu.s3.amazonaws.com/QRCodes/RAJ-2-1713271448313.png'),
(NULL, 420, 290, 'Hotel', 'HOTEL RATNADEEP', 'Club Road, Opp SBI Main Branch, Jalpaiguri, 735101', 'hotelratnadeep2010@gmail.com', 8670465405, 'West Bengal', 'India', 'image', 1, 0, 'HOTEL-RATNADEEP-1715971874222', 1, 0, NULL, NULL, NULL, 'https://ezybill-menu.s3.amazonaws.com/QRCodes/HOTEL-RATNADEEP-1715971874222.png'),
(NULL, 430, 150, 'Hotel', 'test', 'address', 'ggg@gmail.com', 9101043391, 'Bihar', 'Hotel', 'text', 1, 0, 'test-1717339754602', 1, 0, NULL, NULL, NULL, 'https://ezybill-menu.s3.amazonaws.com/QRCodes/test-1717339754602.png'),
(NULL, 440, 300, 'Restaurant', 'Club 24', 'Sangam Market , Barasat, Kol 126', 'dontipz@gmail.com', 9836062060, 'West Bengal', 'India', 'image', 1, 0, 'Club-24-1718009071880', 1, 0, NULL, NULL, NULL, 'https://ezybill-menu.s3.amazonaws.com/QRCodes/Club-24-1718009071880.png'),
(NULL, 450, 310, 'Hotel', 'Samson', 'Shana', 'wakuki@mailinator.com', 7250634942, 'Chhattisgarh', 'India', 'text', 1, 0, 'Samson-1718906842972', 1, 0, NULL, NULL, NULL, 'https://ezybill-menu.s3.amazonaws.com/QRCodes/Samson-1718906842972.png'),
(NULL, 460, 320, 'Hotel', 'Hotel Krishna', 'kolkata', 'abhishek.timd@gmail.com', 9748970011, 'West Bengal', 'India', 'image', 1, 0, 'Hotel-Krishna-1719844104013', 1, 0, NULL, NULL, NULL, '[object Object]'),
(NULL, 470, 330, 'Hotel', 'property', 'address', 'property@gmail.com', 9874563216, 'West Bengal', 'India', 'text', 1, 0, 'property-1721041889054', 1, 0, NULL, NULL, NULL, '[object Object]'),
(NULL, 480, 340, 'Restaurant', 'Yumniastic', 'kolkata', 'yumniastic@gmail.com', 9748970011, 'West Bengal', 'India', 'text', 1, 0, 'Yumniastic-1722519400685', 1, 0, NULL, NULL, NULL, '[object Object]'),
(NULL, 490, 350, 'Restaurant', 'test hotel', 'kolkata', 'hotel@gmail.com', 9748970011, 'West Bengal', 'India', 'text', 1, 0, 'test-hotel-1723125918948', 1, 0, NULL, NULL, NULL, '[object Object]'),
(NULL, 500, 360, 'Restaurant', 'Abhishek Resturent', 'kolkata', 'abhi@gmail.com', 9564902516, 'West Bengal', 'India', 'text', 1, 0, 'Abhishek-Resturent-1723193257380', 1, 0, NULL, NULL, NULL, '[object Object]'),
(NULL, 510, 370, 'Restaurant', 'Abhishek Resturent', 'kolkata', 'abhishek1@gmail.com', 9564902517, 'West Bengal', 'India', 'text', 1, 0, 'Abhishek-Resturent-1723196079467', 1, 0, NULL, NULL, NULL, '[object Object]'),
(NULL, 520, 380, 'Restaurant', 'woow momo', 'kolkata', 'momo@gmail.com', 9748970033, 'West Bengal', 'India', 'text', 1, 0, 'woo-momo-1723537962656', 1, 0, NULL, NULL, NULL, '[object Object]'),
(NULL, 530, 390, 'Hotel', 'Ranit Inn', 'kolkata', 'ranit123@gmail.com', 9748970044, 'West Bengal', 'India', 'text', 1, 0, 'Ranit-Inn-1724497267506', 1, 0, NULL, NULL, NULL, '[object Object]'),
(NULL, 540, 400, 'Hotel', 'Ranit Hotel', 'kolkata', 'ranitg.timd@gmail.com', 9748970011, 'West Bengal', 'India', 'text', 1, 0, 'Ranit-Hotel-1724500050259', 1, 0, NULL, NULL, NULL, 'https://ezybill.s3.amazonaws.com/QRCodes/Ranit-Hotel-1724500050259.png'),
(NULL, 550, 400, 'Hotel', 'Chicken Kunfu', 'kolkata', 'kunfu@gmail.com', 9748970011, 'West Bengal', 'Hotel', 'text', 1, 0, 'Chicken-Kunfu-1725267118911', 1, 0, NULL, NULL, NULL, 'http://localhost:4000/assets/qrcodes/Chicken-Kunfu-1725267118911.png'),
(NULL, 560, 400, 'Restaurant', 'Chicken woo', 'kolkata', 'woo@gmail.com', 9748970011, 'West Bengal', 'Hotel', 'image', 1, 0, 'Chicken-woo-1725272244332', 1, 0, NULL, NULL, NULL, 'https://ezybill.s3.amazonaws.com/QRCodes/Chicken-woo-1725272244332.png'),
(NULL, 570, 410, 'Hotel', 'satya hotel', 'kolkata', 'satyahotel@gmail.com', 8526549871, 'Daman and Diu', 'India', 'image', 1, 0, 'satya-hotel-1725276331873', 1, 0, NULL, NULL, NULL, 'https://ezybill.s3.amazonaws.com/QRCodes/satya-hotel-1725276331873.png'),
(NULL, 580, 420, 'Hotel', 'joydev hotel', 'kolkata', 'joydev@gmail.com', 7478362081, 'West Bengal', 'India', 'text', 1, 0, 'joydev-hotel-1725434924634', 1, 0, NULL, NULL, NULL, 'https://ezybill.s3.amazonaws.com/QRCodes/joydev-hotel-1725434924634.png'),
(NULL, 590, 420, 'Restaurant', 'test resturent', 'kolkata', 'test@gmail.com', 9748970011, 'West Bengal', 'Hotel', 'text', 0, 0, 'test-resturent-1725441080768', 0, 0, NULL, NULL, NULL, 'https://ezybill.s3.amazonaws.com/QRCodes/test-resturent-1725441080768.png'),
(NULL, 600, 430, 'Restaurant', 'sarvanu resturant', 'kolkata', 'sarvanu.timd@gmail.com', 9903513706, 'Chandigarh', 'India', 'text', 1, 0, 'sarvanu-resturant-1725446415506', 1, 0, NULL, NULL, NULL, 'https://ezybill.s3.amazonaws.com/QRCodes/sarvanu-resturant-1725446415506.png'),
(NULL, 610, 440, 'Restaurant', 'Ranit Hotel', 'kolkata', 'ranitg@gmail.com', 9748970011, 'West Bengal', 'India', 'image', 1, 0, 'Ranit-Hotel-1725881441635', 1, 1, 2, 6, NULL, 'https://ezybill.s3.amazonaws.com/QRCodes/Ranit-Hotel-1725881441635.png');

-- --------------------------------------------------------

--
-- Table structure for table `tblnotification`
--

CREATE TABLE `tblnotification` (
  `id` int(11) NOT NULL,
  `cus_id` bigint(20) DEFAULT NULL,
  `is_sent` enum('yes','no') NOT NULL DEFAULT 'yes',
  `is_receive` enum('yes','no') NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tblotp`
--

CREATE TABLE `tblotp` (
  `id` int(11) NOT NULL,
  `channel` varchar(100) NOT NULL,
  `otp` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tblotp`
--

INSERT INTO `tblotp` (`id`, `channel`, `otp`, `created`) VALUES
(1, '7250634942', 524385, '2024-06-24 11:16:44'),
(2, '7250634942', 515418, '2024-06-24 11:18:18'),
(3, '7250634942', 363966, '2024-06-24 11:19:22'),
(4, '9062462268', 686728, '2024-06-24 12:04:36'),
(5, 'gourangoaich@gmail.com', 686728, '2024-06-24 12:04:37'),
(6, '9804648024', 277655, '2024-06-24 12:05:00'),
(7, '9062462268', 631132, '2024-06-25 11:41:04'),
(8, 'gourangoaich@gmail.com', 631132, '2024-06-25 11:41:04'),
(9, '9748970011', 749017, '2024-07-01 14:26:42'),
(10, '9748970011', 327871, '2024-07-01 14:28:45'),
(11, '9748970011', 921308, '2024-07-02 06:05:03'),
(12, '9748970011', 221641, '2024-07-08 06:22:15'),
(13, '9748970011', 130377, '2024-07-09 13:06:31'),
(14, 'ranitg.timd@gmail.com', 130377, '2024-07-09 13:06:31'),
(15, '9748970011', 356922, '2024-07-10 07:35:10'),
(30, '9748970011', 495975, '2024-07-31 12:58:01'),
(31, 'ranitg.timd@gmail.com', 495975, '2024-07-31 12:58:01'),
(32, '9748970011', 211375, '2024-07-31 13:33:07'),
(33, 'ranitg.timd@gmail.com', 211375, '2024-07-31 13:33:07'),
(34, '9748970011', 665953, '2024-08-01 08:07:10'),
(35, 'ranitg.timd@gmail.com', 665953, '2024-08-01 08:07:10'),
(36, '9748970011', 136763, '2024-08-01 13:36:10'),
(37, '9748970011', 324922, '2024-08-01 13:40:52'),
(38, '9748970011', 314585, '2024-08-02 05:38:14'),
(39, '9748970011', 772519, '2024-08-02 11:51:11'),
(40, '9748970011', 622262, '2024-08-03 06:05:23'),
(41, '9748970011', 787442, '2024-08-03 10:22:41'),
(42, '9748970011', 656766, '2024-08-03 12:17:38'),
(43, '9748970011', 383532, '2024-08-05 07:57:47'),
(44, '9748970011', 198885, '2024-08-05 14:21:59'),
(45, '9748970011', 655924, '2024-08-05 14:38:23'),
(46, '9748970011', 802777, '2024-08-08 14:05:06'),
(47, '9748970011', 743118, '2024-08-08 14:05:36'),
(48, '9748970011', 807106, '2024-08-09 07:11:56'),
(49, '9564902516', 181388, '2024-08-09 08:47:22'),
(50, '9564902516', 323824, '2024-08-09 08:59:55'),
(51, '9564902517', 517841, '2024-08-09 09:34:23'),
(52, '9748970011', 693634, '2024-08-12 12:58:33'),
(53, '9748970033', 250961, '2024-08-13 08:32:20'),
(54, '9748970033', 846746, '2024-08-13 13:02:54'),
(55, '9748970033', 954955, '2024-08-14 06:48:51'),
(56, '9748970033', 887654, '2024-08-14 13:00:59'),
(57, '9748970033', 895347, '2024-08-16 12:13:33'),
(58, '9748970033', 493047, '2024-08-17 07:09:49'),
(59, '9748970033', 316772, '2024-08-17 07:34:31'),
(60, '9748970033', 727212, '2024-08-23 07:04:56'),
(61, '9748970033', 782446, '2024-08-23 14:23:41'),
(62, '9748970033', 798109, '2024-08-24 10:36:46'),
(63, '9748970044', 697824, '2024-08-24 11:00:54'),
(64, '9748970044', 769177, '2024-08-24 11:01:30'),
(65, '9748970011', 832013, '2024-08-24 11:47:08'),
(66, '9748970011', 218459, '2024-08-24 11:49:58'),
(67, '9748970011', 351809, '2024-08-26 06:39:53'),
(68, '9748970011', 112850, '2024-08-26 10:58:35'),
(69, '9748970011', 689875, '2024-08-26 13:00:27'),
(70, '9748970011', 512806, '2024-08-27 06:53:15'),
(71, '9748970011', 518083, '2024-08-27 13:25:37'),
(72, '9748970011', 357489, '2024-08-28 10:43:57'),
(73, '9748970011', 748052, '2024-08-30 09:40:52'),
(74, '9748970011', 294030, '2024-08-31 07:50:38'),
(75, '9748970011', 662131, '2024-09-02 08:50:06'),
(76, '08016399686', 106303, '2024-09-02 11:25:19'),
(77, '8016399686', 847210, '2024-09-02 11:35:15'),
(78, '9748970011', 338883, '2024-09-03 08:00:18'),
(79, '7478362081', 351751, '2024-09-04 07:28:31'),
(80, '7478362081', 591360, '2024-09-04 07:29:07'),
(81, '09903513706', 769476, '2024-09-04 10:40:00'),
(82, '9903513706', 508531, '2024-09-04 10:40:22'),
(83, '9903513706', 808079, '2024-09-04 10:41:11'),
(84, '9903513706', 734497, '2024-09-04 10:41:50'),
(85, '7478362081', 992080, '2024-09-04 11:01:17'),
(86, '7478362081', 934929, '2024-09-04 12:59:17'),
(87, '7478362081', 426671, '2024-09-04 13:29:54'),
(88, '9748970011', 577231, '2024-09-09 07:48:17'),
(89, '8016399686', 408657, '2024-09-09 11:27:37'),
(90, '9748970011', 508624, '2024-09-09 11:30:30'),
(91, '9748970011', 156691, '2024-09-09 11:30:48');

-- --------------------------------------------------------

--
-- Table structure for table `tblpackageplan`
--

CREATE TABLE `tblpackageplan` (
  `id` int(11) NOT NULL,
  `package_master_id` int(11) DEFAULT NULL,
  `property_id` bigint(11) DEFAULT NULL,
  `amount_without_tax` int(11) DEFAULT NULL,
  `amount_with_tax` int(11) DEFAULT NULL,
  `bank_transaction_id` int(11) DEFAULT NULL,
  `order_status` enum('pending','complete','canceled','') DEFAULT 'pending',
  `start_date` timestamp NULL DEFAULT NULL,
  `expired_at` timestamp NULL DEFAULT NULL,
  `is_active` varchar(255) DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tblpackageplan`
--

INSERT INTO `tblpackageplan` (`id`, `package_master_id`, `property_id`, `amount_without_tax`, `amount_with_tax`, `bank_transaction_id`, `order_status`, `start_date`, `expired_at`, `is_active`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 8, 520, 0, NULL, NULL, 'complete', '2024-08-12 18:30:00', '2024-08-22 18:30:00', '', 380, NULL, '2024-08-13 08:32:44', NULL),
(3, 10, 520, 2550, NULL, NULL, 'complete', '2024-08-13 18:30:00', '2024-09-13 18:30:00', 'active', 380, NULL, '2024-08-14 13:21:13', NULL),
(4, 11, 520, 4800, NULL, NULL, 'complete', '2024-11-11 18:30:00', '2025-05-10 18:30:00', NULL, 380, NULL, '2024-08-14 13:25:11', NULL),
(5, 12, 520, 8400, NULL, NULL, 'complete', '2025-05-10 18:30:00', '2026-05-10 18:30:00', NULL, 380, NULL, '2024-08-14 13:28:43', NULL),
(6, 9, 520, 900, NULL, NULL, 'complete', '2026-05-10 18:30:00', '2026-06-09 18:30:00', NULL, 380, NULL, '2024-08-14 13:31:44', NULL),
(7, 8, 530, 0, NULL, NULL, 'complete', '2024-08-23 18:30:00', '2024-09-12 18:30:00', '', 390, NULL, '2024-08-24 11:01:09', NULL),
(8, 8, 540, 0, NULL, NULL, 'complete', '2024-08-23 18:30:00', '2024-09-12 18:30:00', '', 400, NULL, '2024-08-24 11:47:30', NULL),
(17, 10, 540, 2550, NULL, 17, 'complete', '2024-08-23 18:30:00', '2024-12-11 18:30:00', '', 400, NULL, '2024-08-27 11:34:36', NULL),
(18, 9, 540, 900, NULL, 18, 'complete', '2024-08-23 18:30:00', '2025-01-10 18:30:00', '', 400, NULL, '2024-08-27 12:45:48', NULL),
(19, 10, 540, 2550, NULL, 19, 'complete', '2024-08-23 18:30:00', '2025-04-10 18:30:00', '', 400, NULL, '2024-08-27 13:26:44', NULL),
(20, 9, 540, 900, NULL, 20, 'complete', '2024-08-23 18:30:00', '2025-05-10 18:30:00', '', 400, NULL, '2024-08-27 13:44:42', NULL),
(21, 9, 540, 900, NULL, 21, 'complete', '2024-08-23 18:30:00', '2025-06-09 18:30:00', '', 400, NULL, '2024-08-27 13:50:49', NULL),
(22, 9, 540, 900, NULL, 22, 'complete', '2024-08-23 18:30:00', '2025-07-09 18:30:00', '', 400, NULL, '2024-08-27 13:52:39', NULL),
(23, 9, 540, 900, NULL, 23, 'complete', '2024-08-23 18:30:00', '2025-08-08 18:30:00', '', 400, NULL, '2024-08-27 13:53:12', NULL),
(24, 9, 540, 900, NULL, 24, 'complete', '2024-08-23 18:30:00', '2025-09-07 18:30:00', '', 400, NULL, '2024-08-27 13:59:38', NULL),
(25, 9, 540, 900, NULL, 25, 'complete', '2024-08-23 18:30:00', '2025-10-07 18:30:00', '', 400, NULL, '2024-08-27 14:00:49', NULL),
(26, 13, 530, 0, NULL, NULL, 'pending', '2024-08-27 18:30:00', '2024-08-26 18:30:00', '', NULL, NULL, '2024-08-28 09:40:29', NULL),
(27, 13, 530, 0, NULL, NULL, 'pending', '2024-08-27 18:30:00', '2024-08-26 18:30:00', '', NULL, NULL, '2024-08-28 09:57:06', NULL),
(28, 13, 530, 0, NULL, NULL, 'pending', '2024-08-27 18:30:00', '2024-08-26 18:30:00', '', NULL, NULL, '2024-08-28 10:09:08', NULL),
(29, 13, 530, 0, NULL, NULL, 'pending', '2024-08-27 18:30:00', '2024-08-26 18:30:00', '', NULL, NULL, '2024-08-28 10:11:47', NULL),
(30, 13, 530, 0, NULL, NULL, 'pending', '2024-08-27 18:30:00', '2024-08-26 18:30:00', '', NULL, NULL, '2024-08-28 10:20:59', NULL),
(31, 13, 530, 0, NULL, NULL, 'pending', '2024-08-27 18:30:00', '2024-08-26 18:30:00', '', NULL, NULL, '2024-08-28 10:42:16', NULL),
(32, 13, 530, 0, NULL, NULL, 'pending', '2024-08-27 18:30:00', NULL, 'active', NULL, NULL, '2024-08-28 10:44:43', NULL),
(33, 13, 540, 0, NULL, NULL, 'pending', '2024-08-27 18:30:00', '2024-08-26 18:30:00', '', NULL, NULL, '2024-08-28 11:03:59', NULL),
(34, 9, 540, 900, NULL, 26, 'complete', '2024-08-27 18:30:00', '2024-09-26 18:30:00', '', 400, NULL, '2024-08-28 13:26:43', NULL),
(35, 9, 540, 900, NULL, 27, 'complete', '2024-08-27 18:30:00', '2024-10-26 18:30:00', '', 400, NULL, '2024-08-28 13:36:02', NULL),
(36, 9, 540, 900, NULL, 28, 'complete', '2024-08-27 18:30:00', '2024-11-25 18:30:00', '', 400, NULL, '2024-08-28 13:38:37', NULL),
(37, 9, 540, 900, NULL, 29, 'complete', '2024-08-27 18:30:00', '2024-12-25 18:30:00', '', 400, NULL, '2024-08-28 13:45:50', NULL),
(38, 9, 540, 900, NULL, 30, 'complete', '2024-08-27 18:30:00', '2025-01-24 18:30:00', '', 400, NULL, '2024-08-28 13:46:03', NULL),
(39, 9, 540, 900, NULL, 31, 'complete', '2024-08-27 18:30:00', '2025-02-23 18:30:00', '', 400, NULL, '2024-08-28 13:46:20', NULL),
(40, 9, 540, 900, NULL, 32, 'complete', '2024-08-27 18:30:00', '2025-03-25 18:30:00', '', 400, NULL, '2024-08-28 13:46:28', NULL),
(41, 9, 540, 900, NULL, 33, 'complete', '2024-08-27 18:30:00', '2025-04-24 18:30:00', '', 400, NULL, '2024-08-28 13:46:33', NULL),
(42, 9, 540, 900, NULL, 34, 'complete', '2024-08-27 18:30:00', '2025-05-24 18:30:00', '', 400, NULL, '2024-08-28 13:46:40', NULL),
(43, 9, 540, 900, NULL, 35, 'complete', '2024-08-27 18:30:00', '2025-06-23 18:30:00', '', 400, NULL, '2024-08-28 13:47:30', NULL),
(44, 9, 540, 900, NULL, 36, 'complete', '2024-08-27 18:30:00', '2025-07-23 18:30:00', '', 400, NULL, '2024-08-28 13:47:35', NULL),
(45, 9, 540, 900, NULL, 37, 'complete', '2024-08-27 18:30:00', '2025-08-22 18:30:00', '', 400, NULL, '2024-08-28 14:01:54', NULL),
(46, 10, 540, 2550, NULL, 38, 'complete', '2024-08-27 18:30:00', '2025-11-20 18:30:00', '', 400, NULL, '2024-08-28 14:02:31', NULL),
(47, 10, 540, 2550, NULL, 39, 'complete', '2024-08-27 18:30:00', '2026-02-18 18:30:00', '', 400, NULL, '2024-08-28 14:08:26', NULL),
(48, 9, 540, 900, NULL, 40, 'complete', '2024-08-27 18:30:00', '2026-03-20 18:30:00', '', 400, NULL, '2024-08-28 14:09:06', NULL),
(49, 9, 540, 900, NULL, 41, 'complete', '2024-08-27 18:30:00', '2026-04-19 18:30:00', '', 400, NULL, '2024-08-28 14:09:41', NULL),
(50, 9, 540, 900, NULL, 42, 'complete', '2024-08-27 18:30:00', '2026-05-19 18:30:00', '', 400, NULL, '2024-08-28 14:11:30', NULL),
(51, 9, 540, 900, NULL, 43, 'complete', '2024-08-27 18:30:00', '2026-06-18 18:30:00', '', 400, NULL, '2024-08-28 14:16:47', NULL),
(52, 9, 540, 900, NULL, 44, 'complete', '2024-08-27 18:30:00', '2026-07-18 18:30:00', '', 400, NULL, '2024-08-28 14:20:37', NULL),
(53, 9, 540, 900, NULL, 45, 'complete', '2024-08-27 18:30:00', '2026-08-17 18:30:00', '', 400, NULL, '2024-08-28 14:41:37', NULL),
(54, 9, 540, 900, NULL, 46, 'complete', '2024-08-27 18:30:00', '2026-09-16 18:30:00', 'active', 400, NULL, '2024-08-28 14:45:27', NULL),
(55, 8, 550, 0, NULL, NULL, 'complete', '2024-09-01 18:30:00', '2024-09-21 18:30:00', 'active', 400, NULL, '2024-09-02 08:51:58', NULL),
(56, 8, 560, 0, NULL, NULL, 'complete', '2024-09-01 18:30:00', '2024-09-21 18:30:00', 'active', 400, NULL, '2024-09-02 10:17:24', NULL),
(57, 8, 570, 0, NULL, NULL, 'complete', '2024-09-01 18:30:00', '2024-09-21 18:30:00', 'active', 410, NULL, '2024-09-02 11:25:32', NULL),
(58, 8, 580, 0, NULL, NULL, 'complete', '2024-09-03 18:30:00', '2024-09-23 18:30:00', 'active', 420, NULL, '2024-09-04 07:28:45', NULL),
(59, 8, 590, 0, NULL, NULL, 'complete', '2024-09-03 18:30:00', '2024-09-23 18:30:00', 'active', 420, NULL, '2024-09-04 09:11:21', NULL),
(60, 8, 600, 0, NULL, NULL, 'complete', '2024-09-03 18:30:00', '2024-09-23 18:30:00', 'active', 430, NULL, '2024-09-04 10:40:15', NULL),
(61, 8, 610, 0, NULL, NULL, 'complete', '2024-09-08 18:30:00', '2024-10-03 18:30:00', 'active', 440, NULL, '2024-09-09 11:30:42', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tblproductname`
--

CREATE TABLE `tblproductname` (
  `ID` bigint(20) DEFAULT NULL,
  `ItemID` bigint(20) DEFAULT NULL,
  `ProductNameRN` bigint(20) NOT NULL,
  `ItemNameRN` bigint(20) NOT NULL,
  `CategoryRN` bigint(20) NOT NULL,
  `PropertyNo` bigint(20) NOT NULL,
  `ProductName` varchar(50) NOT NULL,
  `NoteOnProduct` varchar(150) NOT NULL DEFAULT 'NONE',
  `UnitPrice` bigint(20) NOT NULL,
  `Unit` varchar(50) NOT NULL,
  `SGSTPC` bigint(20) NOT NULL,
  `CGSTPC` bigint(20) NOT NULL,
  `DiscountAllowed` tinyint(1) NOT NULL DEFAULT 0,
  `ShName` varchar(50) NOT NULL,
  `RoomUnitPrice` bigint(20) NOT NULL,
  `HSNSAC` varchar(20) NOT NULL,
  `IsSuspended` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tblproductname`
--

INSERT INTO `tblproductname` (`ID`, `ItemID`, `ProductNameRN`, `ItemNameRN`, `CategoryRN`, `PropertyNo`, `ProductName`, `NoteOnProduct`, `UnitPrice`, `Unit`, `SGSTPC`, `CGSTPC`, `DiscountAllowed`, `ShName`, `RoomUnitPrice`, `HSNSAC`, `IsSuspended`) VALUES
(NULL, NULL, 1, 7, 71, 580, 'testa', '', 20, '', 0, 0, 0, '', 0, '', 0),
(NULL, NULL, 2, 7, 71, 580, 'twswe', '', 34, '', 0, 0, 0, '', 0, '', 0),
(NULL, NULL, 3, 7, 71, 580, 'dfgr', 'dsfds', 20, 'dfsdf', 45, 85, 0, 'xdfd', 5, 'xdfds', 0),
(NULL, NULL, 4, 7, 71, 580, 'dfgrer', 'dsfds', 20, 'dfsdf', 45, 85, 0, 'xdfd', 5, 'xdfds', 0),
(NULL, NULL, 5, 9, 72, 550, 'Veg Tarka', '', 100, 'plate', 20, 20, 1, '', 0, '', 0),
(NULL, NULL, 6, 10, 72, 550, 'chicken', 'fdgff', 100, 'plate', 10, 10, 1, '', 0, '', 0),
(NULL, NULL, 7, 11, 74, 610, 'Momo', 'chicken', 100, 'plate', 10, 10, 1, '', 0, '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tblrms`
--

CREATE TABLE `tblrms` (
  `id` bigint(20) NOT NULL,
  `rms_cust_id` bigint(20) DEFAULT NULL,
  `rms_prop_id` bigint(20) DEFAULT NULL,
  `menuType` varchar(255) DEFAULT NULL,
  `menu` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tblrms`
--

INSERT INTO `tblrms` (`id`, `rms_cust_id`, `rms_prop_id`, `menuType`, `menu`) VALUES
(1, 1, 3, 'image', '[{\"imageUrl\":\"https://ezybill.s3.amazonaws.com/600_430/ImageMenu/600_1725446565565\"}]'),
(2, 2, 6, 'text', '[{\"imageUrl\":\"https://ezybill.s3.amazonaws.com/70_40/ImageMenu/70_1725880853657\",\"text\":\"\"}]');

-- --------------------------------------------------------

--
-- Table structure for table `tblrms_itemcategory`
--

CREATE TABLE `tblrms_itemcategory` (
  `ID` bigint(20) DEFAULT NULL,
  `CategoryRN` bigint(20) NOT NULL,
  `rms_property_id` bigint(20) NOT NULL,
  `ItemCategory` varchar(255) NOT NULL,
  `NoteOnItemCategory` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tblrms_itemcategory`
--

INSERT INTO `tblrms_itemcategory` (`ID`, `CategoryRN`, `rms_property_id`, `ItemCategory`, `NoteOnItemCategory`) VALUES
(NULL, 1, 6, 'Indian', 'test');

-- --------------------------------------------------------

--
-- Table structure for table `tblrms_itemname`
--

CREATE TABLE `tblrms_itemname` (
  `ID` bigint(20) DEFAULT NULL,
  `CategoryID` bigint(20) DEFAULT NULL,
  `ItemNameRN` bigint(20) NOT NULL,
  `CategoryRN` bigint(20) NOT NULL,
  `rms_property_id` bigint(20) NOT NULL,
  `ItemName` varchar(255) NOT NULL,
  `NoteOnItem` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tblrms_itemname`
--

INSERT INTO `tblrms_itemname` (`ID`, `CategoryID`, `ItemNameRN`, `CategoryRN`, `rms_property_id`, `ItemName`, `NoteOnItem`) VALUES
(NULL, NULL, 1, 1, 6, 'Non Veg', 'test');

-- --------------------------------------------------------

--
-- Table structure for table `tblrms_productname`
--

CREATE TABLE `tblrms_productname` (
  `ID` bigint(20) DEFAULT NULL,
  `ItemID` bigint(20) DEFAULT NULL,
  `ProductNameRN` bigint(20) NOT NULL,
  `ItemNameRN` bigint(20) NOT NULL,
  `CategoryRN` bigint(20) NOT NULL,
  `PropertyNo` bigint(20) NOT NULL,
  `ProductName` varchar(255) NOT NULL,
  `NoteOnProduct` varchar(255) DEFAULT NULL,
  `UnitPrice` bigint(20) DEFAULT NULL,
  `Unit` varchar(255) DEFAULT NULL,
  `SGSTPC` bigint(20) DEFAULT NULL,
  `CGSTPC` bigint(20) DEFAULT NULL,
  `DiscountAllowed` tinyint(1) DEFAULT 0,
  `ShName` varchar(200) DEFAULT NULL,
  `RoomUnitPrice` bigint(20) DEFAULT NULL,
  `HSNSAC` varchar(200) DEFAULT NULL,
  `IsSuspended` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tblrms_productname`
--

INSERT INTO `tblrms_productname` (`ID`, `ItemID`, `ProductNameRN`, `ItemNameRN`, `CategoryRN`, `PropertyNo`, `ProductName`, `NoteOnProduct`, `UnitPrice`, `Unit`, `SGSTPC`, `CGSTPC`, `DiscountAllowed`, `ShName`, `RoomUnitPrice`, `HSNSAC`, `IsSuspended`) VALUES
(NULL, NULL, 1, 1, 1, 6, 'momo', 'sgf', 100, 'plate', 10, 10, 0, NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tblsettings`
--

CREATE TABLE `tblsettings` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `type` enum('trail','monthly','quaterly','half_yearly','yearly','life_time_free') DEFAULT 'trail',
  `days` int(11) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `discount` int(11) DEFAULT NULL,
  `status` enum('active','inactive','','') DEFAULT 'active',
  `created_by` bigint(11) DEFAULT NULL,
  `updated_by` bigint(11) DEFAULT NULL,
  `craeted_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tblsettings`
--

INSERT INTO `tblsettings` (`id`, `title`, `type`, `days`, `amount`, `discount`, `status`, `created_by`, `updated_by`, `craeted_at`, `updated_at`) VALUES
(8, 'trail', 'trail', 30, 0, 0, 'active', 1, NULL, '2024-08-07 12:49:41', '2024-08-07 12:49:41'),
(9, 'monthly', 'monthly', 30, 1000, 10, 'active', 1, NULL, '2024-08-07 12:54:24', '2024-08-07 12:54:24'),
(10, 'quaterly', 'quaterly', 90, 3000, 15, 'active', 1, NULL, '2024-08-08 05:07:18', '2024-08-08 05:07:18'),
(11, 'half yearly', 'half_yearly', 180, 6000, 20, 'active', 1, NULL, '2024-08-08 05:07:18', '2024-08-08 05:07:18'),
(12, 'yearly', 'yearly', 365, 12000, 30, 'active', 1, NULL, '2024-08-08 05:08:10', '2024-08-08 05:08:10'),
(13, 'life_time_free', 'life_time_free', 0, 0, 0, 'active', 1, NULL, '2024-08-24 09:07:49', '2024-08-24 09:07:49');

-- --------------------------------------------------------

--
-- Table structure for table `tbltransaction`
--

CREATE TABLE `tbltransaction` (
  `id` int(11) NOT NULL,
  `package_id` int(11) DEFAULT NULL,
  `package_master_id` int(11) DEFAULT NULL,
  `property_id` bigint(11) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `transaction_no` varchar(255) DEFAULT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `gateway_txn` varchar(255) DEFAULT NULL,
  `rnn` varchar(255) DEFAULT NULL,
  `json_response` varchar(255) DEFAULT NULL,
  `created_by` bigint(11) DEFAULT NULL,
  `updated_by` bigint(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbltransaction`
--

INSERT INTO `tbltransaction` (`id`, `package_id`, `package_master_id`, `property_id`, `amount`, `status`, `transaction_no`, `payment_method`, `gateway_txn`, `rnn`, `json_response`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 4, 11, 520, 4800, 'captured', 'order_OknLFnBmXhKsA7', 'upi', 'pay_OknLN0NPKpnyr0', '379705757104', '{\"id\":\"pay_OknLN0NPKpnyr0\",\"entity\":\"payment\",\"amount\":480000,\"currency\":\"INR\",\"status\":\"captured\",\"order_id\":\"order_OknLFnBmXhKsA7\",\"invoice_id\":null,\"international\":false,\"method\":\"upi\",\"amount_refunded\":0,\"refund_status\":null,\"captured\":true,\"descripti', 380, NULL, '2024-08-14 13:25:11', '2024-08-14 13:25:11'),
(2, NULL, 12, 520, 8400, 'captured', 'order_OknOwboeIXNQmb', 'upi', 'pay_OknP5PTnWczwHp', '205560449350', '{\"id\":\"pay_OknP5PTnWczwHp\",\"entity\":\"payment\",\"amount\":840000,\"currency\":\"INR\",\"status\":\"captured\",\"order_id\":\"order_OknOwboeIXNQmb\",\"invoice_id\":null,\"international\":false,\"method\":\"upi\",\"amount_refunded\":0,\"refund_status\":null,\"captured\":true,\"descripti', 380, NULL, '2024-08-14 13:28:43', '2024-08-14 13:28:43'),
(3, 6, 9, 520, 900, 'captured', 'order_OknSAr5oq8yvxn', 'upi', 'pay_OknSHy5H8FUTlI', '347535971293', '{\"id\":\"pay_OknSHy5H8FUTlI\",\"entity\":\"payment\",\"amount\":90000,\"currency\":\"INR\",\"status\":\"captured\",\"order_id\":\"order_OknSAr5oq8yvxn\",\"invoice_id\":null,\"international\":false,\"method\":\"upi\",\"amount_refunded\":0,\"refund_status\":null,\"captured\":true,\"descriptio', 380, NULL, '2024-08-14 13:31:44', '2024-08-14 13:31:44'),
(4, NULL, 10, 540, 2550, 'captured', 'order_Opt6mOzxIRFjOK', 'upi', 'pay_Opt70iZvqEco0e', '471047029121', '{\"id\":\"pay_Opt70iZvqEco0e\",\"entity\":\"payment\",\"amount\":255000,\"currency\":\"INR\",\"status\":\"captured\",\"order_id\":\"order_Opt6mOzxIRFjOK\",\"invoice_id\":null,\"international\":false,\"method\":\"upi\",\"amount_refunded\":0,\"refund_status\":null,\"captured\":true,\"descripti', 400, NULL, '2024-08-27 10:18:46', '2024-08-27 10:18:46'),
(5, NULL, 9, 540, 900, 'captured', 'order_OptDv4vdZk6eKk', 'upi', 'pay_OptE2fM89IZkYL', '884939365240', '{\"id\":\"pay_OptE2fM89IZkYL\",\"entity\":\"payment\",\"amount\":90000,\"currency\":\"INR\",\"status\":\"captured\",\"order_id\":\"order_OptDv4vdZk6eKk\",\"invoice_id\":null,\"international\":false,\"method\":\"upi\",\"amount_refunded\":0,\"refund_status\":null,\"captured\":true,\"descriptio', 400, NULL, '2024-08-27 10:25:45', '2024-08-27 10:25:45'),
(6, NULL, 9, 540, 900, 'captured', 'order_OptFhdQeeDen99', 'upi', 'pay_OptFoWrx4YmRqr', '337675185623', '{\"id\":\"pay_OptFoWrx4YmRqr\",\"entity\":\"payment\",\"amount\":90000,\"currency\":\"INR\",\"status\":\"captured\",\"order_id\":\"order_OptFhdQeeDen99\",\"invoice_id\":null,\"international\":false,\"method\":\"upi\",\"amount_refunded\":0,\"refund_status\":null,\"captured\":true,\"descriptio', 400, NULL, '2024-08-27 10:27:06', '2024-08-27 10:27:06'),
(7, NULL, 11, 540, 4800, 'captured', 'order_OptJ4pabsT5Him', 'upi', 'pay_OptJCHJuFZpNdy', '138182359938', '{\"id\":\"pay_OptJCHJuFZpNdy\",\"entity\":\"payment\",\"amount\":480000,\"currency\":\"INR\",\"status\":\"captured\",\"order_id\":\"order_OptJ4pabsT5Him\",\"invoice_id\":null,\"international\":false,\"method\":\"upi\",\"amount_refunded\":0,\"refund_status\":null,\"captured\":true,\"descripti', 400, NULL, '2024-08-27 10:30:27', '2024-08-27 10:30:27'),
(8, NULL, 9, 540, 900, 'captured', 'order_OptU3cRbLIVsX9', 'upi', 'pay_OptUBRHQHedz8s', '123469015136', '{\"id\":\"pay_OptUBRHQHedz8s\",\"entity\":\"payment\",\"amount\":90000,\"currency\":\"INR\",\"status\":\"captured\",\"order_id\":\"order_OptU3cRbLIVsX9\",\"invoice_id\":null,\"international\":false,\"method\":\"upi\",\"amount_refunded\":0,\"refund_status\":null,\"captured\":true,\"descriptio', 400, NULL, '2024-08-27 10:40:51', '2024-08-27 10:40:51'),
(9, NULL, 10, 540, 2550, 'captured', 'order_OptYE3K3kylEad', 'upi', 'pay_OptYS4JJNqlysu', '886359292104', '{\"id\":\"pay_OptYS4JJNqlysu\",\"entity\":\"payment\",\"amount\":255000,\"currency\":\"INR\",\"status\":\"captured\",\"order_id\":\"order_OptYE3K3kylEad\",\"invoice_id\":null,\"international\":false,\"method\":\"upi\",\"amount_refunded\":0,\"refund_status\":null,\"captured\":true,\"descripti', 400, NULL, '2024-08-27 10:44:45', '2024-08-27 10:44:45'),
(10, NULL, 10, 540, 2550, 'captured', 'order_OptdIkB4I8g1pA', 'upi', 'pay_OptdRGwZvtRLoJ', '359649710300', '{\"id\":\"pay_OptdRGwZvtRLoJ\",\"entity\":\"payment\",\"amount\":255000,\"currency\":\"INR\",\"status\":\"captured\",\"order_id\":\"order_OptdIkB4I8g1pA\",\"invoice_id\":null,\"international\":false,\"method\":\"upi\",\"amount_refunded\":0,\"refund_status\":null,\"captured\":true,\"descripti', 400, NULL, '2024-08-27 10:49:45', '2024-08-27 10:49:45'),
(11, NULL, 9, 540, 900, 'captured', 'order_OptfRZRw2eYOFV', 'upi', 'pay_OptfYRW9Yr5IqP', '684104688148', '{\"id\":\"pay_OptfYRW9Yr5IqP\",\"entity\":\"payment\",\"amount\":90000,\"currency\":\"INR\",\"status\":\"captured\",\"order_id\":\"order_OptfRZRw2eYOFV\",\"invoice_id\":null,\"international\":false,\"method\":\"upi\",\"amount_refunded\":0,\"refund_status\":null,\"captured\":true,\"descriptio', 400, NULL, '2024-08-27 10:51:42', '2024-08-27 10:51:42'),
(12, NULL, 9, 540, 900, 'captured', 'order_OptjYoXTmpFeK0', 'upi', 'pay_OptjgW7bMFPdQI', '419180579478', '{\"id\":\"pay_OptjgW7bMFPdQI\",\"entity\":\"payment\",\"amount\":90000,\"currency\":\"INR\",\"status\":\"captured\",\"order_id\":\"order_OptjYoXTmpFeK0\",\"invoice_id\":null,\"international\":false,\"method\":\"upi\",\"amount_refunded\":0,\"refund_status\":null,\"captured\":true,\"descriptio', 400, NULL, '2024-08-27 10:55:42', '2024-08-27 10:55:42'),
(13, NULL, 10, 540, 2550, 'captured', 'order_Opto0iZDjf0LJa', 'upi', 'pay_Opto7qJdLQvdYa', '225303784788', '{\"id\":\"pay_Opto7qJdLQvdYa\",\"entity\":\"payment\",\"amount\":255000,\"currency\":\"INR\",\"status\":\"captured\",\"order_id\":\"order_Opto0iZDjf0LJa\",\"invoice_id\":null,\"international\":false,\"method\":\"upi\",\"amount_refunded\":0,\"refund_status\":null,\"captured\":true,\"descripti', 400, NULL, '2024-08-27 10:59:34', '2024-08-27 10:59:34'),
(14, NULL, 9, 540, 900, 'captured', 'order_OptsokTDnIQ9F5', 'upi', 'pay_OptswddN66N5nX', '316031167959', '{\"id\":\"pay_OptswddN66N5nX\",\"entity\":\"payment\",\"amount\":90000,\"currency\":\"INR\",\"status\":\"captured\",\"order_id\":\"order_OptsokTDnIQ9F5\",\"invoice_id\":null,\"international\":false,\"method\":\"upi\",\"amount_refunded\":0,\"refund_status\":null,\"captured\":true,\"descriptio', 400, NULL, '2024-08-27 11:04:18', '2024-08-27 11:04:18'),
(15, 15, 10, 540, 2550, 'captured', 'order_OptxdzG0BNh2bX', 'upi', 'pay_Optxka0iOhNpel', '211011424370', '{\"id\":\"pay_Optxka0iOhNpel\",\"entity\":\"payment\",\"amount\":255000,\"currency\":\"INR\",\"status\":\"captured\",\"order_id\":\"order_OptxdzG0BNh2bX\",\"invoice_id\":null,\"international\":false,\"method\":\"upi\",\"amount_refunded\":0,\"refund_status\":null,\"captured\":true,\"descripti', 400, NULL, '2024-08-27 11:09:00', '2024-08-27 11:09:00'),
(16, 16, 10, 540, 2550, 'captured', 'order_OpuCiCi1YAFKOJ', 'upi', 'pay_OpuCp8v2EonYTG', '453030305223', '{\"id\":\"pay_OpuCp8v2EonYTG\",\"entity\":\"payment\",\"amount\":255000,\"currency\":\"INR\",\"status\":\"captured\",\"order_id\":\"order_OpuCiCi1YAFKOJ\",\"invoice_id\":null,\"international\":false,\"method\":\"upi\",\"amount_refunded\":0,\"refund_status\":null,\"captured\":true,\"descripti', 400, NULL, '2024-08-27 11:22:58', '2024-08-27 11:22:58'),
(17, 17, 10, 540, 2550, 'captured', 'order_OpuOvLgrhjicU0', 'upi', 'pay_OpuP6EFAqHk3d3', '523286303747', '{\"id\":\"pay_OpuP6EFAqHk3d3\",\"entity\":\"payment\",\"amount\":255000,\"currency\":\"INR\",\"status\":\"captured\",\"order_id\":\"order_OpuOvLgrhjicU0\",\"invoice_id\":null,\"international\":false,\"method\":\"upi\",\"amount_refunded\":0,\"refund_status\":null,\"captured\":true,\"descripti', 400, NULL, '2024-08-27 11:34:36', '2024-08-27 11:34:36'),
(18, 18, 9, 540, 900, 'captured', 'order_OpvcEo0tJXYUG3', 'upi', 'pay_OpvcLmwiYyqkoA', '567736924819', '{\"id\":\"pay_OpvcLmwiYyqkoA\",\"entity\":\"payment\",\"amount\":90000,\"currency\":\"INR\",\"status\":\"captured\",\"order_id\":\"order_OpvcEo0tJXYUG3\",\"invoice_id\":null,\"international\":false,\"method\":\"upi\",\"amount_refunded\":0,\"refund_status\":null,\"captured\":true,\"descriptio', 400, NULL, '2024-08-27 12:45:48', '2024-08-27 12:45:48'),
(19, 19, 10, 540, 2550, 'captured', 'order_OpwJSXc9KPCYpK', 'upi', 'pay_OpwJaUS03uS3Od', '121568809423', '{\"id\":\"pay_OpwJaUS03uS3Od\",\"entity\":\"payment\",\"amount\":255000,\"currency\":\"INR\",\"status\":\"captured\",\"order_id\":\"order_OpwJSXc9KPCYpK\",\"invoice_id\":null,\"international\":false,\"method\":\"upi\",\"amount_refunded\":0,\"refund_status\":null,\"captured\":true,\"descripti', 400, NULL, '2024-08-27 13:26:44', '2024-08-27 13:26:44'),
(20, 20, 9, 540, 900, 'captured', 'order_OpwcQKodC9l39P', 'upi', 'pay_OpwcYH6l7Y751w', '978650285542', '{\"id\":\"pay_OpwcYH6l7Y751w\",\"entity\":\"payment\",\"amount\":90000,\"currency\":\"INR\",\"status\":\"captured\",\"order_id\":\"order_OpwcQKodC9l39P\",\"invoice_id\":null,\"international\":false,\"method\":\"upi\",\"amount_refunded\":0,\"refund_status\":null,\"captured\":true,\"descriptio', 400, NULL, '2024-08-27 13:44:42', '2024-08-27 13:44:42'),
(21, 21, 9, 540, 900, 'captured', 'order_OpwivSwAIjriwa', 'upi', 'pay_Opwj1lU9Dx6LYS', '733307168489', '{\"id\":\"pay_Opwj1lU9Dx6LYS\",\"entity\":\"payment\",\"amount\":90000,\"currency\":\"INR\",\"status\":\"captured\",\"order_id\":\"order_OpwivSwAIjriwa\",\"invoice_id\":null,\"international\":false,\"method\":\"upi\",\"amount_refunded\":0,\"refund_status\":null,\"captured\":true,\"descriptio', 400, NULL, '2024-08-27 13:50:49', '2024-08-27 13:50:49'),
(22, 22, 9, 540, 900, 'captured', 'order_OpwivSwAIjriwa', 'upi', 'pay_Opwj1lU9Dx6LYS', '733307168489', '{\"id\":\"pay_Opwj1lU9Dx6LYS\",\"entity\":\"payment\",\"amount\":90000,\"currency\":\"INR\",\"status\":\"captured\",\"order_id\":\"order_OpwivSwAIjriwa\",\"invoice_id\":null,\"international\":false,\"method\":\"upi\",\"amount_refunded\":0,\"refund_status\":null,\"captured\":true,\"descriptio', 400, NULL, '2024-08-27 13:52:39', '2024-08-27 13:52:39'),
(23, 23, 9, 540, 900, 'captured', 'order_OpwlPHhCRMoclm', 'upi', 'pay_OpwlXT3TaKgGrx', '283492929936', '{\"id\":\"pay_OpwlXT3TaKgGrx\",\"entity\":\"payment\",\"amount\":90000,\"currency\":\"INR\",\"status\":\"captured\",\"order_id\":\"order_OpwlPHhCRMoclm\",\"invoice_id\":null,\"international\":false,\"method\":\"upi\",\"amount_refunded\":0,\"refund_status\":null,\"captured\":true,\"descriptio', 400, NULL, '2024-08-27 13:53:12', '2024-08-27 13:53:12'),
(24, 24, 9, 540, 900, 'captured', 'order_OpwsCfQTd3B9UK', 'upi', 'pay_OpwsKIJspeV0Ap', '389328685084', '{\"id\":\"pay_OpwsKIJspeV0Ap\",\"entity\":\"payment\",\"amount\":90000,\"currency\":\"INR\",\"status\":\"captured\",\"order_id\":\"order_OpwsCfQTd3B9UK\",\"invoice_id\":null,\"international\":false,\"method\":\"upi\",\"amount_refunded\":0,\"refund_status\":null,\"captured\":true,\"descriptio', 400, NULL, '2024-08-27 13:59:38', '2024-08-27 13:59:38'),
(25, 25, 9, 540, 900, 'captured', 'order_OpwtUQxawzjXSH', 'upi', 'pay_OpwtbAhZxtchst', '996475885946', '{\"id\":\"pay_OpwtbAhZxtchst\",\"entity\":\"payment\",\"amount\":90000,\"currency\":\"INR\",\"status\":\"captured\",\"order_id\":\"order_OpwtUQxawzjXSH\",\"invoice_id\":null,\"international\":false,\"method\":\"upi\",\"amount_refunded\":0,\"refund_status\":null,\"captured\":true,\"descriptio', 400, NULL, '2024-08-27 14:00:49', '2024-08-27 14:00:49'),
(26, 34, 9, 540, 900, 'captured', 'order_OqKpR8zgWSHjUW', 'upi', 'pay_OqKqftukDuFgmx', '930120638469', '{\"id\":\"pay_OqKqftukDuFgmx\",\"entity\":\"payment\",\"amount\":90000,\"currency\":\"INR\",\"status\":\"captured\",\"order_id\":\"order_OqKpR8zgWSHjUW\",\"invoice_id\":null,\"international\":false,\"method\":\"upi\",\"amount_refunded\":0,\"refund_status\":null,\"captured\":true,\"descriptio', 400, NULL, '2024-08-28 13:26:43', '2024-08-28 13:26:43'),
(27, 35, 9, 540, 900, 'captured', 'order_OqL0OrSbKjOD4k', 'upi', 'pay_OqL0VyLqEU9RJv', '547867799223', '{\"id\":\"pay_OqL0VyLqEU9RJv\",\"entity\":\"payment\",\"amount\":90000,\"currency\":\"INR\",\"status\":\"captured\",\"order_id\":\"order_OqL0OrSbKjOD4k\",\"invoice_id\":null,\"international\":false,\"method\":\"upi\",\"amount_refunded\":0,\"refund_status\":null,\"captured\":true,\"descriptio', 400, NULL, '2024-08-28 13:36:02', '2024-08-28 13:36:02'),
(28, 36, 9, 540, 900, 'captured', 'order_OqL399eQJC07qA', 'upi', 'pay_OqL3Fxdi4XmVlY', '865303996364', '{\"id\":\"pay_OqL3Fxdi4XmVlY\",\"entity\":\"payment\",\"amount\":90000,\"currency\":\"INR\",\"status\":\"captured\",\"order_id\":\"order_OqL399eQJC07qA\",\"invoice_id\":null,\"international\":false,\"method\":\"upi\",\"amount_refunded\":0,\"refund_status\":null,\"captured\":true,\"descriptio', 400, NULL, '2024-08-28 13:38:37', '2024-08-28 13:38:37'),
(29, 37, 9, 540, 900, 'captured', 'order_OqL399eQJC07qA', 'upi', 'pay_OqL3Fxdi4XmVlY', '865303996364', '{\"id\":\"pay_OqL3Fxdi4XmVlY\",\"entity\":\"payment\",\"amount\":90000,\"currency\":\"INR\",\"status\":\"captured\",\"order_id\":\"order_OqL399eQJC07qA\",\"invoice_id\":null,\"international\":false,\"method\":\"upi\",\"amount_refunded\":0,\"refund_status\":null,\"captured\":true,\"descriptio', 400, NULL, '2024-08-28 13:45:50', '2024-08-28 13:45:50'),
(30, 38, 9, 540, 900, 'captured', 'order_OqL399eQJC07qA', 'upi', 'pay_OqL3Fxdi4XmVlY', '865303996364', '{\"id\":\"pay_OqL3Fxdi4XmVlY\",\"entity\":\"payment\",\"amount\":90000,\"currency\":\"INR\",\"status\":\"captured\",\"order_id\":\"order_OqL399eQJC07qA\",\"invoice_id\":null,\"international\":false,\"method\":\"upi\",\"amount_refunded\":0,\"refund_status\":null,\"captured\":true,\"descriptio', 400, NULL, '2024-08-28 13:46:03', '2024-08-28 13:46:03'),
(31, 39, 9, 540, 900, 'captured', 'order_OqL399eQJC07qA', 'upi', 'pay_OqL3Fxdi4XmVlY', '865303996364', '{\"id\":\"pay_OqL3Fxdi4XmVlY\",\"entity\":\"payment\",\"amount\":90000,\"currency\":\"INR\",\"status\":\"captured\",\"order_id\":\"order_OqL399eQJC07qA\",\"invoice_id\":null,\"international\":false,\"method\":\"upi\",\"amount_refunded\":0,\"refund_status\":null,\"captured\":true,\"descriptio', 400, NULL, '2024-08-28 13:46:20', '2024-08-28 13:46:20'),
(32, 40, 9, 540, 900, 'captured', 'order_OqL399eQJC07qA', 'upi', 'pay_OqL3Fxdi4XmVlY', '865303996364', '{\"id\":\"pay_OqL3Fxdi4XmVlY\",\"entity\":\"payment\",\"amount\":90000,\"currency\":\"INR\",\"status\":\"captured\",\"order_id\":\"order_OqL399eQJC07qA\",\"invoice_id\":null,\"international\":false,\"method\":\"upi\",\"amount_refunded\":0,\"refund_status\":null,\"captured\":true,\"descriptio', 400, NULL, '2024-08-28 13:46:28', '2024-08-28 13:46:28'),
(33, 41, 9, 540, 900, 'captured', 'order_OqL399eQJC07qA', 'upi', 'pay_OqL3Fxdi4XmVlY', '865303996364', '{\"id\":\"pay_OqL3Fxdi4XmVlY\",\"entity\":\"payment\",\"amount\":90000,\"currency\":\"INR\",\"status\":\"captured\",\"order_id\":\"order_OqL399eQJC07qA\",\"invoice_id\":null,\"international\":false,\"method\":\"upi\",\"amount_refunded\":0,\"refund_status\":null,\"captured\":true,\"descriptio', 400, NULL, '2024-08-28 13:46:33', '2024-08-28 13:46:33'),
(34, 42, 9, 540, 900, 'captured', 'order_OqL399eQJC07qA', 'upi', 'pay_OqL3Fxdi4XmVlY', '865303996364', '{\"id\":\"pay_OqL3Fxdi4XmVlY\",\"entity\":\"payment\",\"amount\":90000,\"currency\":\"INR\",\"status\":\"captured\",\"order_id\":\"order_OqL399eQJC07qA\",\"invoice_id\":null,\"international\":false,\"method\":\"upi\",\"amount_refunded\":0,\"refund_status\":null,\"captured\":true,\"descriptio', 400, NULL, '2024-08-28 13:46:40', '2024-08-28 13:46:40'),
(35, 43, 9, 540, 900, 'captured', 'order_OqL399eQJC07qA', 'upi', 'pay_OqL3Fxdi4XmVlY', '865303996364', '{\"id\":\"pay_OqL3Fxdi4XmVlY\",\"entity\":\"payment\",\"amount\":90000,\"currency\":\"INR\",\"status\":\"captured\",\"order_id\":\"order_OqL399eQJC07qA\",\"invoice_id\":null,\"international\":false,\"method\":\"upi\",\"amount_refunded\":0,\"refund_status\":null,\"captured\":true,\"descriptio', 400, NULL, '2024-08-28 13:47:30', '2024-08-28 13:47:30'),
(36, 44, 9, 540, 900, 'captured', 'order_OqL399eQJC07qA', 'upi', 'pay_OqL3Fxdi4XmVlY', '865303996364', '{\"id\":\"pay_OqL3Fxdi4XmVlY\",\"entity\":\"payment\",\"amount\":90000,\"currency\":\"INR\",\"status\":\"captured\",\"order_id\":\"order_OqL399eQJC07qA\",\"invoice_id\":null,\"international\":false,\"method\":\"upi\",\"amount_refunded\":0,\"refund_status\":null,\"captured\":true,\"descriptio', 400, NULL, '2024-08-28 13:47:35', '2024-08-28 13:47:35'),
(37, 45, 9, 540, 900, 'captured', 'order_OqL399eQJC07qA', 'upi', 'pay_OqL3Fxdi4XmVlY', '865303996364', '{\"id\":\"pay_OqL3Fxdi4XmVlY\",\"entity\":\"payment\",\"amount\":90000,\"currency\":\"INR\",\"status\":\"captured\",\"order_id\":\"order_OqL399eQJC07qA\",\"invoice_id\":null,\"international\":false,\"method\":\"upi\",\"amount_refunded\":0,\"refund_status\":null,\"captured\":true,\"descriptio', 400, NULL, '2024-08-28 14:01:54', '2024-08-28 14:01:54'),
(38, 46, 10, 540, 2550, 'captured', 'order_OqLSMARz5aHfJo', 'upi', 'pay_OqLSUf8lztvaJg', '359925599713', '{\"id\":\"pay_OqLSUf8lztvaJg\",\"entity\":\"payment\",\"amount\":255000,\"currency\":\"INR\",\"status\":\"captured\",\"order_id\":\"order_OqLSMARz5aHfJo\",\"invoice_id\":null,\"international\":false,\"method\":\"upi\",\"amount_refunded\":0,\"refund_status\":null,\"captured\":true,\"descripti', 400, NULL, '2024-08-28 14:02:31', '2024-08-28 14:02:31'),
(39, 47, 10, 540, 2550, 'captured', 'order_OqLSMARz5aHfJo', 'upi', 'pay_OqLSUf8lztvaJg', '359925599713', '{\"id\":\"pay_OqLSUf8lztvaJg\",\"entity\":\"payment\",\"amount\":255000,\"currency\":\"INR\",\"status\":\"captured\",\"order_id\":\"order_OqLSMARz5aHfJo\",\"invoice_id\":null,\"international\":false,\"method\":\"upi\",\"amount_refunded\":0,\"refund_status\":null,\"captured\":true,\"descripti', 400, NULL, '2024-08-28 14:08:26', '2024-08-28 14:08:26'),
(40, 48, 9, 540, 900, 'captured', 'order_OqLZJyaUtY4qhv', 'upi', 'pay_OqLZQhCBT43f2W', '105315893982', '{\"id\":\"pay_OqLZQhCBT43f2W\",\"entity\":\"payment\",\"amount\":90000,\"currency\":\"INR\",\"status\":\"captured\",\"order_id\":\"order_OqLZJyaUtY4qhv\",\"invoice_id\":null,\"international\":false,\"method\":\"upi\",\"amount_refunded\":0,\"refund_status\":null,\"captured\":true,\"descriptio', 400, NULL, '2024-08-28 14:09:06', '2024-08-28 14:09:06'),
(41, 49, 9, 540, 900, 'captured', 'order_OqLZJyaUtY4qhv', 'upi', 'pay_OqLZQhCBT43f2W', '105315893982', '{\"id\":\"pay_OqLZQhCBT43f2W\",\"entity\":\"payment\",\"amount\":90000,\"currency\":\"INR\",\"status\":\"captured\",\"order_id\":\"order_OqLZJyaUtY4qhv\",\"invoice_id\":null,\"international\":false,\"method\":\"upi\",\"amount_refunded\":0,\"refund_status\":null,\"captured\":true,\"descriptio', 400, NULL, '2024-08-28 14:09:41', '2024-08-28 14:09:41'),
(42, 50, 9, 540, 900, 'captured', 'order_OqLbgQA0nTkLH9', 'upi', 'pay_OqLbz0t8Q96pGG', '396647183579', '{\"id\":\"pay_OqLbz0t8Q96pGG\",\"entity\":\"payment\",\"amount\":90000,\"currency\":\"INR\",\"status\":\"captured\",\"order_id\":\"order_OqLbgQA0nTkLH9\",\"invoice_id\":null,\"international\":false,\"method\":\"upi\",\"amount_refunded\":0,\"refund_status\":null,\"captured\":true,\"descriptio', 400, NULL, '2024-08-28 14:11:30', '2024-08-28 14:11:30'),
(43, 51, 9, 540, 900, 'captured', 'order_OqLbgQA0nTkLH9', 'upi', 'pay_OqLbz0t8Q96pGG', '396647183579', '{\"id\":\"pay_OqLbz0t8Q96pGG\",\"entity\":\"payment\",\"amount\":90000,\"currency\":\"INR\",\"status\":\"captured\",\"order_id\":\"order_OqLbgQA0nTkLH9\",\"invoice_id\":null,\"international\":false,\"method\":\"upi\",\"amount_refunded\":0,\"refund_status\":null,\"captured\":true,\"descriptio', 400, NULL, '2024-08-28 14:16:47', '2024-08-28 14:16:47'),
(44, 52, 9, 540, 900, 'captured', 'order_OqLlUj42n1nGws', 'upi', 'pay_OqLlbTNRFJFqYa', '512570110569', '{\"id\":\"pay_OqLlbTNRFJFqYa\",\"entity\":\"payment\",\"amount\":90000,\"currency\":\"INR\",\"status\":\"captured\",\"order_id\":\"order_OqLlUj42n1nGws\",\"invoice_id\":null,\"international\":false,\"method\":\"upi\",\"amount_refunded\":0,\"refund_status\":null,\"captured\":true,\"descriptio', 400, NULL, '2024-08-28 14:20:37', '2024-08-28 14:20:37'),
(45, 53, 9, 540, 900, 'captured', 'order_OqM7fParuxOfBS', 'upi', 'pay_OqM7nX1N0gLnyK', '356421260271', '{\"id\":\"pay_OqM7nX1N0gLnyK\",\"entity\":\"payment\",\"amount\":90000,\"currency\":\"INR\",\"status\":\"captured\",\"order_id\":\"order_OqM7fParuxOfBS\",\"invoice_id\":null,\"international\":false,\"method\":\"upi\",\"amount_refunded\":0,\"refund_status\":null,\"captured\":true,\"descriptio', 400, NULL, '2024-08-28 14:41:37', '2024-08-28 14:41:37'),
(46, 54, 9, 540, 900, 'captured', 'order_OqMBiT27gkAfCL', 'upi', 'pay_OqMBqpnAL5QlaA', '600392367960', '{\"id\":\"pay_OqMBqpnAL5QlaA\",\"entity\":\"payment\",\"amount\":90000,\"currency\":\"INR\",\"status\":\"captured\",\"order_id\":\"order_OqMBiT27gkAfCL\",\"invoice_id\":null,\"international\":false,\"method\":\"upi\",\"amount_refunded\":0,\"refund_status\":null,\"captured\":true,\"descriptio', 400, NULL, '2024-08-28 14:45:27', '2024-08-28 14:45:27');

-- --------------------------------------------------------

--
-- Table structure for table `tbluser`
--

CREATE TABLE `tbluser` (
  `id` bigint(20) NOT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `user_type` varchar(255) DEFAULT NULL,
  `role_id` int(20) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbluser`
--

INSERT INTO `tbluser` (`id`, `fullName`, `email`, `phone`, `password`, `email_verified_at`, `user_type`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Test Admin', 'test@timd.com', '8820111123', '$2a$10$K4E0fCdJE1uagx36fckkbejrSlg5AfqDnqjoBRDTWI9/XHQXQ3hUG', NULL, NULL, NULL, '2024-07-17 10:12:55', '2024-07-17 10:12:55', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `tblcall`
--
ALTER TABLE `tblcall`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tblconsultation`
--
ALTER TABLE `tblconsultation`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbldemo`
--
ALTER TABLE `tbldemo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tblimagemenu`
--
ALTER TABLE `tblimagemenu`
  ADD PRIMARY KEY (`MenuID`),
  ADD UNIQUE KEY `tblimagemenu_UN` (`PropertyNo`),
  ADD KEY `tblimagemenu_FK` (`PropertyNo`);

--
-- Indexes for table `tblitemcategory`
--
ALTER TABLE `tblitemcategory`
  ADD PRIMARY KEY (`CategoryRN`),
  ADD UNIQUE KEY `primarykeynew` (`CategoryRN`,`PropertyNo`),
  ADD KEY `tblItemCategory_FK` (`PropertyNo`);

--
-- Indexes for table `tblitemname`
--
ALTER TABLE `tblitemname`
  ADD PRIMARY KEY (`ItemNameRN`,`CategoryRN`,`PropertyNo`),
  ADD KEY `tblItemName_FK_1` (`CategoryRN`,`PropertyNo`);

--
-- Indexes for table `tblmastercountry`
--
ALTER TABLE `tblmastercountry`
  ADD PRIMARY KEY (`country_id`);

--
-- Indexes for table `tblmastercustomer`
--
ALTER TABLE `tblmastercustomer`
  ADD PRIMARY KEY (`CustomerNo`),
  ADD UNIQUE KEY `tblmastercustomer_ph_un` (`RegMobile`),
  ADD UNIQUE KEY `tblmastercustomer_em_un` (`RegEmail`);

--
-- Indexes for table `tblmasterproperty`
--
ALTER TABLE `tblmasterproperty`
  ADD PRIMARY KEY (`PropertyNo`),
  ADD KEY `tblmasterproperty_FK` (`CustomerNo`);

--
-- Indexes for table `tblnotification`
--
ALTER TABLE `tblnotification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cus_id` (`cus_id`);

--
-- Indexes for table `tblotp`
--
ALTER TABLE `tblotp`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tblpackageplan`
--
ALTER TABLE `tblpackageplan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_plan_created_by` (`created_by`),
  ADD KEY `fk_plan_package_master` (`package_master_id`),
  ADD KEY `fk_plan_updated_by` (`updated_by`),
  ADD KEY `fk_plan_property_id` (`property_id`),
  ADD KEY `fk_plan_bank_transaction_id` (`bank_transaction_id`);

--
-- Indexes for table `tblproductname`
--
ALTER TABLE `tblproductname`
  ADD PRIMARY KEY (`ProductNameRN`,`ItemNameRN`,`CategoryRN`,`PropertyNo`),
  ADD KEY `tblProductName_FK` (`ItemNameRN`,`CategoryRN`,`PropertyNo`);

--
-- Indexes for table `tblrms`
--
ALTER TABLE `tblrms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tblrms_itemcategory`
--
ALTER TABLE `tblrms_itemcategory`
  ADD PRIMARY KEY (`CategoryRN`);

--
-- Indexes for table `tblrms_itemname`
--
ALTER TABLE `tblrms_itemname`
  ADD PRIMARY KEY (`ItemNameRN`),
  ADD KEY `tblItemName_FK` (`CategoryRN`);

--
-- Indexes for table `tblrms_productname`
--
ALTER TABLE `tblrms_productname`
  ADD PRIMARY KEY (`ProductNameRN`),
  ADD KEY `tblrms_productname_FK` (`ItemNameRN`),
  ADD KEY `tblrms_productname_FK2` (`CategoryRN`);

--
-- Indexes for table `tblsettings`
--
ALTER TABLE `tblsettings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user` (`created_by`),
  ADD KEY `fk_user1` (`updated_by`);

--
-- Indexes for table `tbltransaction`
--
ALTER TABLE `tbltransaction`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_transaction_created_by` (`created_by`),
  ADD KEY `fk_transaction_package` (`package_id`),
  ADD KEY `fk_transaction_master` (`package_master_id`),
  ADD KEY `fk_tbltransaction_property_id` (`property_id`);

--
-- Indexes for table `tbluser`
--
ALTER TABLE `tbluser`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tblcall`
--
ALTER TABLE `tblcall`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `tblconsultation`
--
ALTER TABLE `tblconsultation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `tbldemo`
--
ALTER TABLE `tbldemo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `tblimagemenu`
--
ALTER TABLE `tblimagemenu`
  MODIFY `MenuID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `tblitemcategory`
--
ALTER TABLE `tblitemcategory`
  MODIFY `CategoryRN` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT for table `tblitemname`
--
ALTER TABLE `tblitemname`
  MODIFY `ItemNameRN` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `tblmastercountry`
--
ALTER TABLE `tblmastercountry`
  MODIFY `country_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tblnotification`
--
ALTER TABLE `tblnotification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tblotp`
--
ALTER TABLE `tblotp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- AUTO_INCREMENT for table `tblpackageplan`
--
ALTER TABLE `tblpackageplan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `tblproductname`
--
ALTER TABLE `tblproductname`
  MODIFY `ProductNameRN` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tblrms`
--
ALTER TABLE `tblrms`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tblrms_itemcategory`
--
ALTER TABLE `tblrms_itemcategory`
  MODIFY `CategoryRN` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tblrms_itemname`
--
ALTER TABLE `tblrms_itemname`
  MODIFY `ItemNameRN` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tblrms_productname`
--
ALTER TABLE `tblrms_productname`
  MODIFY `ProductNameRN` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tblsettings`
--
ALTER TABLE `tblsettings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `tbltransaction`
--
ALTER TABLE `tbltransaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `tbluser`
--
ALTER TABLE `tbluser`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tblimagemenu`
--
ALTER TABLE `tblimagemenu`
  ADD CONSTRAINT `tblimagemenu_FK` FOREIGN KEY (`PropertyNo`) REFERENCES `tblmasterproperty` (`PropertyNo`);

--
-- Constraints for table `tblmasterproperty`
--
ALTER TABLE `tblmasterproperty`
  ADD CONSTRAINT `tblmasterproperty_FK` FOREIGN KEY (`CustomerNo`) REFERENCES `tblmastercustomer` (`CustomerNo`);

--
-- Constraints for table `tblnotification`
--
ALTER TABLE `tblnotification`
  ADD CONSTRAINT `tblnotification_ibfk_1` FOREIGN KEY (`cus_id`) REFERENCES `tblmastercustomer` (`CustomerNo`);

--
-- Constraints for table `tblpackageplan`
--
ALTER TABLE `tblpackageplan`
  ADD CONSTRAINT `fk_plan_bank_transaction_id` FOREIGN KEY (`bank_transaction_id`) REFERENCES `tbltransaction` (`id`),
  ADD CONSTRAINT `fk_plan_created_by` FOREIGN KEY (`created_by`) REFERENCES `tblmastercustomer` (`CustomerNo`),
  ADD CONSTRAINT `fk_plan_package_master` FOREIGN KEY (`package_master_id`) REFERENCES `tblsettings` (`id`),
  ADD CONSTRAINT `fk_plan_property_id` FOREIGN KEY (`property_id`) REFERENCES `tblmasterproperty` (`PropertyNo`),
  ADD CONSTRAINT `fk_plan_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `tblmastercustomer` (`CustomerNo`);

--
-- Constraints for table `tblproductname`
--
ALTER TABLE `tblproductname`
  ADD CONSTRAINT `tblProductName_FK` FOREIGN KEY (`ItemNameRN`,`CategoryRN`,`PropertyNo`) REFERENCES `tblitemname` (`ItemNameRN`, `CategoryRN`, `PropertyNo`);

--
-- Constraints for table `tblrms_itemname`
--
ALTER TABLE `tblrms_itemname`
  ADD CONSTRAINT `tblItemName_FK` FOREIGN KEY (`CategoryRN`) REFERENCES `tblrms_itemcategory` (`CategoryRN`);

--
-- Constraints for table `tblrms_productname`
--
ALTER TABLE `tblrms_productname`
  ADD CONSTRAINT `tblrms_productname_FK` FOREIGN KEY (`ItemNameRN`) REFERENCES `tblrms_itemname` (`ItemNameRN`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tblrms_productname_FK2` FOREIGN KEY (`CategoryRN`) REFERENCES `tblrms_itemcategory` (`CategoryRN`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tblsettings`
--
ALTER TABLE `tblsettings`
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`created_by`) REFERENCES `tbluser` (`id`),
  ADD CONSTRAINT `fk_user1` FOREIGN KEY (`updated_by`) REFERENCES `tbluser` (`id`);

--
-- Constraints for table `tbltransaction`
--
ALTER TABLE `tbltransaction`
  ADD CONSTRAINT `fk_tbltransaction_property_id` FOREIGN KEY (`property_id`) REFERENCES `tblmasterproperty` (`PropertyNo`),
  ADD CONSTRAINT `fk_transaction_created_by` FOREIGN KEY (`created_by`) REFERENCES `tblmastercustomer` (`CustomerNo`),
  ADD CONSTRAINT `fk_transaction_master` FOREIGN KEY (`package_master_id`) REFERENCES `tblsettings` (`id`),
  ADD CONSTRAINT `fk_transaction_package` FOREIGN KEY (`package_id`) REFERENCES `tblpackageplan` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
