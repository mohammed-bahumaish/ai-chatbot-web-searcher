"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Search,
  LinkIcon,
} from "lucide-react";
import { Markdown } from "./markdown";

interface SearchResult {
  title: string;
  url: string;
  publishedDate?: string;
  author?: string;
  highlights?: string[];
  text?: string;
}

export interface SearchResultsProps {
  toolName: string;
  results: SearchResult[];
  category: string;
}

export function SearchResults({
  toolName,
  results,
  category,
}: SearchResultsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Get category name for display
  const getCategoryName = (category: string) => {
    const categoryLabels: Record<string, string> = {
      company: "Companies",
      "research paper": "Research Papers",
      news: "News Articles",
      pdf: "PDF Documents",
      github: "GitHub Repositories",
      tweet: "Tweets",
      "personal site": "Personal Sites",
      "linkedin profile": "LinkedIn Profiles",
      "financial report": "Financial Reports",
      "url scrape": "URL Content",
    };

    return categoryLabels[category] || category;
  };

  const displayName = getCategoryName(category);

  // Determine icon based on category
  const getCategoryIcon = () => {
    if (category === "url scrape") {
      return <LinkIcon className="h-4 w-4 text-green-500" />;
    }
    return <Search className="h-4 w-4 text-blue-500" />;
  };

  if (!results || results.length === 0) {
    return null;
  }

  return (
    <div className="my-0 space-y-3 rounded-md border p-4">
      {/* Header with logo and expand/collapse button */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2"
          aria-expanded={isExpanded}
          aria-label={
            isExpanded ? "Collapse search results" : "Expand search results"
          }
        >
          {isExpanded ? (
            <ChevronUp className="text-muted-foreground h-4 w-4" />
          ) : (
            <ChevronDown className="text-muted-foreground h-4 w-4" />
          )}
          {getCategoryIcon()}
          <div className="flex items-center">
            <span className="text-sm font-medium">
              {displayName} Search Results
            </span>
          </div>
        </button>
      </div>

      {/* Results with vertical line */}
      {isExpanded && (
        <div className="pl-4 relative max-h-[350px] overflow-y-auto pr-2 pb-1">
          {/* Vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-muted-foreground/20"></div>

          {/* Content */}
          <div className="space-y-4">
            {results.map((result, idx) => (
              <div key={idx} className="text-sm group relative">
                {/* Result header with title and link */}
                <div className="flex items-start">
                  <div className="min-w-[20px] text-muted-foreground mr-1">
                    [{idx + 1}]
                  </div>
                  <div className="flex-1 break-words">
                    <a
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium hover:text-blue-600 flex items-center gap-1 group-hover:underline break-all"
                    >
                      {result.title || "Untitled"}
                      <ExternalLink className="h-3 w-3 flex-shrink-0 opacity-70" />
                    </a>

                    {/* Meta information */}
                    {(result.author || result.publishedDate) && (
                      <div className="text-xs text-muted-foreground mt-1">
                        {result.author && <span>By {result.author}</span>}
                        {result.author && result.publishedDate && (
                          <span> • </span>
                        )}
                        {result.publishedDate && (
                          <span>{result.publishedDate}</span>
                        )}
                      </div>
                    )}

                    {/* URL preview on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute left-0 -bottom-6 bg-popover text-popover-foreground text-xs py-1 px-2 rounded whitespace-nowrap z-10 pointer-events-none border overflow-hidden text-ellipsis max-w-[300px]">
                      {result.url}
                    </div>
                  </div>
                </div>

                {/* Highlights/Excerpt */}
                {((result.highlights && result.highlights.length > 0) ||
                  result.text) && (
                  <div className="mt-2 ml-7 text-sm text-muted-foreground">
                    {category === "url scrape" && result.text ? (
                      <div className="markdown-content">
                        <Markdown>{result.text}</Markdown>
                      </div>
                    ) : result.highlights && result.highlights.length > 0 ? (
                      <div>
                        {result.highlights.map((highlight, i) => (
                          <p key={i} className="mb-1 break-words">
                            <span className="text-foreground">...</span>{" "}
                            {highlight}{" "}
                            <span className="text-foreground">...</span>
                          </p>
                        ))}
                      </div>
                    ) : result.text ? (
                      <p className="break-words">
                        <span className="text-foreground">...</span>{" "}
                        {result.text.substring(0, 200)}...{" "}
                        <span className="text-foreground">...</span>
                      </p>
                    ) : null}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Scroll fade indicator */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
        </div>
      )}
    </div>
  );
}

// Simple icon component if needed
export function ExternalLinkIcon({ size = 24, className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
      <polyline points="15 3 21 3 21 9"></polyline>
      <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
  );
}
