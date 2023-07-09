export type MessageResponse = {
  message: string;
  sender: string;
  sentAt: string;
};

export type MessageRequest = {
  conversationId: string;
  message: string;
};
