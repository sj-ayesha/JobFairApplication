import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoginLogoutService } from 'src/app/services/login-logout.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formLogin: FormGroup;
  loggedIn: boolean;
  submitted = false;

  // tslint:disable-next-line: variable-name
  error_messages = {
    username: [
      { type: 'required', message: '⚠ Username is required.' },
      { type: 'minlength', message: '⚠ Username must be of 3 characters.' },
      { type: 'maxlength', message: '⚠ Username must be of 3 characters.' }
      // { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
      // { type: 'validUsername', message: 'Your username has already been taken.' }
    ],
    password: [
      { type: 'required', message: '⚠ Password is required.' },
    ]
  };
  constructor(
    private formBuilder: FormBuilder,
    private loginLogoutService: LoginLogoutService,
    private router: Router,
    private toastCtrl: ToastController,
    private authService: AuthService
  ) {
    this.formLogin = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        Validators.maxLength(3),
        Validators.minLength(3),
        // Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        Validators.required
      ])),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.authService.isLoggedIn().subscribe(data => {
      if (data) {
        this.router.navigateByUrl('/venue');
      }
    });
    // this.loggedIn = this.loginLogoutService.isLoggedIn;
  }

  async unsuccessMsg() {
    const toast = await this.toastCtrl.create({
      message: 'Invalid Username or Password',
      position: 'top',
      color: 'danger',
      duration: 2000,
      cssClass: 'toast-custom'
    });
    toast.present();

  }

  LogInEnter() {
    this.submitted = true;
    // tslint:disable-next-line: max-line-length
    if (this.formLogin.invalid) {
      console.log(this.submitted, 'not sucessful');
      this.unsuccessMsg();
    } else {
      this.loggedIn = true;
      localStorage.setItem('user', 'userId');
      this.loginLogoutService.loginUser();
      // console.log(this.loggedIn);
    }
  }
}
