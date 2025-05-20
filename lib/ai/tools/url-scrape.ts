import { tool } from "ai";
import { z } from "zod";
import FireCrawlApp from "@mendable/firecrawl-js";

type ScrapeResult = {
  markdown?: string;
  text?: string;
  title?: string;
  url?: string;
};

// URL scrape tool
export const scrapeUrl = tool({
  description: "Scrape and extract content from a URL",
  parameters: z.object({
    url: z.string().url().describe("The URL to scrape"),
  }),
  execute: async ({ url }) => {
    // Initialize the FireCrawl client with the provided API key
    const app = new FireCrawlApp({ apiKey: process.env.FIRE_CRAWL_KEY });

    console.log("Scraping URL:", url);

    try {
      // Use FireCrawl to scrape the URL
      const scrapeResult = (await app.scrapeUrl(url, {
        formats: ["markdown"],
        onlyMainContent: true,
      })) as ScrapeResult;

      return {
        content: scrapeResult.markdown || scrapeResult.text || "",
        title: scrapeResult.title || "",
        url: scrapeResult.url || url,
      };
    } catch (error) {
      console.error("Error scraping URL:", error);
      return {
        error: "Failed to scrape URL",
        message: error instanceof Error ? error.message : String(error),
      };
    }
  },
});
