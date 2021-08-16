import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLogged: boolean = false;

  constructor(private router: Router, private authService: AuthService) {
    authService.auth.user.subscribe(user => {
      this.isLogged = user ? true : false;
    });
  }

  ngOnInit(): void {
  }

  onLoginClick() {
    this.authService.login();
  }

  onLogout() {
    this.authService.logout()
      .then(() => {
        this.router.navigate(["/"]);
      });
  }
}
