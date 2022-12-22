import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../styles.css'],
})
export class AppComponent {
  showNav = false;

  constructor(private router: Router) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        this.showNav = event.url !== '/demo' && event.url !== '/quiz';
      }
    });
  }
}
