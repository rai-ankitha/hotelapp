import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RoomsService } from '../rooms.service';
import { RoomList } from '../rooms/rooms';

@Component({
  selector: 'hinv-rooms-add',
  templateUrl: './rooms-add.component.html',
  styleUrls: ['./rooms-add.component.scss'],
})
export class RoomsAddComponent {
  room: RoomList = {
    roomType: '',
    amenities: '',
    price: 0,
    photos: '',
    rating: 0,
    checkinTime: new Date(),
    checkOutTime: new Date(),
  };

  successMessage: string = '';
  constructor(private roomservice: RoomsService) {}
  AddRoom(roomsForm: NgForm) {
    this.roomservice.addRoom(this.room).subscribe((data) => {
      this.successMessage = 'Room Added Successfully';
      roomsForm.reset({
        roomType: '',
        amenities: '',
        price: 0,
        photos: '',
        rating: 0,
        checkinTime: new Date(),
        checkOutTime: new Date(),
      });
    });
  }
}
