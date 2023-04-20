import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'hinv-rooms-booking',
  templateUrl: './rooms-booking.component.html',
  styleUrls: ['./rooms-booking.component.scss'],
})
export class RoomsBookingComponent implements OnInit {
  id: number = 0;
// id$!:Observable<number>;
id$=this.routerId.paramMap.pipe(map((params)=> params.get('roomId')));
  constructor(private routerId: ActivatedRoute) {}
  // id$ = this.routerId.params.pipe(map((params) => params['routerId']));
  ngOnInit(): void {
    // this.routerId.params.subscribe((data) => {
    //   this.id = data['roomId'];
    // });
    // this.id$=this.routerId.params.pipe(map((params) => params['routerId']));
  }
}
