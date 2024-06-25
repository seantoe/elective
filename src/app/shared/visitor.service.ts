import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { environment } from 'src/environments/environment';
import { Visitor } from './visitor.model';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class VisitorService {

  private baseUrl:string = "https://localhost:7125/api/VisitorDetails/"
  list:Visitor[] =[];
  formData: Visitor = new Visitor()
  formSubmitted: boolean = false;

  constructor(private http: HttpClient) { }

  refreshList(){
    this.http.get(this.baseUrl)
    .subscribe({
      next: res => {
        this.list = res as Visitor[]
      },
      error: err => { console.log(err) }
    })
  }

  postVisitorDetail(){
    return this.http.post(this.baseUrl, this.formData)
  }

  putVisitorDetail(){
    return this.http.put(this.baseUrl+'/'+this.formData.visitorId, this.formData)
  }

  deleteVisitorDetail(id:number){
    return this.http.delete(this.baseUrl+'/'+ id)
  }

  resetForm(form:NgForm){
    form.form.reset()
    this.formData = new Visitor()
    this.formSubmitted = false;
  }
}
