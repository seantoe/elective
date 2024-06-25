import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from '../shared/student.service';
import { Student } from '../shared/student.model';


@Component({
  selector: 'app-student-violation',
  templateUrl: './student-violation.component.html',
  styleUrls: ['./student-violation.component.css']
})
export class StudentViolationComponent implements OnInit {

  constructor(public service : StudentService, private toastr:ToastrService) {
  }

  ngOnInit(): void {
     this.service.refreshList();
  }

  populateForm(selectedRecord:Student){
    this.service.formData = Object.assign({},selectedRecord) ;
  }

  onDelete(Id:number){
    if(confirm('Are you sure you want to delete this record?'))
    this.service.deleteStudentDetail(Id)
    .subscribe({
      next: res => {
        this.service.list = res as Student[]
        this.toastr.error('Deleted successfully','Visitor Details Registered')
      },
      error: err => { console.log(err) }
    })
  }
  }
