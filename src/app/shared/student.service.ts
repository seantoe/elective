import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { environment } from 'src/environments/environment';
import { NgForm } from '@angular/forms';
import { Student } from './student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseUrl:string = "https://localhost:7125/api/StudentDetails"
  list:Student[] =[];
  formData: Student = new Student()
  formSubmitted: boolean = false;

  constructor(private http: HttpClient) { }

  refreshList(){
    this.http.get(this.baseUrl)
    .subscribe({
      next: res => {
        this.list = res as Student[]
      },
      error: err => { console.log(err) }
    })
  }

  postStudentDetail(){
    return this.http.post(this.baseUrl, this.formData)
  }

  putStudentDetail(){
    return this.http.put(this.baseUrl+'/'+this.formData.id, this.formData)
  }

  deleteStudentDetail(id:number){
    return this.http.delete(this.baseUrl + '/' + id)
  }

  resetForm(form:NgForm){
    form.form.reset()
    this.formData = new Student()
    this.formSubmitted = false;
  }
}
