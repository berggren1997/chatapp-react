import { MessageResponse } from "../messages/messageTypes";

export type ConversationResponse = {
  id: string;
  createdAt: Date;
  conversationDetails: ConversationDetails;
  lastMessageDetails: MessageResponse;
};

export type CreateConversationRequest = {
  recipient: string;
};

export type CreateConversationResponse = {
  conversationId: string;
};

type ConversationDetails = {
  creator: string;
  creatorId?: string;
  recipient: string;
  recipientId?: string;
};
