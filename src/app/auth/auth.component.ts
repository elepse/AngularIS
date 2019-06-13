import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private location: Location) {
    authService.checkAuth();
  }

  logIn(login: string, password: string): void {
    this.authService.logIn(login, password).subscribe(data => {
      if (data.status) {
        this.authService.saveLogin(data);
        this.router.navigateByUrl('/requests');
      } else {
        alert('неверный пароль');
      }
    });
  }

  ngOnInit() {
  }

}
