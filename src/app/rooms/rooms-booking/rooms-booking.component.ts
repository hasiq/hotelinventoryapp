import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hinv-rooms-booking',
  templateUrl: './rooms-booking.component.html',
  styleUrls: ['./rooms-booking.component.scss'],
})
export class RoomsBookingComponent implements OnInit {
  id: number = 0;

  id$ = this.router.paramMap.pipe(map((params) => params.get('roomid')));

  constructor(private router: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.router.snapshot.params['roomid'];
    // this.id$ = this.router.params.pipe(map((params) => params['roomid']));
    // this.router.paramMap.subscribe((params) => {
    //   params.get('roomid');
    // });
  }
}
