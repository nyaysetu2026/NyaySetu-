import { Router } from "express";
import { db } from "@workspace/db";
import { lawyersTable } from "@workspace/db";
import { eq, ilike, or, sql } from "drizzle-orm";

const router = Router();

router.get("/lawyers", async (req, res) => {
  const { search, specialization, city, language } = req.query as Record<string, string | undefined>;

  let rows = await db.select().from(lawyersTable);

  if (search) {
    const q = search.toLowerCase();
    rows = rows.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.specialization.toLowerCase().includes(q) ||
        l.city.toLowerCase().includes(q)
    );
  }
  if (specialization) {
    rows = rows.filter((l) => l.specialization.toLowerCase().includes(specialization.toLowerCase()));
  }
  if (city) {
    rows = rows.filter((l) => l.city.toLowerCase().includes(city.toLowerCase()));
  }
  if (language) {
    rows = rows.filter((l) => (l.languages as string[]).some((lang) => lang.toLowerCase().includes(language.toLowerCase())));
  }

  res.json(rows);
});

router.get("/lawyers/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const [lawyer] = await db.select().from(lawyersTable).where(eq(lawyersTable.id, id));
  if (!lawyer) {
    res.status(404).json({ error: "Lawyer not found" });
    return;
  }
  res.json(lawyer);
});

export default router;
