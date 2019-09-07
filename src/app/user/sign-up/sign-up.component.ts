import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from '../../auth/auth.service';
import { Router, Params } from '@angular/router';


export class MyErrorStateMatcher implements ErrorStateMatcher {

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(public fb: FormBuilder ,public authService: AuthService,private router: Router) { }

  matcher = new MyErrorStateMatcher();
  public signUpForm: FormGroup;
  public submitted: boolean = false;
  showSuccessMessage: boolean;
  serverErrorMessages: string;

  ngOnInit() {
    this.registerForm();
  }
  
  registerForm() {
    this.signUpForm = this.fb.group({
      userRole: ['2'],
      firstName: ['', [Validators.required]],
      lastName: ['',[Validators.required]],
      email: ['',[Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  static matchPassword(AC: AbstractControl) {
    let pass = AC.get('password').value;
    let confirmPass = AC.get('confirmPassword').value;

    if(pass != confirmPass) {
      AC.get('confirmPassword').setErrors( {matchPassword: true} )
    }
    else {
      return null
    }
  }

  get userRole() {
    return this.signUpForm.get('userRole');
  }

  get firstName() {
    return this.signUpForm.get('firstName');
  }

  get lastName() {
    return this.signUpForm.get('lastName');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

   onSubmit(form: NgForm){
    console.log("in on submit",form.value);

    this.authService.doRegister(form.value)
    .then(res => {
      console.log(res);
      this.router.navigate(['/signIn']);
      // this.errorMessage = "";
      // this.successMessage = "Your account has been created";
    }, err => {
      console.log(err);
      // this.errorMessage = err.message;
      // this.successMessage = "";
    })
  //   this.userService.postUser(form.value).subscribe(
  //     res => {
  //       this.showSuccessMessage = true;
  //       setTimeout(() => this.showSuccessMessage = false,4000);
  //       // this.signUpForm.reset();
  //       this.resetForm(form);
  //     },
  //     err => {
  //       if (err.status == 422) {
  //         this.serverErrorMessages = err.error.join('<br/>');
  //       }
  //       else {
  //         this.serverErrorMessages = 'Something went wrong!';
  //         setTimeout(() => this.serverErrorMessages = '',4000);
  //       }
  //     }
  //   );
  }

  // resetForm(form: NgForm) {
  //   this.userService.selectedUser = {
  //     userRole: '2',
  //     firstName: '',
  //     lastName: '',
  //     email: '',
  //     password: ''
  //   };
  //   form.resetForm();
  //   this.serverErrorMessages = '';
  // }

  // checkPasswords(group: FormGroup {
  //   let pass = group.controls.password.value;
  //   let confirmPass = group.controls.confirmPassword.value;

  //   return pass === confirmPass ? null : { notSame: true }
  // })

}

