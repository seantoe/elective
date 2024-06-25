import { Component, OnInit } from '@angular/core';
import { VisitorService } from '../shared/visitor.service';
import { NgForm } from '@angular/forms';
import { Visitor } from '../shared/visitor.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-visitor-list',
  templateUrl: './visitor-list.component.html',
  styleUrls: ['./visitor-list.component.css']
})
export class VisitorListComponent implements OnInit {

  constructor(public service : VisitorService, private toastr:ToastrService) {
  }

  ngOnInit(): void {
     this.service.refreshList();
  }

  populateForm(selectedRecord:Visitor){
    this.service.formData = Object.assign({},selectedRecord) ;
  }

  onDelete(Id:number){
    if(confirm('Are you sure you want to delete this record?'))
    this.service.deleteVisitorDetail(Id)
    .subscribe({
      next: res => {
        this.service.list = res as Visitor[]
        this.toastr.error('Deleted successfully','Visitor Details Registered')
      },
      error: err => { console.log(err) }
    })
  }
  }
