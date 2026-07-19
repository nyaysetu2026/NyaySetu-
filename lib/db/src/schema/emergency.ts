import { pgTable, text, serial, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const emergencyContactsTable = pgTable("emergency_contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  phone: text("phone").notNull(),
  available247: boolean("available_247").notNull().default(true),
  category: text("category").notNull(),
});

export const insertEmergencyContactSchema = createInsertSchema(emergencyContactsTable).omit({ id: true });
export type InsertEmergencyContact = z.infer<typeof insertEmergencyContactSchema>;
export type EmergencyContact = typeof emergencyContactsTable.$inferSelect;
