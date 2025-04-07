export interface Message {
  id: string;
  author: string;
  text: string;
  timestamp: Date;
  isSystem?: boolean;
}

export interface BroadcastMessage {
  type: string;
  payload?: Message | string;
}
