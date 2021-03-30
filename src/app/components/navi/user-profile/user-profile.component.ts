import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userName:"";
  constructor(private authService:AuthService,
    private toastrService:ToastrService,
    private router:Router) { }

  ngOnInit(): void {
    this.currentUserName();
  }
  currentUserName(){
    this.userName = this.authService.getCurrentUserName()
   
  }

  logOut(){
    return this.authService.logOut();
  }
}
