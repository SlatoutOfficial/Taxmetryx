-- Taxmetryx MySQL Database Schema

CREATE DATABASE IF NOT EXISTS `taxmetryx` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `taxmetryx`;

-- 1. Admin Users
CREATE TABLE IF NOT EXISTS `admin_users` (
  `id` VARCHAR(64) PRIMARY KEY,
  `email` VARCHAR(191) NOT NULL UNIQUE,
  `name` VARCHAR(191) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` VARCHAR(50) DEFAULT 'admin',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Services
CREATE TABLE IF NOT EXISTS `services` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `slug` VARCHAR(191) NOT NULL UNIQUE,
  `number` VARCHAR(10) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `eyebrow` VARCHAR(255),
  `short_description` TEXT,
  `description` LONGTEXT,
  `hero_statement` VARCHAR(255),
  `services_json` LONGTEXT,
  `capabilities_json` LONGTEXT,
  `approach_json` LONGTEXT,
  `why_it_matters_json` LONGTEXT,
  `deliverables_json` LONGTEXT,
  `frameworks_json` LONGTEXT,
  `icon` VARCHAR(100),
  `stats_json` TEXT,
  `related_slugs_json` TEXT,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Insights (Publications)
CREATE TABLE IF NOT EXISTS `insights` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `slug` VARCHAR(191) NOT NULL UNIQUE,
  `title` VARCHAR(255) NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `published_at` VARCHAR(50),
  `read_time` VARCHAR(50),
  `day` VARCHAR(10),
  `month_year` VARCHAR(50),
  `featured` TINYINT(1) DEFAULT 0,
  `lead_text` TEXT,
  `excerpt` TEXT,
  `image` VARCHAR(255),
  `author_json` LONGTEXT,
  `table_of_contents_json` LONGTEXT,
  `key_takeaways_json` LONGTEXT,
  `sections_json` LONGTEXT,
  `tags_json` TEXT,
  `related_slugs_json` TEXT,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Industries
CREATE TABLE IF NOT EXISTS `industries` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `slug` VARCHAR(191) NOT NULL UNIQUE,
  `number` VARCHAR(10) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `short_description` TEXT,
  `description` LONGTEXT,
  `challenges_json` LONGTEXT,
  `advisory_focus_json` LONGTEXT,
  `related_services_json` TEXT,
  `stats_json` TEXT,
  `image` VARCHAR(255),
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Careers
CREATE TABLE IF NOT EXISTS `careers` (
  `id` VARCHAR(64) PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `department` VARCHAR(100) NOT NULL,
  `location` VARCHAR(100) NOT NULL,
  `type` VARCHAR(50) NOT NULL,
  `experience` VARCHAR(50),
  `overview` TEXT,
  `responsibilities_json` LONGTEXT,
  `requirements_json` LONGTEXT,
  `posted_date` VARCHAR(50),
  `status` VARCHAR(20) DEFAULT 'ACTIVE',
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Contact Inquiries
CREATE TABLE IF NOT EXISTS `contact_submissions` (
  `id` VARCHAR(64) PRIMARY KEY,
  `name` VARCHAR(191) NOT NULL,
  `company` VARCHAR(191) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `phone` VARCHAR(50),
  `area_of_interest` VARCHAR(100),
  `message` LONGTEXT,
  `status` VARCHAR(50) DEFAULT 'NEW',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Site Configuration
CREATE TABLE IF NOT EXISTS `site_config` (
  `config_key` VARCHAR(100) PRIMARY KEY,
  `config_value` LONGTEXT NOT NULL,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
