export type ConversationResponse = {
  id: string;
  createdAt: string;
  conversationDetails: ConversationDetails;
};

export type CreateConversationRequest = {
  recipient: string;
};

export type CreateConversationResponse = {
  conversationId: string;
};

type ConversationDetails = {
  creator: string;
  recipient: string;
};
