import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoginLogoutService } from 'src/app/services/login-logout.service';
import { Router } from '@angular/router';
import { ToastController, NavController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formLogin: FormGroup;
  loggedIn: boolean;
  submitted = false;

  errorMessages = {
    username: [
      { type: 'required', message: '⚠ Username is required.' },
      { type: 'minlength', message: '⚠ Username must be of 3 characters.' },
      { type: 'maxlength', message: '⚠ Username must be of 3 characters.' }
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
    private authService: AuthService,
    private apiService: ApiService,
    public navCtrl: NavController,
    public alertCtrl: AlertController
  ) {
    this.formLogin = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        Validators.maxLength(3),
        Validators.minLength(3),
        Validators.required
      ])),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    // this.authService.isLoggedIn().subscribe(data => {
    //   if (data) {
    //     this.router.navigateByUrl('/dashboard');
    //   }
    // });
    // this.loggedIn = this.loginLogoutService.isLoggedIn;
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.ngOnInit();

    setTimeout(() => {
      event.target.complete();
    }, 2000);
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
    if (this.formLogin.invalid) {
      this.unsuccessMsg();
    } else {
      this.loggedIn = true;
      const loginUser = {
        visa: this.formLogin.get('username').value,
        password: this.formLogin.get('password').value
      };

      this.apiService.authenticateUser(loginUser).subscribe(data => {{
          console.log('data', data);
          localStorage.setItem('token', data.result.token);
          localStorage.setItem('visa', loginUser.visa);
          localStorage.setItem('role', data.result.roleDto.name);
          setTimeout(() => {
            this.loginLogoutService.loginUser();
            // this.authService.login();
          }, 10);
          if (localStorage.getItem('role') === 'INTERVIEWER'){
            this.router.navigateByUrl('/candidate-list');
          } else {
            this.router.navigateByUrl('/dashboard');
          }

        }
      }, error => {
          this.unsuccessMsg();
          this.formLogin.reset();
        }
      );
    }
  }

}
