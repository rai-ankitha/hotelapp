import { HttpEventType } from '@angular/common/http';
import { Component, OnDestroy, OnInit, SkipSelf, ViewChild} from '@angular/core';
import { FormControl } from '@angular/forms';
import { catchError, map, Observable,of,Subject,Subscription } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from '../rooms.service';
import { ConfigService } from '../services/config.service';
import { Room, RoomList } from './rooms';


@Component({
  selector: 'hinv-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnDestroy{

  hotelName = 'Vaibhav';
  noOfRooms = 10;
  isHide = true;

  selectedRoom!: RoomList;

  titleHeading = 'Room List';

  stream = new Observable<string>(observer => {
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.next('user4');
    observer.complete();
    //observer.error('error');
  });

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  toggle() {
    this.isHide = !this.isHide;
    this.titleHeading = 'List of Rooms';
  }

  selectRoom(room: RoomList) {
    this.selectedRoom = room;
  }

  // roomService=new RoomsService();

  addRoom() {
    const room: RoomList = {
      roomNumber: "4",
      roomType: 'Personal Room',
      amenities: 'Air conditioner',
      price: 7500,
      photos: 'https://images.unsplash.com/photo-1502759683299-cdcd6974244f?auto=format&fit=crop&w=440&h=220&q=60',
      checkinTime: new Date('27-Mar-2023'),
      checkOutTime: new Date('29-Mar-2023'),
      rating: 4.8,
    };
    this.roomService.addRoom(room).subscribe((data) => {
      this.roomList = data;
    });
    // this.roomList.push(room);
    //this.roomList = [...this.roomList, room];
  }

  editRoom() {
    const room: RoomList = {
      roomNumber: "2",
      roomType: 'Personal Room',
      amenities: 'Air conditioner',
      price: 7500,
      photos: 'https://images.unsplash.com/photo-1502759683299-cdcd6974244f?auto=format&fit=crop&w=440&h=220&q=60',
      checkinTime: new Date('27-Mar-2023'),
      checkOutTime: new Date('29-Mar-2023'),
      rating: 4.8,
    };
    this.roomService.editRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }

  deleteRoom() {
    this.roomService.deleteRoom('2').subscribe((data) => {
      this.roomList = data;
    });
  }

  rooms: Room = {
    totalRooms: 10,
    availableRooms: 10,
    bookedRooms: 5
  };

  roomList: RoomList[] = [];
  totalBytes = 0;
  subscription! :Subscription;

  error$=new Subject<string>();

  getError$=this.error$.asObservable();

  rooms$=this.roomService.getRooms$.pipe(
    catchError((err)=>{
      console.log(err);
      this.error$.next(err);
      return of([]);
    })
  );

  priceFilter=new FormControl(0);

  roomCount$=this.roomService.getRooms$.pipe(map((rooms)=>rooms.length));

  constructor(@SkipSelf() private roomService: RoomsService, private configService:ConfigService) {

  }
  

  ngOnInit(): void {
    this.roomService.getPhotos().subscribe((event) => {
      switch (event.type) {
        case HttpEventType.Sent: {
          console.log('Request has been made');
          break;
        }
        case HttpEventType.ResponseHeader: {
          console.log('Request success');
          break;
        }
        case HttpEventType.DownloadProgress: {
          this.totalBytes+=event.loaded;
          break;
        }
        case HttpEventType.Response: {
          console.log(event.body);
          break;
        }
      }
    }
    )
    this.stream.subscribe((data) => console.log(data));
    this.stream.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('complete'),
      error: (error) => console.log(error),
    })
    // this.subscription=this.roomService.getRooms$.subscribe(room => {
    //   this.roomList = room;
    // });

    
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }


}
