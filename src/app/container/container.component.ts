import { AfterContentInit, Component, ContentChild, Host, OnInit } from '@angular/core';
import { EmployeeComponent } from '../employee/employee.component';
import { RoomsService } from '../rooms.service';

@Component({
  selector: 'hinv-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  //providers:[RoomsService]
})
export class ContainerComponent implements OnInit, AfterContentInit{
  @ContentChild(EmployeeComponent) employee!:EmployeeComponent;
 
  //constructor(@Host() private roomService:RoomsService){}
  constructor(){}
 
  ngOnInit(): void {
    
  }
  ngAfterContentInit(){
    this.employee.empName='Richard';
  }
}
