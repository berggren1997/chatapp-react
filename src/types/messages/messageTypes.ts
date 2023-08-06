export type MessageResponse = {
  message: string;
  sender: string;
  sentAt: Date;
};

export type MessageRequest = {
  conversationId: string;
  message: string;
};
