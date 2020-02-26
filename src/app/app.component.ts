import { Component, HostListener } from '@angular/core';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-pwa';
  installPrompt;

  constructor(private swPush: SwPush) {
  }

  async registerForPush() {
    const subscription = await this.swPush.requestSubscription({
      serverPublicKey: 'BGNJMXl5LjwR876kpcFXOMp48QmLzISespvcjxByicYtr8EWnSjAHfeIQAA9TYt3YZsh6U9GkeSR8I5B0z2xUI0'
    });
    console.log(subscription);
  }

  @HostListener('window:beforeinstallprompt', ['$event'])
  onPrompt(event: Event) {
    this.installPrompt = event;
    return false;
  }

  installApp() {
    this.installPrompt.prompt();
  }

  share() {
    if ('share' in navigator) {
      (navigator as any).share({ text: 'Hallo BASTA!' });
    } else {
      // use fallback
    }
  }
}
