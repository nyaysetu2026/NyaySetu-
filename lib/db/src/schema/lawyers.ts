import { pgTable, text, serial, integer, real, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const lawyersTable = pgTable("lawyers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  specialization: text("specialization").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  experience: integer("experience").notNull(),
  rating: real("rating").notNull().default(0),
  reviewCount: integer("review_count").notNull().default(0),
  languages: json("languages").$type<string[]>().notNull().default([]),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  barCouncilId: text("bar_council_id").notNull(),
  bio: text("bio").notNull(),
  fee: integer("fee").notNull(),
  available: boolean("available").notNull().default(true),
  imageUrl: text("image_url"),
});

export const insertLawyerSchema = createInsertSchema(lawyersTable).omit({ id: true });
export type InsertLawyer = z.infer<typeof insertLawyerSchema>;
export type Lawyer = typeof lawyersTable.$inferSelect;
