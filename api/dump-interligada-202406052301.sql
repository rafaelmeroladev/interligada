-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: interligada
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.22-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0000_00_00_000000_create_websockets_statistics_entries_table',1),(2,'2014_10_12_000000_create_users_table',1),(3,'2014_10_12_100000_create_password_reset_tokens_table',1),(4,'2016_06_01_000001_create_oauth_auth_codes_table',1),(5,'2016_06_01_000002_create_oauth_access_tokens_table',1),(6,'2016_06_01_000003_create_oauth_refresh_tokens_table',1),(7,'2016_06_01_000004_create_oauth_clients_table',1),(8,'2016_06_01_000005_create_oauth_personal_access_clients_table',1),(9,'2019_08_19_000000_create_failed_jobs_table',1),(10,'2019_12_14_000001_create_personal_access_tokens_table',1),(11,'2023_10_31_231525_create_news_table',1),(12,'2023_10_31_231526_create_requests_table',1),(13,'2023_10_31_231533_create_timetables_table',1),(14,'2024_05_25_015347_add_name_to_requests_table',2),(15,'2024_05_25_033340_create_request_program_table',3),(16,'2024_05_25_034033_update_requests_table',4),(17,'2024_05_26_012757_add_program_name_timetable_table',5),(18,'2024_05_26_013126_add_program_request_program_table',5),(19,'2024_05_27_011727_add_description_on_timetables_table',6),(20,'2024_05_27_022507_add_imagem_to_timetables_table',7),(21,'2024_05_30_222200_create_sponsors_table',8),(22,'2024_06_05_012123_add_city_state_requests_table',9);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_time` datetime NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `audio` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` bigint(20) unsigned NOT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `highlight` tinyint(1) NOT NULL,
  `image_highlight` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `news_user_id_foreign` (`user_id`),
  CONSTRAINT `news_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth_access_tokens`
--

DROP TABLE IF EXISTS `oauth_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth_access_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `client_id` bigint(20) unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_access_tokens_user_id_index` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth_access_tokens`
--

LOCK TABLES `oauth_access_tokens` WRITE;
/*!40000 ALTER TABLE `oauth_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `oauth_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth_auth_codes`
--

DROP TABLE IF EXISTS `oauth_auth_codes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth_auth_codes` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) unsigned NOT NULL,
  `client_id` bigint(20) unsigned NOT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_auth_codes_user_id_index` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth_auth_codes`
--

