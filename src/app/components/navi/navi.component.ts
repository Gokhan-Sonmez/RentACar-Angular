import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from 'src/app/models/login';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  userName:"";
  loginUser:LoginModel;
  loginForm:FormGroup;
  authenticated:boolean;
  constructor(private formBuilder:FormBuilder,private authService:AuthService,
    private toastrService:ToastrService,
    private router:Router) { }

    ngOnInit(): void {
      this.createLoginForm();
      this.isAuthenticated();
    }
    createLoginForm(){
      this.loginForm = this.formBuilder.group({
        email:["",Validators.required],
        password:["",Validators.required]
      })
  
    }

    login(){
      if(this.loginForm.valid){
        console.log(this.loginForm.value)
        let loginModel = Object.assign({},this.loginForm.value)
  
        this.authService.login(loginModel).subscribe(response=>{
          this.toastrService.info(response.messages)
          localStorage.setItem("token",response.data.token)
          this.currentUserName();
          this.isAuthenticated();
        },responseError=>{
          console.log(responseError)
          this.toastrService.error(responseError.error.messages)
        }
        )
      }
    }

    logOut(){
      return this.authService.logOut();
    }

  isAuthenticated(){
    this.authenticated= this.authService.isAuthenticated();
  }
  currentUserName(){
    this.userName = this.authService.getCurrentUserName()
   
  }
}
