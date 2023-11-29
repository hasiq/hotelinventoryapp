import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomList } from '../rooms';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'hinv-rooms-list',
  templateUrl: './rooms-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() rooms: RoomList[] | null = [];

  @Input() title: string = '';

  @Output() selectedRoom = new EventEmitter<RoomList>();

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes['title']) {
      this.title = changes['title'].currentValue.toUpperCase();
    }
  }

  selectRoom(room: RoomList) {
    this.selectedRoom.emit(room);
  }

  ngOnDestroy(): void {
    console.log('on destroy is called');
  }
}
