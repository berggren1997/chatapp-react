export type MessageResponse = {
  message: string;
  sender: string;
  sentAt: Date;
  conversationId: string;
};

export type MessageRequest = {
  conversationId: string;
  message: string;
};
