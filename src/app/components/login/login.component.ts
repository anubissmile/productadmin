import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userModel: User = new User();

  public alert = {
    success: {
      status: false,
      msg: ''
    },
    danger: {
      status: false,
      msg: ''
    },
    warning: {
      status: false,
      msg: ''
    }
  };

  constructor(
    public router: Router,
    public activateRoute: ActivatedRoute,
    public http: HttpClient,
    public userService: UserService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.userService.auth(this.userModel)
      .subscribe(
        data => {
          this.alert.success = {
            status: true,
            msg: 'Authenticate successfully, Please wait.'
          };
          setTimeout(() => {
            this.router.navigate(['/product']);
          }, 5000);
        },
        err => {
          console.log('Auth error', err);
          this.alert.danger = {
            status: true,
            msg: `${err.error.message}, Please try again.`
          };
          this.resetForm();
        }
      );
  }

  resetForm() {
    this.userModel = new User();
  }

}
