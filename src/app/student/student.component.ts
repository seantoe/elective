import { Component, OnInit } from '@angular/core';
import { StudentService } from '../shared/student.service';
import { NgForm } from '@angular/forms';
import { Visitor } from '../shared/visitor.model';
import { ToastrService } from 'ngx-toastr';
import { Student } from '../shared/student.model';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor(public service : StudentService, private toastr:ToastrService) {
   }

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(selectedRecord:Student){
    this.service.formData = Object.assign({},selectedRecord) ;
  }

  onSubmit(form:NgForm){
    this.service.formSubmitted = true
    if(form.valid){
      if(this.service.formData.id == 0)
      this.insertRecord(form)
    else
      this.updateRecord(form)
    }
    
  }

  insertRecord(form: NgForm){
    this.service.postStudentDetail()
        .subscribe({
          next: res => {
            this.service.list = res as Student[]
            this.toastr.success('Inserted successfully','Student Details Registered')
            this.resetFormAndClearFields(form);
          },
          error: (err) => {
            console.log(err);
            this.toastr.error('Insert failed', 'Error');
        }
    });
  }

  updateRecord(form: NgForm){
    this.service.putStudentDetail()
        .subscribe({
          next: res => {
            this.service.list = res as Student[]
            this.toastr.info('Updated successfully','Student Details Registered')
            this.resetFormAndClearFields(form);
          },
          error: err => { console.log(err) }
        })
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.service.deleteStudentDetail(id).subscribe({
        next: () => {
          this.service.list = this.service.list.filter(s => s.id !== id);
          this.toastr.success('Deleted successfully', 'Student Details Registered');
        },
        error: (err) => {
          console.log(err);
          this.toastr.error('Delete failed', 'Error');
        }
      });
    }
  }

  resetFormAndClearFields(form: NgForm) {
    this.service.resetForm(form);
    form.resetForm();
  }
}
