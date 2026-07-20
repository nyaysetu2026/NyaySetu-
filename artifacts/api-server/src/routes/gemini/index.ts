import { Router } from "express";
import { db } from "@workspace/db";
import { conversations as conversationsTable, messages as messagesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import {
  CreateGeminiConversationBody,
  SendGeminiMessageBody,
  GetGeminiConversationParams,
  DeleteGeminiConversationParams,
  ListGeminiMessagesParams,
  SendGeminiMessageParams,
} from "@workspace/api-zod";

const router = Router();

// List conversations
router.get("/gemini/conversations", async (req, res) => {
  const rows = await db.select().from(conversationsTable).orderBy(conversationsTable.createdAt);
  res.json(rows.map((c) => ({ id: c.id, title: c.title, createdAt: c.createdAt })));
});

// Create conversation
router.post("/gemini/conversations", async (req, res) => {
  const parsed = CreateGeminiConversationBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }
  const [created] = await db.insert(conversationsTable).values({ title: parsed.data.title }).returning();
  res.status(201).json({ id: created.id, title: created.title, createdAt: created.createdAt });
});

// Get conversation with messages
router.get("/gemini/conversations/:id", async (req, res) => {
  const params = GetGeminiConversationParams.safeParse({ id: Number(req.params.id) });
  if (!params.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const [conv] = await db.select().from(conversationsTable).where(eq(conversationsTable.id, params.data.id));
  if (!conv) {
    res.status(404).json({ error: "Conversation not found" });
    return;
  }
  const msgs = await db.select().from(messagesTable).where(eq(messagesTable.conversationId, conv.id)).orderBy(messagesTable.createdAt);
  res.json({ id: conv.id, title: conv.title, createdAt: conv.createdAt, messages: msgs });
});

// Delete conversation
router.delete("/gemini/conversations/:id", async (req, res) => {
  const params = DeleteGeminiConversationParams.safeParse({ id: Number(req.params.id) });
  if (!params.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const [conv] = await db.select().from(conversationsTable).where(eq(conversationsTable.id, params.data.id));
  if (!conv) {
    res.status(404).json({ error: "Conversation not found" });
    return;
  }
  await db.delete(messagesTable).where(eq(messagesTable.conversationId, conv.id));
  await db.delete(conversationsTable).where(eq(conversationsTable.id, conv.id));
  res.status(204).send();
});

// Clear messages (keep conversation)
router.delete("/gemini/conversations/:id/messages", async (req, res) => {
  const params = DeleteGeminiConversationParams.safeParse({ id: Number(req.params.id) });
  if (!params.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const [conv] = await db.select().from(conversationsTable).where(eq(conversationsTable.id, params.data.id));
  if (!conv) {
    res.status(404).json({ error: "Conversation not found" });
    return;
  }
  await db.delete(messagesTable).where(eq(messagesTable.conversationId, conv.id));
  res.status(204).send();
});

// List messages
router.get("/gemini/conversations/:id/messages", async (req, res) => {
  const params = ListGeminiMessagesParams.safeParse({ id: Number(req.params.id) });
  if (!params.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const msgs = await db.select().from(messagesTable).where(eq(messagesTable.conversationId, params.data.id)).orderBy(messagesTable.createdAt);
  res.json(msgs);
});

// Send message (SSE streaming)
router.post("/gemini/conversations/:id/messages", async (req, res) => {
  const params = SendGeminiMessageParams.safeParse({ id: Number(req.params.id) });
  const body = SendGeminiMessageBody.safeParse(req.body);
  if (!params.success || !body.success) {
    res.status(400).json({ error: "Invalid request" });
    return;
  }

  const convId = params.data.id;
  const [conv] = await db.select().from(conversationsTable).where(eq(conversationsTable.id, convId));
  if (!conv) {
    res.status(404).json({ error: "Conversation not found" });
    return;
  }

  // Save user message
  await db.insert(messagesTable).values({ conversationId: convId, role: "user", content: body.data.content });

  // Load conversation history
  const history = await db.select().from(messagesTable).where(eq(messagesTable.conversationId, convId)).orderBy(messagesTable.createdAt);

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const apiKey = process.env.GEMINI_API_KEY || process.env.AI_INTEGRATIONS_GEMINI_API_KEY;
  const baseUrl = process.env.AI_INTEGRATIONS_GEMINI_BASE_URL;

  if (!apiKey) {
    res.write(`data: ${JSON.stringify({ content: "AI service is not configured. Please add your GEMINI_API_KEY." })}\n\n`);
    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
    return;
  }

  try {
    const { GoogleGenAI } = await import("@google/genai");
    const ai = new GoogleGenAI({ apiKey, ...(baseUrl ? { baseUrl } : {}) });

    const systemInstruction = `You are NyaySetu AI — India's most trusted multilingual legal assistant.

LANGUAGE RULE (most important): ALWAYS detect the language the user writes in and reply in THAT EXACT SAME LANGUAGE. Never switch languages unless the user explicitly asks you to. If the user writes in Hindi (Devanagari or Roman/Hinglish), reply fully in Hindi. If Tamil, reply in Tamil. If Bengali, reply in Bengali. If Telugu, reply in Telugu. If Marathi, reply in Marathi. If Gujarati, reply in Gujarati. If Kannada, reply in Kannada. If Punjabi, reply in Punjabi. If Urdu, reply in Urdu. If English, reply in English. Match the user's script and language perfectly.

You help every Indian citizen — regardless of their language or education level — understand their legal rights and navigate India's justice system.

EXPERTISE: Constitution of India, IPC (Indian Penal Code), CrPC (Code of Criminal Procedure), BNS (Bharatiya Nyaya Sanhita), civil law, family law (Hindu Marriage Act, Muslim Personal Law, Special Marriage Act), property law, consumer rights (Consumer Protection Act), RTI (Right to Information Act), labour law, women's rights (POSH Act, Domestic Violence Act, Dowry Prohibition Act), child rights (POCSO), cyber law (IT Act), banking & loan disputes, landlord-tenant law, and more.

STYLE: Be warm, empathetic, and professional. Use simple language that a common citizen can understand. Explain legal terms when you use them. Always clarify you provide legal information and general guidance, not formal legal advice — and recommend consulting a licensed advocate for specific case strategy.

RESPONSE FORMAT: Use clear sections, bullet points, and numbered steps when explaining procedures. Keep responses focused and actionable.`;


    const chatMessages = history.map((m) => ({
      role: m.role === "assistant" ? "model" as const : "user" as const,
      parts: [{ text: m.content }],
    }));

    const stream = await ai.models.generateContentStream({
      model: "gemini-2.0-flash",
      contents: chatMessages,
      config: {
        maxOutputTokens: 8192,
        systemInstruction,
      },
    });

    let fullResponse = "";
    for await (const chunk of stream) {
      const text = chunk.text;
      if (text) {
        fullResponse += text;
        res.write(`data: ${JSON.stringify({ content: text })}\n\n`);
      }
    }

    // Save assistant message
    await db.insert(messagesTable).values({ conversationId: convId, role: "assistant", content: fullResponse });

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.write(`data: ${JSON.stringify({ content: `Error: ${message}` })}\n\n`);
    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  }
});

export default router;
