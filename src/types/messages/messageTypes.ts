export type MessageResponse = {
  message: string;
  sender: string;
  sentAt: Date;
  conversationId: string;
  error?: any;
};

export type MessageRequest = {
  conversationId: string;
  message: string;
};
