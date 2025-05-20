"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SearchIcon, LinkIcon } from "lucide-react";
import type { ExaCategory } from "@/lib/ai/tools/exa-search";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import type { ToolType } from "@/app/(chat)/api/chat/schema";

export interface ToolSelectorProps {
  selectedTools: ToolType[];
  onToolsChange: (tools: ToolType[]) => void;
  className?: string;
}

export function ToolSelector({
  selectedTools,
  onToolsChange,
  className,
}: ToolSelectorProps) {
  // Local state to ensure UI consistency
  const [internalSelectedTools, setInternalSelectedTools] =
    useState<ToolType[]>(selectedTools);

  // Sync internal state with props
  useEffect(() => {
    setInternalSelectedTools(selectedTools);
  }, [selectedTools]);

  // Handler for Exa search tools
  const handleExaToolChange = (category: ExaCategory, checked: boolean) => {
    const exaTool = { type: "searchExa" as const, category };
    let updatedTools: ToolType[];

    if (checked) {
      // Add the tool if it's not already selected
      if (!isExaCategorySelected(category)) {
        updatedTools = [...internalSelectedTools, exaTool];
      } else {
        return; // No change needed
      }
    } else {
      // Remove the tool if it's selected
      updatedTools = internalSelectedTools.filter(
        (t) => t.type !== "searchExa" || t.category !== category
      );
    }

    // Update internal state
    setInternalSelectedTools(updatedTools);
    // Propagate to parent
    onToolsChange(updatedTools);
  };

  // Handler for URL scrape tool
  const handleUrlScrapeChange = (checked: boolean) => {
    const urlScrapeTool = { type: "scrapeUrl" as const };
    let updatedTools: ToolType[];

    if (checked) {
      // Add the tool if it's not already selected
      if (!isUrlScrapeSelected()) {
        updatedTools = [...internalSelectedTools, urlScrapeTool];
      } else {
        return; // No change needed
      }
    } else {
      // Remove the tool if it's selected
      updatedTools = internalSelectedTools.filter(
        (t) => t.type !== "scrapeUrl"
      );
    }

    // Update internal state
    setInternalSelectedTools(updatedTools);
    // Propagate to parent
    onToolsChange(updatedTools);
  };

  // Check if a specific Exa category is selected
  const isExaCategorySelected = (category: ExaCategory) => {
    return internalSelectedTools.some(
      (tool) => tool.type === "searchExa" && tool.category === category
    );
  };

  // Check if URL scrape is selected
  const isUrlScrapeSelected = () => {
    return internalSelectedTools.some((tool) => tool.type === "scrapeUrl");
  };

  // Count how many tools are selected
  const selectedCount = internalSelectedTools.length;

  // Group categories for better organization
  const categoryItems = [
    {
      id: "company",
      category: "company" as ExaCategory,
      title: "Companies",
      description: "Information about companies and organizations",
      icon: (
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 21H21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5 21V7L13 3V21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19 21V12L13 8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 21V17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 13V13.01"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17 21V17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: "research-paper",
      category: "research paper" as ExaCategory,
      title: "Research Papers",
      description: "Academic and scientific publications",
      icon: (
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 19.5V4.5C4 3.7 4.7 3 5.5 3H18.5C19.3 3 20 3.7 20 4.5V19.5C20 20.3 19.3 21 18.5 21H5.5C4.7 21 4 20.3 4 19.5Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 7H16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 11H16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 15H12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: "news",
      category: "news" as ExaCategory,
      title: "News",
      description: "Latest news articles and current events",
      icon: (
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 8H17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 12H17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 16H17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7 8H7.01"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7 12H7.01"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7 16H7.01"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: "pdf",
      category: "pdf" as ExaCategory,
      title: "PDF Documents",
      description: "Reports, whitepapers and other PDF documents",
      icon: (
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 2V8H20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 15H15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 11H15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: "github",
      category: "github" as ExaCategory,
      title: "GitHub",
      description: "Source code, repositories, and development resources",
      icon: (
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 19C4.5 20.5 4.5 16.5 3 16M15 21V17.5C15 16.5 15.1 16.1 14.5 15.5C17.3 15.2 20 14 20 9.50001C19.9988 8.30498 19.5325 7.15732 18.7 6.30001C19.0905 5.26198 19.0545 4.11164 18.6 3.10001C18.6 3.10001 17.5 2.80001 15.1 4.40001C13.08 3.85589 10.92 3.85589 8.9 4.40001C6.5 2.80001 5.4 3.10001 5.4 3.10001C4.94548 4.11164 4.90953 5.26198 5.3 6.30001C4.46745 7.15732 4.00122 8.30498 4 9.50001C4 14 6.7 15.2 9.5 15.5C8.9 16.1 8.9 16.7 9 17.5V21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: "tweet",
      category: "tweet" as ExaCategory,
      title: "Twitter/X",
      description: "Content from Twitter/X social network",
      icon: (
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22 4.00002C22 4.00002 21.3 6.10002 20 7.40002C21.6 17.4 10.6 24.4 2 19C4.2 19.1 6.4 18.4 8 17C3 15.5 0.5 9.60002 3 5.00002C5.2 7.60002 8.6 9.10002 12 9.00002C11.1 4.80002 16 2.40002 19 5.20002C20.1 5.20002 22 4.00002 22 4.00002Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: "personal-site",
      category: "personal site" as ExaCategory,
      title: "Personal Sites",
      description: "Blogs, personal websites and individual content",
      icon: (
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 9H21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 21V9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: "linkedin-profile",
      category: "linkedin profile" as ExaCategory,
      title: "LinkedIn",
      description: "Professional profiles and career information",
      icon: (
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 9H2V21H6V9Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: "financial-report",
      category: "financial report" as ExaCategory,
      title: "Financial Reports",
      description: "Earnings reports and financial documents",
      icon: (
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2V6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 18V22"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4.93 4.93L7.76 7.76"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.24 16.24L19.07 19.07"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 12H6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18 12H22"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4.93 19.07L7.76 16.24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.24 7.76L19.07 4.93"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  // Add URL scrape as a special item
  const specialItems = [
    {
      id: "url-scrape",
      title: "URL Scraper",
      description: "Extract content from any URL shared in the conversation",
      icon: <LinkIcon className="h-4 w-4" />,
      isSelected: isUrlScrapeSelected,
      onChange: handleUrlScrapeChange,
    },
  ];

  return (
    <div className={className}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full relative"
            type="button"
          >
            <SearchIcon size={16} className="text-muted-foreground" />
            {selectedCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {selectedCount}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-80 p-0 max-h-[350px] overflow-y-auto"
          align="end"
        >
          <div className="p-4 space-y-4">
            <h3 className="text-sm font-medium mb-2">Select search sources</h3>

            {categoryItems.map((item) => (
              <div
                key={item.id}
                className="space-y-1 border-b pb-3 last:border-b-0 last:pb-0"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-500">{item.icon}</span>
                    <Label
                      htmlFor={`switch-${item.category}`}
                      className="font-medium text-sm cursor-pointer"
                    >
                      {item.title}
                    </Label>
                  </div>
                  <Switch
                    id={`switch-${item.category}`}
                    checked={isExaCategorySelected(item.category)}
                    onCheckedChange={(checked: boolean) =>
                      handleExaToolChange(item.category, checked)
                    }
                  />
                </div>
                <p className="text-xs text-muted-foreground ml-6">
                  {item.description}
                </p>
              </div>
            ))}

            {/* Special Items Section with a divider */}
            <div className="border-t pt-3 mt-3">
              <h3 className="text-sm font-medium mb-2">Advanced Tools</h3>

              {specialItems.map((item) => (
                <div
                  key={item.id}
                  className="space-y-1 border-b pb-3 last:border-b-0 last:pb-0"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">{item.icon}</span>
                      <Label
                        htmlFor={`switch-${item.id}`}
                        className="font-medium text-sm cursor-pointer"
                      >
                        {item.title}
                      </Label>
                    </div>
                    <Switch
                      id={`switch-${item.id}`}
                      checked={item.isSelected()}
                      onCheckedChange={item.onChange}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground ml-6">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
