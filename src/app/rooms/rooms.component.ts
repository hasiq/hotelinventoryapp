import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnDestroy,
  OnInit,
  QueryList,
  SkipSelf,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Room, RoomList } from './rooms';
import { RoomsListComponent } from './rooms-list/rooms-list.component';
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from './services/rooms.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Observable, Subject, Subscription, catchError, map, of } from 'rxjs';
import { ConfigService } from 'src/services/config.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'hinv-rooms',
  templateUrl: './rooms.component.html',
})
export class RoomsComponent
  implements OnInit, DoCheck, AfterViewInit, AfterViewChecked, OnDestroy
{
  hotelName = 'Hilton Hotel';

  numberOfRooms = 10;

  hideRooms = true;

  selectedRoom!: RoomList;

  rooms: Room = {
    totalRooms: 20,
    availableRooms: 10,
    bookedRooms: 5,
  };

  title = 'Room List';

  totalBytes = 0;

  subscription!: Subscription;

  error$ = new Subject<string>();

  getError$ = this.error$.asObservable();

  rooms$ = this.roomsService.getRooms$.pipe(
    catchError((err) => {
      // console.log(err);
      this.error$.next(err.message);
      return of([]);
    })
  );

  priceFilter = new FormControl(0);

  roomsCount$ = this.roomsService.getRooms$.pipe(map((rooms) => rooms.length));

  roomList: RoomList[] = [];

  stream = new Observable<string>((observer) => {
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete();
    // observer.error('error');
  });

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  @ViewChildren(HeaderComponent)
  headerChildrenComponent!: QueryList<HeaderComponent>;

  // roomService = new RoomsService();

  constructor(
    private roomsService: RoomsService,
    private configService: ConfigService
  ) {}

  ngOnInit(): void {
    this.roomsService.getPhotos().subscribe((event) => {
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
          this.totalBytes += event.loaded;
          break;
        }
        case HttpEventType.Response: {
          console.log(event.body);
        }
      }
    });

    this.stream.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('complete'),
      error: (err) => console.log(err),
    });
    this.stream.subscribe((data) => console.log(data));

    // this.roomsService.getRooms$.subscribe((rooms) => {
    //   this.roomList = rooms;
    // });
    // console.log(this.headerComponent);
  }

  ngAfterViewInit(): void {
    this.headerComponent.title = 'Rooms View';

    this.headerChildrenComponent.last.title = 'Last Title';
    // this.headerChildrenComponent.get(0).title = "First Title";
  }

  ngDoCheck(): void {
    console.log('on changes is called');
  }

  ngAfterViewChecked(): void {}

  toggle() {
    this.hideRooms = !this.hideRooms;
    this.title = 'Rooms List';
  }

  selectRoom(room: RoomList) {
    this.selectedRoom = room;
  }

  addRoom() {
    const room: RoomList = {
      // roomNumber: '4',
      roomType: 'Deluxe Room',
      amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kithen',
      price: 500,
      photos:
        'https://www.bing.com/images/search?view=detailV2&ccid=vjBVM3pN&id=D00467F807F3032AC80D47E6D85812F55BA1C25B&thid=OIP.vjBVM3pNH1AaVddiJ9_WHAHaE8&mediaurl=https%3a%2f%2fimages.pexels.com%2fphotos%2f1470945%2fpexels-photo-1470945.jpeg%3fcs%3dsrgb%26dl%3darchitecture-apartment-room-1470945.jpg%26fm%3djpg&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.be3055337a4d1f501a55d76227dfd61c%3frik%3dW8KhW%252fUSWNjmRw%26pid%3dImgRaw%26r%3d0&exph=4005&expw=6004&q=room+photo&simid=608005406500535660&FORM=IRPRST&ck=231B917EC15897E05EBCFC0079572213&selectedIndex=0&idpp=overlayview&ajaxhist=0&ajaxserp=0',
      checkinTime: new Date('11-Nov-2021'),
      checkoutTime: new Date('12-Nov-2021'),
      rating: 4.5,
    };

    // this.roomList.push(room);
    this.roomsService.addRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }

  editRoom() {
    const room: RoomList = {
      roomNumber: '3',
      roomType: 'Deluxe Room',
      amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kithen',
      price: 500,
      photos:
        'https://www.bing.com/images/search?view=detailV2&ccid=vjBVM3pN&id=D00467F807F3032AC80D47E6D85812F55BA1C25B&thid=OIP.vjBVM3pNH1AaVddiJ9_WHAHaE8&mediaurl=https%3a%2f%2fimages.pexels.com%2fphotos%2f1470945%2fpexels-photo-1470945.jpeg%3fcs%3dsrgb%26dl%3darchitecture-apartment-room-1470945.jpg%26fm%3djpg&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.be3055337a4d1f501a55d76227dfd61c%3frik%3dW8KhW%252fUSWNjmRw%26pid%3dImgRaw%26r%3d0&exph=4005&expw=6004&q=room+photo&simid=608005406500535660&FORM=IRPRST&ck=231B917EC15897E05EBCFC0079572213&selectedIndex=0&idpp=overlayview&ajaxhist=0&ajaxserp=0',
      checkinTime: new Date('11-Nov-2021'),
      checkoutTime: new Date('12-Nov-2021'),
      rating: 4.5,
    };

    this.roomsService.editRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }

  deleteRoom() {
    this.roomsService.delete('3').subscribe((data) => {
      this.roomList = data;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
