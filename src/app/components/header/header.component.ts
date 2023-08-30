import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeFormComponent } from '../employee-form/employee-form.component'
import { EmployeeService } from '../../services/employee.service';
import { Employees } from '../../interfaces/employee.interface';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  dataSource: MatTableDataSource<Employees> = new MatTableDataSource<Employees>([]);
  constructor(private dialog: MatDialog, private employeeService: EmployeeService) {}

  fetchEmployees(): void {
    this.employeeService.fetchEmployees().subscribe({
      next: (employees: Employees[]) => {
        this.dataSource.data = employees;
      }
    })
  }

  openForm() {
    const dialogRef = this.dialog.open(EmployeeFormComponent)
      dialogRef.afterClosed().subscribe({
        next: (value) => {
          if (value) {
            this.fetchEmployees();

            //TODO Check why MatDialogRef doesn't work instead
            window.location.reload();

          }
        }
      })
  }

}
