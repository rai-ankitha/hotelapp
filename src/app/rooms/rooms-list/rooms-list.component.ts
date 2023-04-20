import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { RoomList } from '../rooms';

@Component({
  selector: 'hinv-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomsListComponent implements OnInit, OnChanges{
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['title']) {
      this.title = changes['title'].currentValue.toLowerCase();
    }
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  @Input() rooms: RoomList[] = [];
  @Output() selectedRoom = new EventEmitter<RoomList>();
  @Input() title: string = '';
  @Input() price:number=0;
  selectedRoomFunction(room: RoomList) {
    this.selectedRoom.emit(room)
  }
  // ngOnDestroy(): void {
  //   console.log('On destroy is called');
  // }
}
