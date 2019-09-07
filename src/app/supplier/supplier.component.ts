import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {
  supplier = new Supplier('', '', '', '', '', '', '', '', '', '');


  listOfSupliers: Supplier[] = [];

  constructor(private firebaseService: AngularFirestore) { }

  ngOnInit() {
    this.supplier = new Supplier('', '', '', '', '', '', '', '', '', '');
    this.getSuppliers();

  }
  submit() {
    if (this.supplier.supName.length > 0  && this.supplier.mobile.length > 0 && this.supplier.type.length > 0  )  {
      if (this.supplier.id.length === 0) {
        this.firebaseService.collection('suppliers').add(JSON.parse(JSON.stringify(this.supplier))).then(() => {
          this.reset()
        });
      } else {

        this.firebaseService.doc('suppliers/' + this.supplier.id).update(JSON.parse(JSON.stringify(this.supplier))).then(() => {
          this.reset()
          alert('Update Successful!')
        });
      }

    } else {
      alert('Fill the required fields')
    }


  }

  getSuppliers() {


    const collection: AngularFirestoreCollection<Supplier> = this.firebaseService.collection('suppliers/')

    collection.snapshotChanges().subscribe(res => {

      this.listOfSupliers = [];
      // this.listOfSupliers=res;

      res.forEach((r, s, a, ) => {
        let data: Supplier = r.payload.doc.data();
        data.id =
          r.payload.doc.id.toString();
        this.listOfSupliers.push(data);

      })

    })
    // collection$.subscribe(data => console.log(data) )

    // this.firebaseService.collection('suppliers').snapshotChanges().subscribe(res => {
    //   // this.listOfSupliers=res.entries;
    //   // alert(JSON.stringify(res, null, 2))
    // })

  }

  editSupplier(data) {
    this.supplier = data
  }

  deleteSupplier(id) {
    if (confirm('Are you sure you want to delete?')) {

      this.firebaseService.doc('suppliers/' + id).delete();
    } else {

    }
  }
  reset() {

    this.supplier = new Supplier('', '', '', '', '', '', '', '', '', '');
  }
}

export class Supplier {
  // public supName: ''
  //   public code: ''
  //   public conName: ''
  //   public mobile: ''
  //   public email: ''
  //   public address: ''
  //   public type: ''
  //   public discount: ''
  //   public dueDate: ''
  constructor(
    public id: string,
    public supName: '',
    public code: '',
    public conName: '',
    public mobile: '',
    public email: '',
    public address: '',
    public type: '',
    public discount: '',
    public dueDate: '') {

  }
}
