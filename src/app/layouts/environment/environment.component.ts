import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-environment',
  templateUrl: './environment.component.html',
  styleUrls: ['./environment.component.css']
})
export class EnvironmentComponent implements OnInit {
  //Check if the user is logged again to redirect to the addscene
  constructor(private router:Router) { }

  ngOnInit(): void {
 
  }

}
