import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";
import { prisma, checkPrismaConnection } from "@/lib/prisma";
import { getSession } from "@/lib/admin-auth";
import { getInsights } from "@/lib/json";
import { successResponse, errorResponse } from "@/lib/api-response";
import { convertHtmlToMarkdown, parseMarkdownToSections } from "@/lib/turndown";
import { Insight } from "@/types/insight";

const INSIGHTS_FILE = path.join(process.cwd(), "src", "data", "insights.json");

function readInsightsFromFile(): Insight[] {
  try {
    if (fs.existsSync(INSIGHTS_FILE)) {
      const content = fs.readFileSync(INSIGHTS_FILE, "utf-8");
      return JSON.parse(content);
    }
  } catch (e) {
    console.error("Error reading insights.json:", e);
  }
  return getInsights();
}

function writeInsightsToFile(insights: Insight[]) {
  try {
    fs.writeFileSync(INSIGHTS_FILE, JSON.stringify(insights, null, 2), "utf-8");
  } catch (e) {
    console.error("Error writing insights.json:", e);
  }
}

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) return errorResponse("Unauthorized", 401);

  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  // 1. Prisma (Supabase)
  try {
    const isPrismaOnline = await checkPrismaConnection();
    if (isPrismaOnline) {
      if (slug) {
        const r = await prisma.insight.findUnique({ where: { slug } });
        if (r) {
          const formatted = {
            id: r.id,
            slug: r.slug,
            title: r.title,
            category: r.category,
            publishedAt: r.publishedAt,
            readTime: r.readTime,
            day: r.day,
            monthYear: r.monthYear,
            featured: r.featured,
            lead: r.leadText,
            excerpt: r.excerpt,
            image: r.image,
            author: JSON.parse(r.authorJson || "{}"),
            tableOfContents: JSON.parse(r.tableOfContentsJson || "[]"),
            keyTakeaways: JSON.parse(r.keyTakeawaysJson || "[]"),
            sections: JSON.parse(r.sectionsJson || "[]"),
            tags: JSON.parse(r.tagsJson || "[]"),
            relatedSlugs: JSON.parse(r.relatedSlugsJson || "[]"),
          };
          return successResponse(formatted, "Publication retrieved from Supabase");
        }
      } else {
        const rows = await prisma.insight.findMany({
          orderBy: { id: "desc" },
        });
        const formatted = rows.map((r) => ({
          id: r.id,
          slug: r.slug,
          title: r.title,
          category: r.category,
          publishedAt: r.publishedAt,
          readTime: r.readTime,
          day: r.day,
          monthYear: r.monthYear,
          featured: r.featured,
          lead: r.leadText,
          excerpt: r.excerpt,
          image: r.image,
          author: JSON.parse(r.authorJson || "{}"),
          tableOfContents: JSON.parse(r.tableOfContentsJson || "[]"),
          keyTakeaways: JSON.parse(r.keyTakeawaysJson || "[]"),
          sections: JSON.parse(r.sectionsJson || "[]"),
          tags: JSON.parse(r.tagsJson || "[]"),
          relatedSlugs: JSON.parse(r.relatedSlugsJson || "[]"),
        }));
        return successResponse(formatted, "Insights retrieved from Supabase (Prisma)");
      }
    }
  } catch (err) {
    console.warn("[Admin/Insights] Prisma query failed, using static fallback:", err);
  }

  // 2. File fallback
  const fileInsights = readInsightsFromFile();
  if (slug) {
    const found = fileInsights.find((i) => i.slug === slug);
    if (!found) return errorResponse("Publication not found", 404);
    return successResponse(found, "Publication loaded from fallback cache");
  }
  return successResponse(fileInsights, "Insights loaded from fallback static cache");
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) return errorResponse("Unauthorized", 401);

  try {
    const data = await request.json();
    if (!data.slug || !data.title) {
      return errorResponse("Slug and title are required", 400);
    }

    // Process HTML to Markdown using Turndown GFM if provided
    let finalSections = data.sections || [];
    let markdownBody = data.markdown || "";

    if (data.htmlContent) {
      markdownBody = convertHtmlToMarkdown(data.htmlContent);
    }

    if (markdownBody && (!finalSections || finalSections.length === 0)) {
      finalSections = parseMarkdownToSections(markdownBody);
    }

    const newInsight: Insight = {
      id: data.id || Date.now(),
      slug: data.slug,
      title: data.title,
      category: data.category || "Corporate Tax",
      publishedAt: data.publishedAt || new Date().toISOString().split("T")[0],
      readTime: data.readTime || "7 min read",
      day: data.day || new Date().getDate().toString().padStart(2, "0"),
      monthYear:
        data.monthYear ||
        new Date()
          .toLocaleDateString("en-US", { month: "short", year: "numeric" })
          .toUpperCase(),
      featured: Boolean(data.featured),
      lead: data.lead || "",
      excerpt: data.excerpt || "",
      image: data.image || "/images/insights-architecture.jpg",
      author: data.author || { name: "Taxmetryx Partner", role: "Advisory Leader" },
      tableOfContents: data.tableOfContents || [],
      keyTakeaways: data.keyTakeaways || [],
      sections: finalSections,
      tags: data.tags || [],
      relatedSlugs: data.relatedSlugs || [],
    };

    // Always persist to local file fallback
    const fileInsights = readInsightsFromFile();
    const existingIndex = fileInsights.findIndex((i) => i.slug === data.slug);
    if (existingIndex !== -1) {
      fileInsights[existingIndex] = { ...fileInsights[existingIndex], ...newInsight };
    } else {
      fileInsights.unshift(newInsight);
    }
    writeInsightsToFile(fileInsights);

    // Prisma (Supabase) if online
    try {
      const isPrismaOnline = await checkPrismaConnection();
      if (isPrismaOnline) {
        const created = await prisma.insight.create({
          data: {
            slug: data.slug,
            title: data.title,
            category: newInsight.category,
            publishedAt: newInsight.publishedAt,
            readTime: newInsight.readTime,
            day: newInsight.day,
            monthYear: newInsight.monthYear,
            featured: Boolean(newInsight.featured),
            leadText: newInsight.lead || "",
            excerpt: newInsight.excerpt || "",
            image: newInsight.image || "/images/insights-architecture.jpg",
            authorJson: JSON.stringify(newInsight.author),
            tableOfContentsJson: JSON.stringify(newInsight.tableOfContents || []),
            keyTakeawaysJson: JSON.stringify(newInsight.keyTakeaways || []),
            sectionsJson: JSON.stringify(finalSections),
            tagsJson: JSON.stringify(newInsight.tags || []),
            relatedSlugsJson: JSON.stringify(data.relatedSlugs || []),
          },
        });
        try {
          revalidatePath("/", "layout");
          revalidatePath("/insights");
          revalidatePath(`/insights/${data.slug}`);
        } catch (e) {
          console.warn("Revalidation error:", e);
        }
        return successResponse(created, "Publication created successfully in Supabase");
      }
    } catch (err) {
      console.warn("[Admin/Insights] Prisma create failed, saved to file:", err);
    }

    try {
      revalidatePath("/", "layout");
      revalidatePath("/insights");
      revalidatePath(`/insights/${data.slug}`);
    } catch (e) {
      console.warn("Revalidation error:", e);
    }

    return successResponse(newInsight, "Publication created successfully");
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "Database error", 500);
  }
}

