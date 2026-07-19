import { Router } from "express";
import { db } from "@workspace/db";
import { emergencyContactsTable } from "@workspace/db";

const router = Router();

router.get("/emergency-contacts", async (req, res) => {
  const rows = await db.select().from(emergencyContactsTable);
  res.json(rows);
});

export default router;
