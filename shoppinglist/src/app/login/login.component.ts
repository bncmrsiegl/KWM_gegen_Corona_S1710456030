import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthenticationService } from "../shared/authentication.service";

interface Response {
    response: string;
    result: {
      token: string;
    };
}

@Component({
  selector: 'sl-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,
              private authServise: AuthenticationService) { }

  ngOnInit() {
      this.loginForm = this.fb.group({
          username: ['', [Validators.required, Validators.email]],
          password: ['', Validators.required],
      });
  }

  login() {
      const val = this.loginForm.value;
      if(val.username && val.password) {
          this.authServise.login(val.username, val.password).subscribe(res => {
              const resObj = res as Response;
              if(resObj.response === "success") {
                  this.authServise.setLocalStorage(resObj.result.token);
                  this.router.navigateByUrl('/');
              }
          });
      }
  }

  isLoggedIn() {
    return this.authServise.isLoggedIn();
  }

  logout(){
    this.authServise.logout();
  }

}
