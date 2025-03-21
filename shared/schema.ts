import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const prescriptions = pgTable("prescriptions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  imageBase64: text("image_base64").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertPrescriptionSchema = createInsertSchema(prescriptions).pick({
  userId: true,
  imageBase64: true,
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  prescriptionId: integer("prescription_id").references(() => prescriptions.id),
  content: text("content").notNull(),
  type: text("type").notNull(), // 'user', 'ai', 'system', 'prescription'
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertMessageSchema = createInsertSchema(messages).pick({
  prescriptionId: true,
  content: true,
  type: true,
  metadata: true,
});

export const feedbacks = pgTable("feedbacks", {
  id: serial("id").primaryKey(),
  messageId: integer("message_id").references(() => messages.id),
  isAccurate: boolean("is_accurate").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertFeedbackSchema = createInsertSchema(feedbacks).pick({
  messageId: true,
  isAccurate: true,
});

export type InsertPrescription = z.infer<typeof insertPrescriptionSchema>;
export type Prescription = typeof prescriptions.$inferSelect;

export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;

export type InsertFeedback = z.infer<typeof insertFeedbackSchema>;
export type Feedback = typeof feedbacks.$inferSelect;

export const medicationSchema = z.object({
  name: z.string(),
  dosage: z.string(),
  instructions: z.string().optional(),
});

export type Medication = z.infer<typeof medicationSchema>;

export const prescriptionAnalysisSchema = z.object({
  medications: z.array(medicationSchema),
  additionalInfo: z.string().optional(),
  unreadableImage: z.boolean().optional(),
});

export type PrescriptionAnalysis = z.infer<typeof prescriptionAnalysisSchema>;
