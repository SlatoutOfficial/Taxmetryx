import { PrismaClient } from "@prisma/client";
import servicesJson from "../src/data/services.json";
import insightsJson from "../src/data/insights.json";
import industriesJson from "../src/data/industries.json";
import careersJson from "../src/data/careers.json";
import siteJson from "../src/data/site.json";
import crypto from "crypto";

const prisma = new PrismaClient();

function hashPassword(password: string): string {
  const salt = "taxmetryx_salt_2026";
  return crypto.createHmac("sha256", salt).update(password).digest("hex");
}

export async function runPrismaSeed() {
  console.log("🌱 Starting Taxmetryx database seeding via Prisma...");

  // 1. Seed Default Super Admin
  const adminPasswordHash = hashPassword("Taxmetryx@2026");
  const admin = await prisma.adminUser.upsert({
    where: { email: "admin@taxmetryx.com" },
    update: {
      name: "Senior Managing Partner",
      passwordHash: adminPasswordHash,
      role: "super_admin",
    },
    create: {
      id: "admin-01",
      email: "admin@taxmetryx.com",
      name: "Senior Managing Partner",
      passwordHash: adminPasswordHash,
      role: "super_admin",
    },
  });
  console.log(`✓ Admin user seeded: ${admin.email}`);

  // 2. Seed Services
  let serviceCount = 0;
  for (const s of servicesJson) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: {
        number: s.number,
        title: s.title,
        eyebrow: s.eyebrow,
        shortDescription: s.shortDescription,
        description: s.description,
        heroStatement: s.heroStatement,
        servicesJson: JSON.stringify(s.services || []),
        capabilitiesJson: JSON.stringify(s.capabilities || []),
        approachJson: JSON.stringify(s.approach || []),
        whyItMattersJson: JSON.stringify(s.whyItMatters || {}),
        deliverablesJson: JSON.stringify(s.keyDeliverables || []),
        frameworksJson: JSON.stringify(s.applicableFrameworks || []),
        icon: s.icon,
        statsJson: JSON.stringify(s.stats || {}),
        relatedSlugsJson: JSON.stringify(s.relatedSlugs || []),
      },
      create: {
        slug: s.slug,
        number: s.number,
        title: s.title,
        eyebrow: s.eyebrow,
        shortDescription: s.shortDescription,
        description: s.description,
        heroStatement: s.heroStatement,
        servicesJson: JSON.stringify(s.services || []),
        capabilitiesJson: JSON.stringify(s.capabilities || []),
        approachJson: JSON.stringify(s.approach || []),
        whyItMattersJson: JSON.stringify(s.whyItMatters || {}),
        deliverablesJson: JSON.stringify(s.keyDeliverables || []),
        frameworksJson: JSON.stringify(s.applicableFrameworks || []),
        icon: s.icon,
        statsJson: JSON.stringify(s.stats || {}),
        relatedSlugsJson: JSON.stringify(s.relatedSlugs || []),
      },
    });
    serviceCount++;
  }
  console.log(`✓ Seeded ${serviceCount} services`);

  // 3. Seed Insights
  let insightCount = 0;
  for (const i of insightsJson) {
    await prisma.insight.upsert({
      where: { slug: i.slug },
      update: {
        title: i.title,
        category: i.category,
        publishedAt: i.publishedAt,
        readTime: i.readTime,
        day: i.day,
        monthYear: i.monthYear,
        featured: Boolean(i.featured),
        leadText: i.lead,
        excerpt: i.excerpt,
        image: i.image,
        authorJson: JSON.stringify(i.author || {}),
        tableOfContentsJson: JSON.stringify(i.tableOfContents || []),
        keyTakeawaysJson: JSON.stringify(i.keyTakeaways || []),
        sectionsJson: JSON.stringify(i.sections || []),
        tagsJson: JSON.stringify(i.tags || []),
        relatedSlugsJson: JSON.stringify(i.relatedSlugs || []),
      },
      create: {
        slug: i.slug,
        title: i.title,
        category: i.category,
        publishedAt: i.publishedAt,
        readTime: i.readTime,
        day: i.day,
        monthYear: i.monthYear,
        featured: Boolean(i.featured),
        leadText: i.lead,
        excerpt: i.excerpt,
        image: i.image,
        authorJson: JSON.stringify(i.author || {}),
        tableOfContentsJson: JSON.stringify(i.tableOfContents || []),
        keyTakeawaysJson: JSON.stringify(i.keyTakeaways || []),
        sectionsJson: JSON.stringify(i.sections || []),
        tagsJson: JSON.stringify(i.tags || []),
        relatedSlugsJson: JSON.stringify(i.relatedSlugs || []),
      },
    });
    insightCount++;
  }
  console.log(`✓ Seeded ${insightCount} insights`);

  // 4. Seed Industries
  let industryCount = 0;
  for (const ind of industriesJson) {
    await prisma.industry.upsert({
      where: { slug: ind.slug },
      update: {
        number: ind.number,
        name: ind.name,
        shortDescription: ind.shortDescription,
        description: ind.description,
        challengesJson: JSON.stringify(ind.challenges || []),
        advisoryFocusJson: JSON.stringify(ind.advisoryFocus || []),
        relatedServicesJson: JSON.stringify(ind.relatedServices || []),
        statsJson: JSON.stringify(ind.stats || {}),
        image: ind.image,
      },
      create: {
        slug: ind.slug,
        number: ind.number,
        name: ind.name,
        shortDescription: ind.shortDescription,
        description: ind.description,
        challengesJson: JSON.stringify(ind.challenges || []),
        advisoryFocusJson: JSON.stringify(ind.advisoryFocus || []),
        relatedServicesJson: JSON.stringify(ind.relatedServices || []),
        statsJson: JSON.stringify(ind.stats || {}),
        image: ind.image,
      },
    });
    industryCount++;
  }
  console.log(`✓ Seeded ${industryCount} industries`);

  // 5. Seed Careers
  let careerCount = 0;
  for (const job of careersJson.openings) {
    await prisma.career.upsert({
      where: { id: job.id },
      update: {
        title: job.title,
        department: job.department,
        location: job.location,
        type: job.type,
        experience: job.experience,
        overview: job.overview,
        responsibilitiesJson: JSON.stringify(job.responsibilities || []),
        requirementsJson: JSON.stringify(job.requirements || []),
        postedDate: job.postedDate,
        status: "ACTIVE",
      },
      create: {
        id: job.id,
        title: job.title,
        department: job.department,
        location: job.location,
        type: job.type,
        experience: job.experience,
        overview: job.overview,
        responsibilitiesJson: JSON.stringify(job.responsibilities || []),
        requirementsJson: JSON.stringify(job.requirements || []),
        postedDate: job.postedDate,
        status: "ACTIVE",
      },
    });
    careerCount++;
  }
  console.log(`✓ Seeded ${careerCount} career openings`);

  // 6. Seed Site Config
  await prisma.siteConfig.upsert({
    where: { key: "main" },
    update: {
      valueJson: JSON.stringify(siteJson),
    },
    create: {
      key: "main",
      valueJson: JSON.stringify(siteJson),
    },
  });
  console.log("✓ Seeded site configuration");

  return {
    success: true,
    counts: {
      admin: 1,
      services: serviceCount,
      insights: insightCount,
      industries: industryCount,
      careers: careerCount,
    },
  };
}

async function main() {
  try {
    const result = await runPrismaSeed();
    console.log("🎉 Seeding completed successfully:", result.counts);
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module || process.argv[1]?.includes("seed")) {
  main();
}
