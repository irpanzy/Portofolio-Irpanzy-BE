import { v4 as uuidv4 } from "uuid";
import { getGeminiModel } from "../config";
import { Project, Experience, About, TechStack, Service } from "../models";
import { ChatHistory } from "../models";
import { IChatRequest, IChatResponse } from "../types";
import { ApiError } from "../utils";

export class ChatService {
  private async buildPortfolioContext(): Promise<string> {
    try {
      const [about, projects, experiences, techStack, services] =
        await Promise.all([
          About.findOne(),
          Project.find({ isVisible: true }).sort({ order: 1 }),
          Experience.find().sort({ order: 1 }),
          TechStack.find().sort({ category: 1, order: 1 }),
          Service.find().sort({ order: 1 }),
        ]);

      const context = `
=== IRFAN MURIA PORTFOLIO DATA ===

[ABOUT & PROFILE]
${about?.bio || "No bio available"}
Hero Title: ${about?.heroTitle || "N/A"}
Hero Subtitle: ${about?.heroSubtitle || "N/A"}
Hero Description: ${about?.heroDescription || "N/A"}
Resume: ${about?.resumeLink || "N/A"}

${about?.infoList && about.infoList.length > 0 ? "[INFO]" : ""}
${about?.infoList?.map((info) => `${info.title}: ${info.description}`).join("\n") || ""}

[WORK EXPERIENCE]
${experiences
  .map(
    (exp) => `
- ${exp.position} at ${exp.company}
  Period: ${exp.period}
  Location: ${exp.location}
  Responsibilities:
${exp.responsibilities.map((r) => `    * ${r}`).join("\n")}
`
  )
  .join("\n")}

[PROJECTS]
${projects
  .map(
    (project) => `
- ${project.title}
  Description: ${project.description}
  Tech Stack: ${project.techStack.map((t) => t.title).join(", ")}
  ${project.demoLink ? `Demo: ${project.demoLink}` : ""}
  ${project.githubLink ? `GitHub: ${project.githubLink}` : ""}
`
  )
  .join("\n")}

[TECHNICAL SKILLS]
${techStack
  .reduce((acc: any, tech) => {
    if (!acc[tech.category]) acc[tech.category] = [];
    acc[tech.category].push(tech.title);
    return acc;
  }, {})
  .map(
    (category: string, skills: string[]) => `${category}: ${skills.join(", ")}`
  )
  .join("\n")}

[SERVICES OFFERED]
${services.map((service) => `- ${service.title}: ${service.description}`).join("\n")}

=== END OF PORTFOLIO DATA ===
      `.trim();

      return context;
    } catch (error) {
      console.error("Error building portfolio context:", error);
      throw new ApiError(500, "Failed to build portfolio context");
    }
  }

  private generateSuggestedQuestions(userMessage: string): string[] {
    const suggestions = [
      "What projects has Irfan worked on?",
      "What is Irfan's work experience?",
      "What technologies does Irfan use?",
      "Tell me about Irfan's background",
      "What services does Irfan offer?",
      "How can I contact Irfan?",
    ];

    const keywords = userMessage.toLowerCase();

    if (keywords.includes("project")) {
      return [
        "What technologies were used in these projects?",
        "Can I see the live demos?",
        "Tell me more about a specific project",
      ];
    } else if (keywords.includes("experience") || keywords.includes("work")) {
      return [
        "What were the key achievements?",
        "What technologies did he use at work?",
        "Tell me about his current role",
      ];
    } else if (keywords.includes("skill") || keywords.includes("tech")) {
      return [
        "What frontend frameworks does he know?",
        "What about backend technologies?",
        "Does he have database experience?",
      ];
    }

    return suggestions.sort(() => 0.5 - Math.random()).slice(0, 3);
  }

  async chat(request: IChatRequest): Promise<IChatResponse> {
    try {
      let chatHistory = request.sessionId
        ? await ChatHistory.findOne({ sessionId: request.sessionId })
        : null;

      if (!chatHistory) {
        chatHistory = new ChatHistory({
          sessionId: uuidv4(),
          messages: [],
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        });
      }

      const portfolioContext = await this.buildPortfolioContext();

      const systemPrompt = `
You are a friendly and professional AI assistant for Irfan Muria's portfolio website.
Your role is to answer visitor questions about Irfan based ONLY on the portfolio data provided below.

RULES:
1. Only answer based on the provided portfolio data
2. Be concise, friendly, and professional
3. If asked about something not in the data, politely say you don't have that information
4. Reply in the same language as the visitor's message (support English and Indonesian)
5. When mentioning projects, include demo/GitHub links if available
6. If asked about contact, direct them to the contact form
7. Keep responses conversational and engaging
8. Don't make up information - stick to the facts

${portfolioContext}
      `.trim();

      const model = getGeminiModel();
      const chat = model.startChat({
        history: chatHistory.messages.map((msg) => ({
          role: msg.role === "assistant" ? "model" : "user",
          parts: [{ text: msg.content }],
        })),
      });

      if (chatHistory.messages.length === 0) {
        await chat.sendMessage(systemPrompt);
      }

      const result = await chat.sendMessage(request.message);
      const reply = result.response.text();

      chatHistory.messages.push(
        {
          role: "user",
          content: request.message,
          timestamp: new Date(),
        },
        {
          role: "assistant",
          content: reply,
          timestamp: new Date(),
        }
      );

      await chatHistory.save();

      const suggestedQuestions = this.generateSuggestedQuestions(
        request.message
      );

      return {
        reply,
        sessionId: chatHistory.sessionId,
        suggestedQuestions,
      };
    } catch (error: any) {
      console.error("Chat service error:", error);
      throw new ApiError(500, `Chat failed: ${error.message}`);
    }
  }

  async getChatHistory(sessionId: string) {
    const chatHistory = await ChatHistory.findOne({ sessionId });

    if (!chatHistory) {
      throw new ApiError(404, "Chat session not found");
    }

    return chatHistory;
  }

  async deleteChatHistory(sessionId: string): Promise<void> {
    const result = await ChatHistory.deleteOne({ sessionId });

    if (result.deletedCount === 0) {
      throw new ApiError(404, "Chat session not found");
    }
  }

  async cleanupExpiredChats(): Promise<number> {
    const result = await ChatHistory.deleteMany({
      expiresAt: { $lt: new Date() },
    });

    return result.deletedCount;
  }
}

export const chatService = new ChatService();
