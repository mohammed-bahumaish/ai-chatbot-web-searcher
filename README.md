# AI Chatbot with Specialized Web Search Capabilities

AI chatbot that provides focused, targeted web search capabilities through specialized search tools allowing users to select specific search domains for more accurate and relevant results.

## Features

- **Specialized Exa Search Tools**: Search across 9 different categories:

  - Companies and organizations
  - Research papers and academic content
  - News articles and current events
  - PDF documents and reports
  - GitHub repositories and code
  - Tweets and social media content
  - Personal websites and blogs
  - LinkedIn profiles
  - Financial reports

- **Comprehensive Search Results Display**:

  - Collapsible sections for each search category
  - Properly formatted results with titles, dates, and authors
  - URL tooltips and external link indicators
  - Scrollable container with vertical line for better readability

- **Intelligent AI Research Assistant**:
  - AI system prompt optimized for research capabilities
  - Cross-category searching for complex topics
  - Synthesized results from multiple sources
  - Targeted tool selection based on query type

## Technical Implementation

The chatbot integrates with the Exa search API to perform specialized searches. The architecture includes:

- **Search Tool Selection**: Modern UI for selecting which search categories to use
- **Specialized Search Execution**: Individual search tools for each category
- **Result Processing**: Formatting and displaying search results in an attractive, readable format
- **AI Integration**: Enhanced system prompt that guides the AI to use the appropriate search tools

## How It Works

1. **Tool Selection**: Users select which search categories they want to use via the search icon in the chat input
2. **Query Processing**: When a user sends a message, the selected search tools are activated
3. **Multi-Category Search**: The AI performs searches across all selected categories
4. **Result Synthesis**: Search results are collected, formatted, and presented to the user
5. **AI Response**: The AI analyzes the search results and provides a comprehensive response

## Architecture

The project is built with:

- **Next.js**: For the frontend and API routes
- **Shadcn UI**: For modern UI components including Popover and Switch
- **Exa API**: For specialized web searches
- **AI SDK**: For AI model integration and streaming responses

## Getting Started

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Set up environment variables
4. Run the development server: `pnpm dev`
5. Open [http://localhost:3000](http://localhost:3000) in your browser
