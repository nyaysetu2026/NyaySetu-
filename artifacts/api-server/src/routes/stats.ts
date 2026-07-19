import { Router } from "express";
import { db } from "@workspace/db";
import {
  lawyersTable,
  legalDocumentsTable,
  articlesTable,
  legalCasesTable,
  conversations as conversationsTable,
  emergencyContactsTable,
} from "@workspace/db";
import { eq, sql } from "drizzle-orm";

const router = Router();

router.get("/stats", async (req, res) => {
  const [
    lawyerRows,
    docRows,
    articleRows,
    caseRows,
    activeCaseRows,
    convRows,
  ] = await Promise.all([
    db.select({ count: sql<number>`count(*)` }).from(lawyersTable),
    db.select({ count: sql<number>`count(*)` }).from(legalDocumentsTable),
    db.select({ count: sql<number>`count(*)` }).from(articlesTable),
    db.select({ count: sql<number>`count(*)` }).from(legalCasesTable),
    db.select({ count: sql<number>`count(*)` }).from(legalCasesTable).where(eq(legalCasesTable.status, "active")),
    db.select({ count: sql<number>`count(*)` }).from(conversationsTable),
  ]);

  res.json({
    totalLawyers: Number(lawyerRows[0]?.count ?? 0),
    totalDocuments: Number(docRows[0]?.count ?? 0),
    totalArticles: Number(articleRows[0]?.count ?? 0),
    totalCases: Number(caseRows[0]?.count ?? 0),
    activeCases: Number(activeCaseRows[0]?.count ?? 0),
    citiesServed: 28,
    languagesSupported: 12,
    aiConversations: Number(convRows[0]?.count ?? 0),
  });
});

export default router;
