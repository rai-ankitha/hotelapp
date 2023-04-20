import { Component, ContentChild, Host, Self } from '@angular/core';
import { RoomsService } from '../rooms.service';

@Component({
  selector: 'hinv-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  providers:[RoomsService] //local instance of service file
})
export class EmployeeComponent {
 
empName:string='Peter';
constructor(private roomService:RoomsService){}
}
