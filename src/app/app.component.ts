import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../styles.css'],
})
export class AppComponent implements OnInit {
  showNav = false;
  isChristmas = false;

  constructor(private router: Router) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        this.showNav = event.url !== '/demo' && event.url !== '/quiz';
      }
    });
  }

  ngOnInit() {
    if (new Date().getMonth() === 0 || new Date().getMonth() === 11) {
      this.isChristmas = true;
      document.body.style.backgroundImage = "url('assets/images/ep3.jpg')";
    } else {
      this.isChristmas = false;
      document.body.style.backgroundImage = "url('assets/images/ep4.png')";
    }
  }
}
