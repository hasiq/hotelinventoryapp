import { Component, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'hinv-employee',
  templateUrl: './employee.component.html',
  providers: [RoomsService],
})
export class EmployeeComponent {

  empName : string = 'John';

  constructor(@Self() private roomsService: RoomsService){}

}
