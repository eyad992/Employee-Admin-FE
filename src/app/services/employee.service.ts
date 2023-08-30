import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employees } from '../interfaces/employee.interface';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public apiUrl = 'http://localhost:3000/employees';

  constructor(private http: HttpClient) {}

    fetchEmployees(){
      return this.http.get<Employees[]>(this.apiUrl);
    }

    addEmployee(data: any): Observable<any> {
      return this.http.post(this.apiUrl, data);
    }

    updateEmployee(id: number, employee: any): Observable<any> {
      return this.http.put(`${this.apiUrl}/${id}`, employee);
    }

    deleteEmployee(id: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${id}`);
    }

}
