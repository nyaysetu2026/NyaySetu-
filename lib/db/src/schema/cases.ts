import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const legalCasesTable = pgTable("legal_cases", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  status: text("status").notNull().default("active"),
  caseNumber: text("case_number"),
  court: text("court"),
  nextHearingDate: text("next_hearing_date"),
  lawyerName: text("lawyer_name"),
  category: text("category").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertLegalCaseSchema = createInsertSchema(legalCasesTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertLegalCase = z.infer<typeof insertLegalCaseSchema>;
export type LegalCase = typeof legalCasesTable.$inferSelect;
