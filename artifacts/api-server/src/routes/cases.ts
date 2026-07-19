import { Router } from "express";
import { db } from "@workspace/db";
import { legalCasesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { CreateCaseBody, UpdateCaseBody, GetCaseParams, UpdateCaseParams, DeleteCaseParams } from "@workspace/api-zod";

const router = Router();

router.get("/cases", async (req, res) => {
  const rows = await db.select().from(legalCasesTable).orderBy(legalCasesTable.createdAt);
  res.json(rows);
});

router.post("/cases", async (req, res) => {
  const parsed = CreateCaseBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }
  const [created] = await db.insert(legalCasesTable).values(parsed.data).returning();
  res.status(201).json(created);
});

router.get("/cases/:id", async (req, res) => {
  const params = GetCaseParams.safeParse({ id: Number(req.params.id) });
  if (!params.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const [legalCase] = await db.select().from(legalCasesTable).where(eq(legalCasesTable.id, params.data.id));
  if (!legalCase) {
    res.status(404).json({ error: "Case not found" });
    return;
  }
  res.json(legalCase);
});

router.patch("/cases/:id", async (req, res) => {
  const params = UpdateCaseParams.safeParse({ id: Number(req.params.id) });
  const body = UpdateCaseBody.safeParse(req.body);
  if (!params.success || !body.success) {
    res.status(400).json({ error: "Invalid request" });
    return;
  }
  const [existing] = await db.select().from(legalCasesTable).where(eq(legalCasesTable.id, params.data.id));
  if (!existing) {
    res.status(404).json({ error: "Case not found" });
    return;
  }
  const [updated] = await db
    .update(legalCasesTable)
    .set({ ...body.data, updatedAt: new Date() })
    .where(eq(legalCasesTable.id, params.data.id))
    .returning();
  res.json(updated);
});

router.delete("/cases/:id", async (req, res) => {
  const params = DeleteCaseParams.safeParse({ id: Number(req.params.id) });
  if (!params.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  await db.delete(legalCasesTable).where(eq(legalCasesTable.id, params.data.id));
  res.status(204).send();
});

export default router;
