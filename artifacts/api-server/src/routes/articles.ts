import { Router } from "express";
import { db } from "@workspace/db";
import { articlesTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/articles", async (req, res) => {
  const { category, language } = req.query as Record<string, string | undefined>;
  let rows = await db.select().from(articlesTable);
  if (category) {
    rows = rows.filter((a) => a.category.toLowerCase() === category.toLowerCase());
  }
  if (language) {
    rows = rows.filter((a) => a.language.toLowerCase() === language.toLowerCase());
  }
  res.json(rows);
});

router.get("/articles/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const [article] = await db.select().from(articlesTable).where(eq(articlesTable.id, id));
  if (!article) {
    res.status(404).json({ error: "Article not found" });
    return;
  }
  // Increment view count
  await db.update(articlesTable).set({ viewCount: article.viewCount + 1 }).where(eq(articlesTable.id, id));
  res.json({ ...article, viewCount: article.viewCount + 1 });
});

export default router;
