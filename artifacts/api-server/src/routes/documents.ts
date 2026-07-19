import { Router } from "express";
import { db } from "@workspace/db";
import { legalDocumentsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/documents", async (req, res) => {
  const { category } = req.query as Record<string, string | undefined>;
  let rows = await db.select().from(legalDocumentsTable);
  if (category) {
    rows = rows.filter((d) => d.category.toLowerCase() === category.toLowerCase());
  }
  res.json(rows);
});

router.get("/documents/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const [doc] = await db.select().from(legalDocumentsTable).where(eq(legalDocumentsTable.id, id));
  if (!doc) {
    res.status(404).json({ error: "Document not found" });
    return;
  }
  res.json(doc);
});

export default router;
