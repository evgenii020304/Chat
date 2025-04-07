import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Message } from '../models/message.model';
import { BroadcastService } from './broadcast.service';

@Injectable({ providedIn: 'root' })
export class ChatService implements OnDestroy {
  private messagesSubject = new BehaviorSubject<Message[]>([]);
  public messages$ = this.messagesSubject.asObservable();

  constructor(private broadcastService: BroadcastService) {
    this.loadMessages();
    this.setupBroadcastListener();
  }

  sendMessage(message: Omit<Message, 'id'>): void {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: message.timestamp || new Date()
    };

    this.addMessage(newMessage);
    this.broadcastService.broadcastMessage({
      type: 'NEW_MESSAGE',
      payload: newMessage
    });
    this.saveMessages();
  }

  private setupBroadcastListener(): void {
    this.broadcastService.listenForMessages((message) => {
      if (message.type === 'NEW_MESSAGE' && message.payload) {
        this.addMessage(message.payload as Message);
        this.saveMessages();
      }
    });
  }

  private addMessage(message: Message): void {
    const currentMessages = this.messagesSubject.value;
    if (!currentMessages.some(m => m.id === message.id)) {
      this.messagesSubject.next([...currentMessages, message]);
    }
  }

  private loadMessages(): void {
    const saved = localStorage.getItem('chat_messages');
    if (saved) {
      const messages = JSON.parse(saved);
      this.messagesSubject.next(messages);
    }
  }

  private saveMessages(): void {
    localStorage.setItem('chat_messages', JSON.stringify(this.messagesSubject.value));
  }

  ngOnDestroy(): void {
    this.broadcastService.ngOnDestroy();
  }
}
