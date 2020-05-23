import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Product Admin';

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  logout() {
    if (this.userService.logout()) {
      this.router.navigate(['/login']);
    } else {
      console.log('Logout fail');
    }
  }

  isLogin(): boolean {
    return this.userService.isLogin();
  }
}