LOCK TABLES `oauth_auth_codes` WRITE;
/*!40000 ALTER TABLE `oauth_auth_codes` DISABLE KEYS */;
/*!40000 ALTER TABLE `oauth_auth_codes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth_clients`
--

DROP TABLE IF EXISTS `oauth_clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth_clients` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `secret` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `provider` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `redirect` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `personal_access_client` tinyint(1) NOT NULL,
  `password_client` tinyint(1) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_clients_user_id_index` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth_clients`
--

LOCK TABLES `oauth_clients` WRITE;
/*!40000 ALTER TABLE `oauth_clients` DISABLE KEYS */;
INSERT INTO `oauth_clients` VALUES (1,NULL,'accesstoken','SNSTdVwrkAjN3tID5ENpfmsynflXIF3RThgxnGMC',NULL,'http://localhost',1,0,0,'2024-05-25 05:48:37','2024-05-25 05:48:37');
/*!40000 ALTER TABLE `oauth_clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth_personal_access_clients`
--

DROP TABLE IF EXISTS `oauth_personal_access_clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth_personal_access_clients` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `client_id` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth_personal_access_clients`
--

LOCK TABLES `oauth_personal_access_clients` WRITE;
/*!40000 ALTER TABLE `oauth_personal_access_clients` DISABLE KEYS */;
INSERT INTO `oauth_personal_access_clients` VALUES (1,1,'2024-05-25 05:48:38','2024-05-25 05:48:38');
/*!40000 ALTER TABLE `oauth_personal_access_clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth_refresh_tokens`
--

DROP TABLE IF EXISTS `oauth_refresh_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth_refresh_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `access_token_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_refresh_tokens_access_token_id_index` (`access_token_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth_refresh_tokens`
--

LOCK TABLES `oauth_refresh_tokens` WRITE;
/*!40000 ALTER TABLE `oauth_refresh_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `oauth_refresh_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
INSERT INTO `personal_access_tokens` VALUES (1,'App\\Models\\User',1,'Personal Access Token','032e40648bb8800437513dae1520934b1d549576603b74ac25056a0101abe410','[\"*\"]',NULL,NULL,'2024-05-25 06:04:48','2024-05-25 06:04:48'),(2,'App\\Models\\User',1,'Personal Access Token','94239006a3d35c81b237a56c65590b94b3efd17f24b40f55848c99531bfe9188','[\"*\"]','2024-05-25 07:23:24',NULL,'2024-05-25 06:21:53','2024-05-25 07:23:24'),(3,'App\\Models\\User',1,'Personal Access Token','ce13b76cac57b87a2e383893d951fa586501f9c2ba405ba6b16145324204762a','[\"*\"]','2024-05-26 06:53:58',NULL,'2024-05-26 06:48:09','2024-05-26 06:53:58'),(4,'App\\Models\\User',1,'Personal Access Token','5405b3587b4661c5679bddf4775c4f584cd9809a5dc1df1020eec6157be7a432','[\"*\"]','2024-05-26 06:55:59',NULL,'2024-05-26 06:54:08','2024-05-26 06:55:59'),(5,'App\\Models\\User',1,'Personal Access Token','ceeb88f6b98122b548dbf1d43ccbb1de59ad25d366317709fdd8ec7598b40327','[\"*\"]','2024-05-27 04:36:26',NULL,'2024-05-26 07:00:56','2024-05-27 04:36:26'),(6,'App\\Models\\User',1,'Personal Access Token','ed2ba641c79f47de88e1e0305ffcacc8ce6a65381b3d2a100a9254a35812904d','[\"*\"]','2024-05-29 04:09:45',NULL,'2024-05-28 04:54:46','2024-05-29 04:09:45'),(7,'App\\Models\\User',1,'Personal Access Token','d412377d72c4e7013285af85bdd89f2a5bc53918c2eac86568a410b633d3b40f','[\"*\"]','2024-05-31 18:23:51',NULL,'2024-05-31 18:22:52','2024-05-31 18:23:51'),(8,'App\\Models\\User',1,'Personal Access Token','0695a246890602a54ee2c5d08b493fd46b435951621f4544cabee50860277ff1','[\"*\"]','2024-05-31 18:45:54',NULL,'2024-05-31 18:39:24','2024-05-31 18:45:54'),(9,'App\\Models\\User',1,'Personal Access Token','6b5fcf6aa1af81f4f7eddc19b70e53fb7637134bc2289aecc2ec44fd31a05a42','[\"*\"]','2024-05-31 19:04:58',NULL,'2024-05-31 18:53:40','2024-05-31 19:04:58'),(10,'App\\Models\\User',1,'Personal Access Token','04c9822aacf50a21d1cd93819363cb350b36c0f32ee6717768f483eb51466c68','[\"*\"]',NULL,NULL,'2024-06-05 04:06:21','2024-06-05 04:06:21'),(11,'App\\Models\\User',1,'Personal Access Token','8819b4b3d73d2f1678861dd9c36b7b8050954d0a5327d6589d5e0341147b35c5','[\"*\"]','2024-06-05 04:13:10',NULL,'2024-06-05 04:08:27','2024-06-05 04:13:10');
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `request_program`
--

DROP TABLE IF EXISTS `request_program`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `request_program` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `status` enum('online','offline') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'offline',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `timetable_id` bigint(20) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `request_program_user_id_foreign` (`user_id`),
  KEY `request_program_timetable_id_foreign` (`timetable_id`),
  CONSTRAINT `request_program_timetable_id_foreign` FOREIGN KEY (`timetable_id`) REFERENCES `timetables` (`id`) ON DELETE CASCADE,
  CONSTRAINT `request_program_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request_program`
--

LOCK TABLES `request_program` WRITE;
/*!40000 ALTER TABLE `request_program` DISABLE KEYS */;
/*!40000 ALTER TABLE `request_program` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `requests`
--

DROP TABLE IF EXISTS `requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `requests` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `type` enum('message','request') COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `read` tinyint(1) NOT NULL DEFAULT 0,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `request_program_id` bigint(20) unsigned DEFAULT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `requests_request_program_id_foreign` (`request_program_id`),
  CONSTRAINT `requests_request_program_id_foreign` FOREIGN KEY (`request_program_id`) REFERENCES `request_program` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `requests`
--

LOCK TABLES `requests` WRITE;
/*!40000 ALTER TABLE `requests` DISABLE KEYS */;
/*!40000 ALTER TABLE `requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sponsors`
--

DROP TABLE IF EXISTS `sponsors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sponsors` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `link` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ref` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `imagem` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expirated_date` date NOT NULL,
  `status` enum('ativo','inativo') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ativo',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sponsors`
--

LOCK TABLES `sponsors` WRITE;
/*!40000 ALTER TABLE `sponsors` DISABLE KEYS */;
INSERT INTO `sponsors` VALUES (1,'MisterMU','https://example.com',NULL,'sponsors/qhimlNCN0MB0zG840rzHoWcPa7ETjlRolmU3JJsk.png','2024-12-31','ativo','2024-05-31 20:16:16','2024-05-31 20:16:16',NULL),(6,'InterligadaHits','http://www.interligadahits.com.br',NULL,'sponsors/XpuXP7mYB5ihCBVoYy8NJIWPBnVcw9wBTVM2sBXB.png','2024-12-31','ativo','2024-06-02 04:15:24','2024-06-02 04:15:24',NULL),(7,'InterligadaHits','http://www.interligadahits.com.br',NULL,'sponsors/xZWvMtWG5HCdw4I8r3Gx1nPZWdvPuUkOqEcQEYu7.png','2024-12-31','ativo','2024-06-05 05:15:03','2024-06-05 05:15:03',NULL);
/*!40000 ALTER TABLE `sponsors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `timetables`
--

DROP TABLE IF EXISTS `timetables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `timetables` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `day_week` enum('monday','tuesday','wednesday','thursday','friday','saturday','sunday') COLLATE utf8mb4_unicode_ci NOT NULL,
  `hour_start` time NOT NULL,
  `hour_finish` time NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `program_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `imagem` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `timetables_user_id_foreign` (`user_id`),
  CONSTRAINT `timetables_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `timetables`
--

LOCK TABLES `timetables` WRITE;
/*!40000 ALTER TABLE `timetables` DISABLE KEYS */;
INSERT INTO `timetables` VALUES (1,1,'monday','17:00:00','18:00:00','2024-05-26 07:12:10','2024-05-29 04:09:46',NULL,'TOP Hits','Com carlos nunes locutor','images/CGEbUa3Ebn78VaGhs9gf3oq4sWCluqlt3dtRGKXn.jpg'),(2,1,'tuesday','17:00:00','18:00:00','2024-05-26 07:13:51','2024-05-27 04:33:58',NULL,'TOP Hits','Com carlos nunes locutor','images/CGEbUa3Ebn78VaGhs9gf3oq4sWCluqlt3dtRGKXn.jpg'),(3,1,'wednesday','17:00:00','18:00:00','2024-05-26 07:14:05','2024-05-27 04:34:01',NULL,'TOP Hits','Com carlos nunes locutor','images/CGEbUa3Ebn78VaGhs9gf3oq4sWCluqlt3dtRGKXn.jpg'),(4,1,'thursday','17:00:00','18:00:00','2024-05-26 07:14:14','2024-05-27 04:34:04',NULL,'TOP Hits','Com carlos nunes locutor','images/CGEbUa3Ebn78VaGhs9gf3oq4sWCluqlt3dtRGKXn.jpg'),(5,1,'friday','17:00:00','18:00:00','2024-05-26 07:14:22','2024-05-27 04:34:11',NULL,'TOP Hits','Com carlos nunes locutor','images/CGEbUa3Ebn78VaGhs9gf3oq4sWCluqlt3dtRGKXn.jpg'),(6,1,'friday','14:00:00','16:00:00','2024-05-26 07:15:02','2024-05-29 03:54:04',NULL,'EUROPOP','Com Dj Biel','images/spE4TK6shYPmgt2LfYEmvLNuttv8xihHr28JU9V5.jpg'),(7,1,'thursday','14:00:00','16:00:00','2024-05-26 07:15:19','2024-05-27 04:35:36',NULL,'EUROPOP','Com Dj Biel','images/spE4TK6shYPmgt2LfYEmvLNuttv8xihHr28JU9V5.jpg'),(8,1,'wednesday','14:00:00','16:00:00','2024-05-26 07:15:29','2024-05-27 04:35:38',NULL,'EUROPOP','Com Dj Biel','images/spE4TK6shYPmgt2LfYEmvLNuttv8xihHr28JU9V5.jpg'),(9,1,'tuesday','14:00:00','16:00:00','2024-05-26 07:15:35','2024-05-27 04:35:41',NULL,'EUROPOP','Com Dj Biel','images/spE4TK6shYPmgt2LfYEmvLNuttv8xihHr28JU9V5.jpg'),(10,1,'monday','14:00:00','16:00:00','2024-05-26 07:15:44','2024-05-27 04:35:45',NULL,'EUROPOP','Com Dj Biel','images/spE4TK6shYPmgt2LfYEmvLNuttv8xihHr28JU9V5.jpg'),(11,1,'monday','10:00:00','12:00:00','2024-05-26 07:16:14','2024-05-29 03:50:19',NULL,'MIXTUREBA','Com Locutor Sérgio Muller','images/qqx0iRfhfrFUH6uve553UXcrcV32HOFTtQGK33bV.jpg'),(12,1,'tuesday','10:00:00','12:00:00','2024-05-26 07:16:26','2024-05-27 04:36:17',NULL,'MIXTUREBA','Com Locutor Sérgio Muller','images/qqx0iRfhfrFUH6uve553UXcrcV32HOFTtQGK33bV.jpg'),(13,1,'wednesday','10:00:00','12:00:00','2024-05-26 07:16:36','2024-05-27 04:36:19',NULL,'MIXTUREBA','Com Locutor Sérgio Muller','images/qqx0iRfhfrFUH6uve553UXcrcV32HOFTtQGK33bV.jpg'),(14,1,'thursday','10:00:00','12:00:00','2024-05-26 07:16:44','2024-05-27 04:36:21',NULL,'MIXTUREBA','Com Locutor Sérgio Muller','images/qqx0iRfhfrFUH6uve553UXcrcV32HOFTtQGK33bV.jpg'),(15,1,'friday','10:00:00','12:00:00','2024-05-26 07:16:50','2024-05-27 04:36:24',NULL,'MIXTUREBA','Com Locutor Sérgio Muller','images/qqx0iRfhfrFUH6uve553UXcrcV32HOFTtQGK33bV.jpg'),(16,1,'saturday','10:00:00','12:00:00','2024-05-26 07:16:57','2024-05-27 04:36:27',NULL,'MIXTUREBA','Com Locutor Sérgio Muller','images/qqx0iRfhfrFUH6uve553UXcrcV32HOFTtQGK33bV.jpg'),(17,1,'friday','21:00:00','23:00:00','2024-05-26 07:17:37','2024-05-29 03:53:07',NULL,'NIGHT CLUB','Com carlos nunes locutor','images/hrcUaMokRffJa5OafCUhfbayUUMpgNSkLOoKmTYx.jpg'),(18,1,'saturday','21:00:00','23:00:00','2024-05-26 07:18:51','2024-05-27 04:34:49',NULL,'NIGHT CLUB','Com carlos nunes locutor','images/hrcUaMokRffJa5OafCUhfbayUUMpgNSkLOoKmTYx.jpg'),(19,1,'wednesday','22:46:00','23:20:00','2024-05-27 04:10:16','2024-05-27 04:10:16',NULL,'TEST PROGRAM','Com carlos nunes locutor','images/spE4TK6shYPmgt2LfYEmvLNuttv8xihHr28JU9V5.jpg'),(20,1,'wednesday','23:30:00','23:50:00','2024-05-27 04:10:41','2024-05-27 04:10:41',NULL,'PROGRAM TEST','Com carlos nunes locutor','images/hrcUaMokRffJa5OafCUhfbayUUMpgNSkLOoKmTYx.jpg');
/*!40000 ALTER TABLE `timetables` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `surname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `birthday` date NOT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `level` enum('admin','manager','speaker','listener') COLLATE utf8mb4_unicode_ci NOT NULL,
  `gender` enum('male','female','other') COLLATE utf8mb4_unicode_ci NOT NULL,
  `musical_preference` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `favorite_music` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `favorite_singer` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `picture` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Rafael','Merola','rafamerola@gmail.com',NULL,'$2y$10$Iv715B7yi60i2EhbNBaPLO6hjE8v07EUtChB/6NfIn1V5sZrVuFie',NULL,'1993-05-17','Maceio','Alagoas','82999430213','admin','male','Eletronic','say you won\'t let go','Lorenzza Pozza',NULL,'2024-05-25 04:41:40','2024-05-25 04:41:40',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `websockets_statistics_entries`
--

DROP TABLE IF EXISTS `websockets_statistics_entries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `websockets_statistics_entries` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `app_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `peak_connection_count` int(11) NOT NULL,
  `websocket_message_count` int(11) NOT NULL,
  `api_message_count` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `websockets_statistics_entries`
--

LOCK TABLES `websockets_statistics_entries` WRITE;
/*!40000 ALTER TABLE `websockets_statistics_entries` DISABLE KEYS */;
/*!40000 ALTER TABLE `websockets_statistics_entries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'interligada'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-05 23:01:22
