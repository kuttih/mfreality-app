import { Component, OnInit, Input } from '@angular/core';
import { faCoffee,faQuestion,faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import {AuthService} from 'src/app/services/auth/auth.service';
import {TokenStorageService} from '../../../services/auth/token-storage.service'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  faCoffee = faCoffee;
  faQuestion=faQuestion;
  faQuestionCircle=faQuestionCircle;
  username="";
  password="";
  loading = false;
  invalidLogin= false;
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private router:Router,
     private authservice:AuthService,
     private tokenStorage:TokenStorageService
     ) { }

  
  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  getClass() {
    return "active"
  }


  onRegister() {
    console.log("Onregistercalled!")
    this.authservice.register(this.form).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

   signIn() {
    // $("#exampleModal1").hide();
    // $("#exampleModal").show();
    //Basic authentication
    //Spinner or Login progress
    console.log("Sign in Called")
    
    this.loading = true;
 
    this.authservice.executeJWTAuthenticationService(this.username, this.password)
    .subscribe(
      data => {
        console.log(data);
        document.getElementById("closeModal").click();
        this.router.navigate(['addscene'])
        this.invalidLogin = false      
      },
      error => {
        console.log(error)
        this.invalidLogin = true
      }
    )
  

    
  }

  onSubmit() {

    this.loading = true;
    console.log('loading is true')
    this.authservice.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.loading = false;
        document.getElementById("closeModal").click();
        this.router.navigate(['addscene']);
        // console.log("To Addscene")
        // this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.loading = false;
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }
}
