import {
  AfterContentInit,
  Component,
  ContentChild,
  Host,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from '../employee/employee.component';
import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'hinv-container',
  templateUrl: './container.component.html',
  // providers: [RoomsService],
})
export class ContainerComponent implements AfterContentInit {
  @ContentChild(EmployeeComponent) employee!: EmployeeComponent;

  constructor() {}

  ngAfterContentInit(): void {
    console.log(this.employee);
    this.employee.empName = 'Rick';
  }
}
