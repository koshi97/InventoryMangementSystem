import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore'; 
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'app/shared/services/employee.service';
import { Employee } from 'app/shared/services/employee.model';
import { AuthService } from 'app/auth/auth.service';
//import { AngularFireStorage,AngularFireStorageReference,AngularFireUploadTask } from '@angular/fire/storage';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.css']
})
export class EmployeeManagementComponent implements OnInit {

  public isButtonVisible = true;
  list:Employee[];

  constructor(private service : EmployeeService,
              private firestore: AngularFirestore,
              private toastr : ToastrService,
              public fb: FormBuilder, 
              private router: Router ,
              private  authService: AuthService) {
     this.employeesForm = new FormGroup({

      id: new FormControl(),
      empId: new FormControl(),
      empName: new FormControl(),
      empDept: new FormControl(),
      empDesignation: new FormControl(),
      empAddress: new FormControl(),
      empContact: new FormControl(),
      empEmail: new FormControl(),
      birthday: new FormControl(),
      empGender: new FormControl(),
      startDate: new FormControl(),
      empEdu: new FormControl(),
   });
  }
  public employeesForm: FormGroup;


  //-------- image-uploader part--------------

  // ref:AngularFireStorageReference;
  // task:AngularFireUploadTask ;

  // constructor(private afstorage:AngularFireStorage
  //   ) { }

  ngOnInit() {
    this.resetForm();
    this.service.getEmployee().subscribe(actionArray => {
      this.list = actionArray.map(item=>{
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() 
        } as Employee;
        
        })
  });
  }

  resetForm(form ?: NgForm) {
    // tslint:disable-next-line:curly
    if (form != null)
      form.resetForm();
      this.service.formData= {
      id: null,
      empID: '',
      empName: '',
      empDept: '',
      empDesignation:'',
      empAddress:'',
      empContact:'',
      empEmail:'',
      birthday:'',
      empGender:'',
      startDate:null,
      empEdu:'',
    
    }
  }
  
  
  onSubmit(form:NgForm){
    let data = Object.assign({},form.value);
    delete data.id;
    
    if(form.value.id == null){
      this.firestore.collection('Employee-Information').add(data);
      this.resetForm(form);
      this.toastr.success('Submitted successfully','Employee Information');
    }
     
    
    else{
      this.firestore.doc('Employee-Information/'+ form.value.id).update(data);
      this.resetForm(form);
      this.toastr.success('Submitted successfully','Employee Information');

    }
   
  }

  // upload(event){
  //   this.ref=this.afstorage.ref(event.target.files[0].name)
  //   this.task=this.ref.put(event.target.files[0]);
  // }
  

}
