import { Component, OnInit } from '@angular/core';
import { faCoffee,faQuestion,faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-lheader',
  templateUrl: './lheader.component.html',
  styleUrls: ['./lheader.component.css']
})
export class LheaderComponent implements OnInit {
  faCoffee = faCoffee;
  faQuestion=faQuestion;
  faQuestionCircle=faQuestionCircle;
  constructor(private authservice:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.authservice.logout();
    this.router.navigate(["/"]);
    
  }

}
