import { Injectable } from '@angular/core';
import { BroadcastMessage } from '../models/message.model';

@Injectable({ providedIn: 'root' })
export class BroadcastService {
  private channel: BroadcastChannel;

  constructor() {
    this.channel = new BroadcastChannel('chat_channel');
  }

  broadcastMessage(message: BroadcastMessage): void {
    this.channel.postMessage(message);
  }

  listenForMessages(callback: (message: BroadcastMessage) => void): void {
    this.channel.addEventListener('message', (event) => {
      callback(event.data);
    });
  }

  ngOnDestroy(): void {
    this.channel.close();
  }
}
