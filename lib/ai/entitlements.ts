import type { UserType } from '@/app/(auth)/auth';
import { DEFAULT_CHAT_MODEL } from './models';

interface Entitlements {
  maxMessagesPerDay: number;
  chatModelId: string;
}

export const entitlementsByUserType: Record<UserType, Entitlements> = {
  /*
   * For users without an account
   */
  guest: {
    maxMessagesPerDay: 20,
    chatModelId: DEFAULT_CHAT_MODEL,
  },

  /*
   * For users with an account
   */
  regular: {
    maxMessagesPerDay: 100,
    chatModelId: DEFAULT_CHAT_MODEL,
  },

  /*
   * TODO: For users with an account and a paid membership
   */
};
