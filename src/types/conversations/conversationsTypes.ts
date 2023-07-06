export type ConversationResponse = {
  id: string;
  createdAt: string;
  conversationDetails: ConversationDetails;
};

type ConversationDetails = {
  creator: string;
  recipient: string;
};
