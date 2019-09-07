import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'; 
import { Employee } from 'app/shared/services/employee.model';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'app/shared/services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employeeList:Employee[];

  constructor(private firestore: AngularFirestore,
              private service : EmployeeService,
              private toastr : ToastrService) { }

  ngOnInit() {
    this.service.getEmployee().subscribe(actionArray => {
      this.employeeList = actionArray.map(item=>{
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() 
        } as Employee;
        
        })
        console.log(this.employeeList);
  });
  
  }

  onEdit(employee:Employee){
    this.service.formData = Object.assign ({},employee);

  }

  onDelete(id:String){
    if(confirm('Are you sure to delete this record ?')){
      this.firestore.doc('Employee-Information/'+id).delete()
      this.toastr.warning('Deleted successfully !','Employee Record');
    }

  }

}
