import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from '../../services/employee.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employees } from '../../interfaces/employee.interface';
import { DateAdapter } from '@angular/material/core';




@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
constructor(private fb: FormBuilder, private dateAdapter: DateAdapter<Date>,
 private employeeService: EmployeeService, private dialogRef: MatDialogRef<EmployeeFormComponent>, @Inject(MAT_DIALOG_DATA) public employee:Employees) {
    this.dateAdapter.setLocale('en-GB');

    this.employeeForm = this.fb.group({
      firstName: '',
      lastName: '',
      birthdate: new Date(),
      city: '',
      zip: null,
      street: '',
      number: null,
      phone: null
    })
  }

  ngOnInit(): void {
      this.employeeForm.patchValue(this.employee)
  }

  onSubmit() {
    if(this.employeeForm.valid) {

      if(this.employee) {
        this.employeeService.updateEmployee(this.employee.id, this.employeeForm.value).subscribe({
          next: (val: any) => {
            alert('Employee Updated successfully');
            this.dialogRef.close(true);
            //TODO Check why MatDialogRef doesn't work instead
            window.location.reload();
          },
          error: (err: any) => {
            console.log(err)
        }
      })

      } else {
        this.employeeService.addEmployee(this.employeeForm.value).subscribe({
          next: (val: any) => {
            alert('Employee added successfully');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.log(err)
        }
      })
      }

    }
    console.log(this.employeeForm.value);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
