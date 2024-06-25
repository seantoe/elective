import { Component, OnInit } from '@angular/core';
import { VisitorService } from '../shared/visitor.service';
import { NgForm } from '@angular/forms';
import { Visitor } from '../shared/visitor.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-visitor',
  templateUrl: './visitor.component.html',
  styleUrls: ['./visitor.component.css']
})
export class VisitorComponent implements OnInit {

  constructor(public service : VisitorService, private toastr:ToastrService) {
   }

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(selectedRecord:Visitor){
    this.service.formData = Object.assign({},selectedRecord) ;
  }

  onSubmit(form:NgForm){
    this.service.formSubmitted = true
    if(form.valid){
      if(this.service.formData.visitorId == 0)
      this.insertRecord(form)
    else
      this.updateRecord(form)
    }
    
  }

  insertRecord(form: NgForm){
    this.service.postVisitorDetail()
        .subscribe({
          next: res => {
            this.service.list = res as Visitor[]
            this.toastr.success('Inserted successfully','Visitor Details Registered')
            this.refreshPage();
          },
          error: err => { console.log(err) }
        })
  }

  updateRecord(form: NgForm){
    this.service.putVisitorDetail()
        .subscribe({
          next: res => {
            this.service.list = res as Visitor[]
            this.toastr.info('Updated successfully','Visitor Details Registered')
            this.refreshPage();
          },
          error: err => { console.log(err) }
        })
  }

  onDelete(id:number){
    if(confirm('Are you sure you want to delete this record?'))
    this.service.deleteVisitorDetail(id)
    .subscribe({
      next: res => {
        this.service.list = res as Visitor[]
        this.toastr.error('Deleted successfully','Visitor Details Registered')
        this.refreshPage();
      },
      error: err => { console.log(err) }
    })
  }

  refreshPage() {
    location.reload();
  }
}
