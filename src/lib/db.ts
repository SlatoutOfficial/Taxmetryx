import mysql, { Pool } from "mysql2/promise";
import { hashPassword } from "@/lib/admin-auth";
import siteJson from "@/data/site.json";
import servicesJson from "@/data/services.json";
import insightsJson from "@/data/insights.json";
import industriesJson from "@/data/industries.json";
import careersJson from "@/data/careers.json";
import contactJson from "@/data/contact-submissions.json";

let pool: Pool | null = null;
let isConnected = false;
let lastCheckTime = 0;

export function getDbPool(): Pool {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.MYSQL_HOST || "localhost",
      port: Number(process.env.MYSQL_PORT) || 3306,
      user: process.env.MYSQL_USER || "root",
      password: process.env.MYSQL_PASSWORD || "",
      database: process.env.MYSQL_DATABASE || "taxmetryx",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      connectTimeout: 2000,
    });
  }
  return pool;
}

export async function checkDbConnection(): Promise<boolean> {
  const now = Date.now();
  if (now - lastCheckTime < 10000 && isConnected) {
    return isConnected;
  }

  try {
    const p = getDbPool();
    const conn = await p.getConnection();
    await conn.ping();
    conn.release();
    isConnected = true;
    lastCheckTime = now;
    return true;
  } catch {
    isConnected = false;
    lastCheckTime = now;
    return false;
  }
}