export async function PUT(request: NextRequest) {
  const session = await getSession();
  if (!session) return errorResponse("Unauthorized", 401);

  try {
    const data = await request.json();
    if (!data.slug || !data.title) {
      return errorResponse("Slug and title are required", 400);
    }

    const targetSlug = data.originalSlug || data.slug;

    // Process HTML to Markdown using Turndown GFM if provided
    let finalSections = data.sections || [];
    let markdownBody = data.markdown || "";

    if (data.htmlContent) {
      markdownBody = convertHtmlToMarkdown(data.htmlContent);
    }

    if (markdownBody && (!finalSections || finalSections.length === 0)) {
      finalSections = parseMarkdownToSections(markdownBody);
    }

    // Always persist to local file fallback
    const fileInsights = readInsightsFromFile();
    const existingIndex = fileInsights.findIndex((i) => i.slug === targetSlug || i.slug === data.slug);
    const updatedInsightObj: Insight = {
      ...(existingIndex !== -1 ? fileInsights[existingIndex] : {}),
      ...data,
      sections: finalSections.length > 0 ? finalSections : (existingIndex !== -1 ? fileInsights[existingIndex].sections : []),
    };

    if (existingIndex !== -1) {
      fileInsights[existingIndex] = updatedInsightObj;
    } else {
      fileInsights.unshift(updatedInsightObj);
    }
    writeInsightsToFile(fileInsights);

    // Prisma (Supabase) if online
    try {
      const isPrismaOnline = await checkPrismaConnection();
      if (isPrismaOnline) {
        const updated = await prisma.insight.update({
          where: { slug: targetSlug },
          data: {
            slug: data.slug,
            title: data.title,
            category: data.category,
            readTime: data.readTime,
            featured: Boolean(data.featured),
            leadText: data.lead,
            excerpt: data.excerpt,
            image: data.image,
            authorJson: JSON.stringify(data.author || {}),
            keyTakeawaysJson: JSON.stringify(data.keyTakeaways || []),
            sectionsJson: JSON.stringify(finalSections),
            tagsJson: JSON.stringify(data.tags || []),
          },
        });

        try {
          revalidatePath("/", "layout");
          revalidatePath("/insights");
          revalidatePath(`/insights/${data.slug}`);
          if (targetSlug !== data.slug) {
            revalidatePath(`/insights/${targetSlug}`);
          }
        } catch (e) {
          console.warn("Revalidation error:", e);
        }

        return successResponse(updated, "Publication updated successfully in Supabase");
      }
    } catch (err) {
      console.warn("[Admin/Insights] Prisma update failed, saved to file:", err);
    }

    try {
      revalidatePath("/", "layout");
      revalidatePath("/insights");
      revalidatePath(`/insights/${data.slug}`);
      if (targetSlug !== data.slug) {
        revalidatePath(`/insights/${targetSlug}`);
      }
    } catch (e) {
      console.warn("Revalidation error:", e);
    }

    return successResponse(updatedInsightObj, "Publication updated and saved successfully");
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "Database error", 500);
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getSession();
  if (!session) return errorResponse("Unauthorized", 401);

  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    if (!slug) {
      return errorResponse("Slug parameter is required", 400);
    }

    // Always delete from local file
    const fileInsights = readInsightsFromFile();
    const filtered = fileInsights.filter((i) => i.slug !== slug);
    writeInsightsToFile(filtered);

    // Prisma (Supabase) if online
    try {
      const isPrismaOnline = await checkPrismaConnection();
      if (isPrismaOnline) {
        await prisma.insight.delete({
          where: { slug },
        });

        try {
          revalidatePath("/", "layout");
          revalidatePath("/insights");
          revalidatePath(`/insights/${slug}`);
        } catch (e) {
          console.warn("Revalidation error:", e);
        }

        return successResponse(null, "Publication deleted successfully from database");
      }
    } catch (err) {
      console.warn("[Admin/Insights] Prisma delete failed:", err);
    }

    try {
      revalidatePath("/", "layout");
      revalidatePath("/insights");
      revalidatePath(`/insights/${slug}`);
    } catch (e) {
      console.warn("Revalidation error:", e);
    }

    return successResponse(null, "Publication deleted successfully");
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "Database error", 500);
  }
}

