import { users, type User, type InsertUser, InsertPrescription, Prescription, InsertMessage, Message, InsertFeedback, Feedback } from "@shared/schema";

// Modify the interface with any CRUD methods
// you might need
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createPrescription(prescription: InsertPrescription): Promise<Prescription>;
  getPrescription(id: number): Promise<Prescription | undefined>;
  createMessage(message: InsertMessage): Promise<Message>;
  getMessage(id: number): Promise<Message | undefined>;
  getMessagesByPrescriptionId(prescriptionId: number): Promise<Message[]>;
  createFeedback(feedback: InsertFeedback): Promise<Feedback>;
  getFeedback(id: number): Promise<Feedback | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private prescriptions: Map<number, Prescription>;
  private messages: Map<number, Message>;
  private feedbacks: Map<number, Feedback>;
  private currentUserId: number;
  private currentPrescriptionId: number;
  private currentMessageId: number;
  private currentFeedbackId: number;

  constructor() {
    this.users = new Map();
    this.prescriptions = new Map();
    this.messages = new Map();
    this.feedbacks = new Map();
    this.currentUserId = 1;
    this.currentPrescriptionId = 1;
    this.currentMessageId = 1;
    this.currentFeedbackId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createPrescription(insertPrescription: InsertPrescription): Promise<Prescription> {
    const id = this.currentPrescriptionId++;
    const prescription: Prescription = { 
      ...insertPrescription, 
      id, 
      createdAt: new Date() 
    };
    this.prescriptions.set(id, prescription);
    return prescription;
  }

  async getPrescription(id: number): Promise<Prescription | undefined> {
    return this.prescriptions.get(id);
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.currentMessageId++;
    const message: Message = {
      ...insertMessage,
      id,
      createdAt: new Date()
    };
    this.messages.set(id, message);
    return message;
  }

  async getMessage(id: number): Promise<Message | undefined> {
    return this.messages.get(id);
  }

  async getMessagesByPrescriptionId(prescriptionId: number): Promise<Message[]> {
    return Array.from(this.messages.values()).filter(
      (message) => message.prescriptionId === prescriptionId
    );
  }

  async createFeedback(insertFeedback: InsertFeedback): Promise<Feedback> {
    const id = this.currentFeedbackId++;
    const feedback: Feedback = {
      ...insertFeedback,
      id,
      createdAt: new Date()
    };
    this.feedbacks.set(id, feedback);
    return feedback;
  }

  async getFeedback(id: number): Promise<Feedback | undefined> {
    return this.feedbacks.get(id);
  }
}

export const storage = new MemStorage();
