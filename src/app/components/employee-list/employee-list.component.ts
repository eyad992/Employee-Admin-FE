import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from '../../services/employee.service';
import { Employees } from '../../interfaces/employee.interface';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { EmployeeInfoComponent } from '../employee-info/employee-info.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent {
  displayedColumns: string[] = ['firstName', 'lastName', 'actions'];
  dataSource: MatTableDataSource<Employees> = new MatTableDataSource<Employees>([]);

  constructor(private employeeService: EmployeeService, private dialog: MatDialog) {}

  ngOnInit(){
    this.fetchEmployees();
  }

  fetchEmployees(): void {
    this.employeeService.fetchEmployees().subscribe({
      next: (employees: Employees[]) => {
        this.dataSource.data = employees;
      }
    })
  }

  openDetails(employee: Employees): void {
    const dialogRef = this.dialog.open(EmployeeInfoComponent, {
      width: '400px',
      data:  { employee:employee }
    });
  }

  editEmployee(data: Employees): void {
    const dialogRef = this.dialog.open(EmployeeFormComponent, {
      data: data
    });
  }

  deleteEmployee(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
    this.employeeService.deleteEmployee(id).subscribe({
      next: (res) => {
        this.fetchEmployees();
      },
      error: console.log,
    });
  }
 }
}
