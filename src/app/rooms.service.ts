import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AppConfig } from './AppConfig/appconfig.interface';
import { appServiceConfig } from './AppConfig/appconfig.services';
import { RoomList } from './rooms/rooms';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {


  roomList: RoomList[] = [
    //   {
    //   roomNo: "1",
    //   roomType: 'Deluxe Room',
    //   amenities: 'Air conditioner',
    //   price: 500,
    //   photos: 'https://images.unsplash.com/photo-1502759683299-cdcd6974244f?auto=format&fit=crop&w=440&h=220&q=60',
    //   checkinTime: new Date('27-Mar-2023'),
    //   checkOutTime: new Date('29-Mar-2023'),
    //   rating: 4.3,
    // },
    // {
    //   roomNo: "2",
    //   roomType: 'Premier Room',
    //   amenities: 'Air conditioner',
    //   price: 1500,
    //   photos: 'https://images.unsplash.com/photo-1502759683299-cdcd6974244f?auto=format&fit=crop&w=440&h=220&q=60',
    //   checkinTime: new Date('27-Mar-2023'),
    //   checkOutTime: new Date('29-Mar-2023'),
    //   rating: 3.3,
    // },
    // {
    //   roomNo: "3",
    //   roomType: 'Private Room',
    //   amenities: 'Air conditioner',
    //   price: 2500,
    //   photos: 'https://images.unsplash.com/photo-1502759683299-cdcd6974244f?auto=format&fit=crop&w=440&h=220&q=60',
    //   checkinTime: new Date('27-Mar-2023'),
    //   checkOutTime: new Date('29-Mar-2023'),
    //   rating: 4.2569,
    // },
  ];

  constructor(@Inject(appServiceConfig) private config: AppConfig, private http: HttpClient) {
    console.log(environment.apiEndpoint);
  }

  //to add header components
  // header = new HttpHeaders({ token: '124sfddfd' })
  getRooms$ = this.http.get<RoomList[]>('/api/rooms', 
  // {
  //   headers: this.header,
  // }
  ).pipe(shareReplay(1));

  getRooms() {
    // return this.roomList;
    return this.http.get<RoomList[]>('/api/rooms');

  }
  addRoom(room: RoomList) {
    return this.http.post<RoomList[]>('/api/rooms', room);
  }
  editRoom(room: RoomList) {
    return this.http.put<RoomList[]>(`/api/rooms/${room.roomNumber}`, room);
  }
  deleteRoom(id: string) {
    return this.http.delete<RoomList[]>(`/api/rooms/${id}`);
  }
  getPhotos() {
    const request = new HttpRequest('GET', `https://jsonplaceholder.typicode.com/photos`, {
      reportProgress: true,
    });
    return this.http.request(request);
  }

}
