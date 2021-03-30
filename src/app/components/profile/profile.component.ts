import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserUpdate } from 'src/app/models/userUpdate';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private localStorageService: LocalStorageService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private authService: AuthService,
    private userService:UserService) { }
  userId:number
  users:UserUpdate[]=[];
  user:UserUpdate[]=[];

  firstName="";
  lastName="";
  email="";


  userUpdateForm: FormGroup;
  ngOnInit(): void {
    this.createUserUpdateForm();
    this.currentUserId();
    this.getUser();
    setTimeout(function(){
      
    },200)
    this.setValueForm()

  }
 createUserUpdateForm(){
  this.userUpdateForm = this.formBuilder.group({
    userId:this.userId,
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required]],
    password: ['', [Validators.required,]],
    confirmPassword: ['', [Validators.required,]]
 },{
   validator:this.passwordMatchValidator
 }
 );
 }
 passwordMatchValidator(g:FormGroup){
   return g.get('password')?.value=== g.get('confirmPassword')?.value?null:{misMatch:true}
 }

  update(){
    console.log(this.userUpdateForm.value)
    if (this.userUpdateForm.valid) {
      delete this.userUpdateForm.value['confirmPassword'];
      let updateModel = Object.assign({}, this.userUpdateForm.value);
      updateModel.userId = parseInt(updateModel.userId)
      this.authService.update(updateModel).subscribe(
        (response) => {
          this.toastrService.info(response.messages);
        },
        (responseError) => {
          console.log(responseError);
          this.toastrService.error(responseError.error.messages);
        }
      );
    }

  }
  currentUserId(){
    this.userId = this.authService.getCurrentUserId()
    console.log("current user "+this.userId)
  }

  getUser(){
    this.userService.getUser(this.userId).subscribe((response)=>{
      this.users = response.data;
      console.log(response.data);
      this.setUser();
    })
  }
 
  setUser(){
    this.users.forEach(element => {
      this.firstName =element.firstName 
     console.log(this.firstName)
     this.lastName  =element.lastName
     console.log(this.lastName)
     this.email  =element.email
     console.log(this.email)
     this.setValueForm()
    });
  }

  setValueForm(){
    this.userUpdateForm.setValue(
      {
        userId:this.userId,
        firstName: this.firstName ,
        lastName: this.lastName,
        email: this.email,
        password:"",
        confirmPassword:""
      }
    )
  
  }
 
}
