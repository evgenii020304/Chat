import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Message } from '../../models/message.model';
import { DatePipe } from '@angular/common';
import { MaterialModule } from '../../modules/material.module';
import { UsernameModalComponent } from '../username-modal/username-modal.component';
import { Subscription } from 'rxjs';
import { ChatService } from '../../service/chat.service';
import { UserService } from '../../service/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-message',
  standalone: true,
  templateUrl: './chat.component.html',
  imports: [
    DatePipe, MaterialModule, UsernameModalComponent, FormsModule
  ],
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  username: string | null = null;
  messageText: string = '';
  messages: Message[] = [];
  private messagesSub!: Subscription;

  constructor(
    private userService: UserService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.username = this.userService.getUsername();
    this.messagesSub = this.chatService.messages$.subscribe(messages => {
      this.messages = messages;
    });
  }

  ngOnDestroy(): void {
    this.messagesSub.unsubscribe();
  }

  setUsername(username: string) {
    this.userService.setUsername(username);
    this.username = username;
  }

  sendMessage(): void {
    const text = this.messageText.trim();
    if (!this.username || !text) return;
    this.chatService.sendMessage({
      author: this.username,
      text: text,
      timestamp: new Date()
    });
    this.messageText = '';
    setTimeout(() => this.scrollToBottom(), 0);
  }

  private addSystemMessage(text: string): void {
    this.chatService.sendMessage({
      author: 'System',
      text: text,
      timestamp: new Date(),
      isSystem: true
    });
  }

  changeName(): void {
    if (this.username) {
      this.addSystemMessage(`${this.username} вышел из чата`);
    }
    this.userService.clearUsername();
    this.username = null;
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop =
        this.messagesContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }
}