export async function initDatabaseSchema() {
  const p = getDbPool();
  
  // 1. Create tables if they do not exist
  await p.query(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id VARCHAR(64) PRIMARY KEY,
      email VARCHAR(191) NOT NULL UNIQUE,
      name VARCHAR(191) NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      role VARCHAR(50) DEFAULT 'admin',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await p.query(`
    CREATE TABLE IF NOT EXISTS services (
      id INT AUTO_INCREMENT PRIMARY KEY,
      slug VARCHAR(191) NOT NULL UNIQUE,
      number VARCHAR(10) NOT NULL,
      title VARCHAR(255) NOT NULL,
      eyebrow VARCHAR(255),
      short_description TEXT,
      description LONGTEXT,
      hero_statement VARCHAR(255),
      services_json LONGTEXT,
      capabilities_json LONGTEXT,
      approach_json LONGTEXT,
      why_it_matters_json LONGTEXT,
      deliverables_json LONGTEXT,
      frameworks_json LONGTEXT,
      icon VARCHAR(100),
      stats_json TEXT,
      related_slugs_json TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await p.query(`
    CREATE TABLE IF NOT EXISTS insights (
      id INT AUTO_INCREMENT PRIMARY KEY,
      slug VARCHAR(191) NOT NULL UNIQUE,
      title VARCHAR(255) NOT NULL,
      category VARCHAR(100) NOT NULL,
      published_at VARCHAR(50),
      read_time VARCHAR(50),
      day VARCHAR(10),
      month_year VARCHAR(50),
      featured TINYINT(1) DEFAULT 0,
      lead_text TEXT,
      excerpt TEXT,
      image VARCHAR(255),
      author_json LONGTEXT,
      table_of_contents_json LONGTEXT,
      key_takeaways_json LONGTEXT,
      sections_json LONGTEXT,
      tags_json TEXT,
      related_slugs_json TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await p.query(`
    CREATE TABLE IF NOT EXISTS industries (
      id INT AUTO_INCREMENT PRIMARY KEY,
      slug VARCHAR(191) NOT NULL UNIQUE,
      number VARCHAR(10) NOT NULL,
      name VARCHAR(255) NOT NULL,
      short_description TEXT,
      description LONGTEXT,
      challenges_json LONGTEXT,
      advisory_focus_json LONGTEXT,
      related_services_json TEXT,
      stats_json TEXT,
      image VARCHAR(255),
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await p.query(`
    CREATE TABLE IF NOT EXISTS careers (
      id VARCHAR(64) PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      department VARCHAR(100) NOT NULL,
      location VARCHAR(100) NOT NULL,
      type VARCHAR(50) NOT NULL,
      experience VARCHAR(50),
      overview TEXT,
      responsibilities_json LONGTEXT,
      requirements_json LONGTEXT,
      posted_date VARCHAR(50),
      status VARCHAR(20) DEFAULT 'ACTIVE',
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await p.query(`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id VARCHAR(64) PRIMARY KEY,
      name VARCHAR(191) NOT NULL,
      company VARCHAR(191) NOT NULL,
      email VARCHAR(191) NOT NULL,
      phone VARCHAR(50),
      area_of_interest VARCHAR(100),
      message LONGTEXT,
      status VARCHAR(50) DEFAULT 'NEW',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await p.query(`
    CREATE TABLE IF NOT EXISTS site_config (
      config_key VARCHAR(100) PRIMARY KEY,
      config_value LONGTEXT NOT NULL,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  // Default Admin User
  const defaultPasswordHash = hashPassword("Taxmetryx@2026");
  await p.query(
    `INSERT IGNORE INTO admin_users (id, email, name, password_hash, role) 
     VALUES (?, ?, ?, ?, ?)`,
    ["admin-01", "admin@taxmetryx.com", "Senior Managing Partner", defaultPasswordHash, "super_admin"]
  );
}

export async function syncJsonToMysql(): Promise<{ success: boolean; message: string; counts?: Record<string, number> }> {
  try {
    const isOnline = await checkDbConnection();
    if (!isOnline) {
      return { success: false, message: "MySQL database is not reachable. Check port and credentials." };
    }

    await initDatabaseSchema();
    const p = getDbPool();

    // 1. Services
    for (const s of servicesJson) {
      await p.query(
        `INSERT INTO services (slug, number, title, eyebrow, short_description, description, hero_statement, services_json, capabilities_json, approach_json, why_it_matters_json, deliverables_json, frameworks_json, icon, stats_json, related_slugs_json)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE 
          title = VALUES(title),
          eyebrow = VALUES(eyebrow),
          short_description = VALUES(short_description),
          description = VALUES(description),
          hero_statement = VALUES(hero_statement),
          services_json = VALUES(services_json),
          capabilities_json = VALUES(capabilities_json),
          approach_json = VALUES(approach_json),
          why_it_matters_json = VALUES(why_it_matters_json),
          deliverables_json = VALUES(deliverables_json),
          frameworks_json = VALUES(frameworks_json),
          icon = VALUES(icon),
          stats_json = VALUES(stats_json),
          related_slugs_json = VALUES(related_slugs_json)`,
        [
          s.slug,
          s.number,
          s.title,
          s.eyebrow,
          s.shortDescription,
          s.description,
          s.heroStatement,
          JSON.stringify(s.services),
          JSON.stringify(s.capabilities),
          JSON.stringify(s.approach),
          JSON.stringify(s.whyItMatters),
          JSON.stringify(s.keyDeliverables),
          JSON.stringify(s.applicableFrameworks),
          s.icon,
          JSON.stringify(s.stats || {}),
          JSON.stringify(s.relatedSlugs || []),
        ]
      );
    }

    // 2. Insights
    for (const i of insightsJson) {
      await p.query(
        `INSERT INTO insights (slug, title, category, published_at, read_time, day, month_year, featured, lead_text, excerpt, image, author_json, table_of_contents_json, key_takeaways_json, sections_json, tags_json, related_slugs_json)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
          title = VALUES(title),
          category = VALUES(category),
          published_at = VALUES(published_at),
          read_time = VALUES(read_time),
          day = VALUES(day),
          month_year = VALUES(month_year),
          featured = VALUES(featured),
          lead_text = VALUES(lead_text),
          excerpt = VALUES(excerpt),
          image = VALUES(image),
          author_json = VALUES(author_json),
          table_of_contents_json = VALUES(table_of_contents_json),
          key_takeaways_json = VALUES(key_takeaways_json),
          sections_json = VALUES(sections_json),
          tags_json = VALUES(tags_json),
          related_slugs_json = VALUES(related_slugs_json)`,
        [
          i.slug,
          i.title,
          i.category,
          i.publishedAt,
          i.readTime,
          i.day,
          i.monthYear,
          i.featured ? 1 : 0,
          i.lead,
          i.excerpt,
          i.image,
          JSON.stringify(i.author),
          JSON.stringify(i.tableOfContents || []),
          JSON.stringify(i.keyTakeaways || []),
          JSON.stringify(i.sections),
          JSON.stringify(i.tags),
          JSON.stringify(i.relatedSlugs || []),
        ]
      );
    }

    // 3. Industries
    for (const ind of industriesJson) {
      await p.query(
        `INSERT INTO industries (slug, number, name, short_description, description, challenges_json, advisory_focus_json, related_services_json, stats_json, image)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
          name = VALUES(name),
          short_description = VALUES(short_description),
          description = VALUES(description),
          challenges_json = VALUES(challenges_json),
          advisory_focus_json = VALUES(advisory_focus_json),
          related_services_json = VALUES(related_services_json),
          stats_json = VALUES(stats_json),
          image = VALUES(image)`,
        [
          ind.slug,
          ind.number,
          ind.name,
          ind.shortDescription,
          ind.description,
          JSON.stringify(ind.challenges),
          JSON.stringify(ind.advisoryFocus),
          JSON.stringify(ind.relatedServices),
          JSON.stringify(ind.stats || {}),
          ind.image,
        ]
      );
    }

    // 4. Careers
    for (const job of careersJson.openings) {
      await p.query(
        `INSERT INTO careers (id, title, department, location, type, experience, overview, responsibilities_json, requirements_json, posted_date)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
          title = VALUES(title),
          department = VALUES(department),
          location = VALUES(location),
          type = VALUES(type),
          experience = VALUES(experience),
          overview = VALUES(overview),
          responsibilities_json = VALUES(responsibilities_json),
          requirements_json = VALUES(requirements_json),
          posted_date = VALUES(posted_date)`,
        [
          job.id,
          job.title,
          job.department,
          job.location,
          job.type,
          job.experience,
          job.overview,
          JSON.stringify(job.responsibilities),
          JSON.stringify(job.requirements),
          job.postedDate,
        ]
      );
    }

    // 5. Site Config
    await p.query(
      `INSERT INTO site_config (config_key, config_value)
       VALUES ('main', ?)
       ON DUPLICATE KEY UPDATE config_value = VALUES(config_value)`,
      [JSON.stringify(siteJson)]
    );

    return {
      success: true,
      message: "MySQL database seeded successfully from Taxmetryx JSON records.",
      counts: {
        services: servicesJson.length,
        insights: insightsJson.length,
        industries: industriesJson.length,
        careers: careersJson.openings.length,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error seeding MySQL database",
    };
  }
}
