import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
import { isTestEnvironment } from '../constants';
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';

// Create OpenRouter provider
const openRouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        'chat-model': chatModel,
        'chat-model-reasoning': reasoningModel,
        'title-model': titleModel,
        'artifact-model': artifactModel,
      },
    })
  : customProvider({
      languageModels: {
        'chat-model': openRouter('anthropic/claude-3.5-sonnet'),
        'chat-model-reasoning': wrapLanguageModel({
          model: openRouter('anthropic/claude-3.5-sonnet'),
          middleware: extractReasoningMiddleware({ tagName: 'think' }),
        }),
        'title-model': openRouter('anthropic/claude-3.5-sonnet'),
        'artifact-model': openRouter('anthropic/claude-3.5-sonnet'),
      },
    });
