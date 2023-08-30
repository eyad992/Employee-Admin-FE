import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employees, Address } from '../../interfaces/employee.interface';

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.scss']
})
export class EmployeeInfoComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { employee: Employees }) {}

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  getPropertyLabel(propertyName: string): string {
    const label = propertyName.replace(/([A-Z])/g, ' $1');
    return label.charAt(0).toUpperCase() + label.slice(1);
  }

  getPropertyValue(property: string): any {
    if (property === 'id') {
      return '';
    } else if (property.startsWith('address.')) {
      const addressProperty = property.substr(8);
      return this.getAddressPropertyValue(addressProperty);
    } else {
      return (this.data.employee as any)[property];
    }
  }

  getAddressPropertyValue(property: string): any {
    if (this.data.employee.address) {
      return (this.data.employee.address as any)[property as keyof Address];
    } else {
      return '';
    }
  }
}
