import { tool } from "ai";
import { z } from "zod";
import Exa from "exa-js";

// Initialize Exa client
const exa = new Exa(process.env.EXA_API_KEY || "");

// Categories supported by Exa
export type ExaCategory =
  | "company"
  | "research paper"
  | "news"
  | "pdf"
  | "github"
  | "tweet"
  | "personal site"
  | "linkedin profile"
  | "financial report";

// Base search function for all Exa tools
const executeExaSearch = async (query: string, category: ExaCategory) => {
  console.log(`Searching Exa for: "${query}" in category "${category}"`);

  try {
    const results = await exa.searchAndContents(query, {
      text: true,
      highlights: true,
      numResults: 10,
      category,
    });

    // Format the results for display
    return {
      results: results.results.map((result) => ({
        title: result.title,
        url: result.url,
        publishedDate: result.publishedDate,
        author: result.author || "Unknown",
        highlights: result.highlights || [],
        text: result.text
          ? result.text.length > 500
            ? result.text.substring(0, 500) + "..."
            : result.text
          : "No text available",
      })),
    };
  } catch (error) {
    console.error("Error searching Exa:", error);
    return {
      error: "Failed to search Exa",
      message: error instanceof Error ? error.message : String(error),
    };
  }
};

// Company search tool
export const searchCompany = tool({
  description:
    "Search for company information including profiles, news, and financial data",
  parameters: z.object({
    query: z
      .string()
      .describe("The company name or related information to search for"),
  }),
  execute: async ({ query }) => {
    console.log("Searching company for:", query);
    return executeExaSearch(query, "company");
  },
});

// Research paper search tool
export const searchResearchPaper = tool({
  description:
    "Search for academic papers, research publications, and scientific studies",
  parameters: z.object({
    query: z
      .string()
      .describe(
        "The research topic, author name, or paper title to search for"
      ),
  }),
  execute: async ({ query }) => {
    console.log("Searching research paper for:", query);
    return executeExaSearch(query, "research paper");
  },
});

// News search tool
export const searchNews = tool({
  description:
    "Search for recent news articles, press releases, and current events",
  parameters: z.object({
    query: z
      .string()
      .describe("The news topic, event, or keyword to search for"),
  }),
  execute: async ({ query }) => {
    console.log("Searching news for:", query);
    return executeExaSearch(query, "news");
  },
});

// PDF search tool
export const searchPDF = tool({
  description:
    "Search for PDF documents including reports, white papers, and documentation",
  parameters: z.object({
    query: z
      .string()
      .describe("The PDF document content or title to search for"),
  }),
  execute: async ({ query }) => {
    console.log("Searching PDF for:", query);
    return executeExaSearch(query, "pdf");
  },
});

// GitHub search tool
export const searchGitHub = tool({
  description:
    "Search for GitHub repositories, code, documentation, and issues",
  parameters: z.object({
    query: z
      .string()
      .describe("The repository, code, or GitHub content to search for"),
  }),
  execute: async ({ query }) => {
    console.log("Searching GitHub for:", query);
    return executeExaSearch(query, "github");
  },
});

// Tweet search tool
export const searchTweet = tool({
  description:
    "Search for tweets and Twitter content from individuals and organizations",
  parameters: z.object({
    query: z
      .string()
      .describe("The tweet content, hashtag, or Twitter user to search for"),
  }),
  execute: async ({ query }) => {
    console.log("Searching tweet for:", query);
    return executeExaSearch(query, "tweet");
  },
});

// Personal site search tool
export const searchPersonalSite = tool({
  description:
    "Search for personal websites, blogs, and individual online presences",
  parameters: z.object({
    query: z
      .string()
      .describe("The person name or personal website content to search for"),
  }),
  execute: async ({ query }) => {
    console.log("Searching personal site for:", query);
    return executeExaSearch(query, "personal site");
  },
});

// LinkedIn profile search tool
export const searchLinkedInProfile = tool({
  description:
    "Search for LinkedIn profiles of professionals and organizations",
  parameters: z.object({
    query: z
      .string()
      .describe(
        "The person name, company, or professional detail to search for LinkedIn profiles"
      ),
  }),
  execute: async ({ query }) => {
    console.log("Searching LinkedIn profile for:", query);
    return executeExaSearch(query, "linkedin profile");
  },
});

// Financial report search tool
export const searchFinancialReport = tool({
  description:
    "Search for financial reports, earnings statements, and economic data",
  parameters: z.object({
    query: z
      .string()
      .describe(
        "The company name, financial metric, or report type to search for"
      ),
  }),
  execute: async ({ query }) => {
    console.log("Searching financial report for:", query);
    return executeExaSearch(query, "financial report");
  },
});

// Export all search tools
export const exaSearchTools = {
  searchCompany,
  searchResearchPaper,
  searchNews,
  searchPDF,
  searchGitHub,
  searchTweet,
  searchPersonalSite,
  searchLinkedInProfile,
  searchFinancialReport,
};
