import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);

  constructor( public fb: FormBuilder) { }

  matcher = new MyErrorStateMatcher();
  public contactUsForm: FormGroup;
  public submitted: boolean = false;
  showSuccessMessage: boolean;
  serverErrorMessages: string;

  ngOnInit() {
  }

  messageForm() {
    this.contactUsForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get fullName() {
    return this.contactUsForm.get('fullName');
  }

  get email() {
    return this.contactUsForm.get('email');
  }

  get message() {
    return this.contactUsForm.get('message');
  }

  // onSubmit(form: NgForm){
  //   this.userService.sendMessage(form.value).subscribe(
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
  // }

  resetForm(form: NgForm) {
    form.resetForm();
    this.serverErrorMessages = '';
  }

  getUrl(){
    return "url('../../../assets/img/background.jpg')";
  }

}
