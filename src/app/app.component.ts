import { AfterViewInit, Component, ElementRef, Inject, OnInit, Optional, ViewChild, ViewContainerRef } from '@angular/core';
import { RoomsComponent } from "./rooms/rooms.component";
import { localStorageToken } from 'src/localstorage.token';
import { LoggerService } from 'src/logger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'hotelinventoryapp';

  // @ViewChild('user', {read: ViewContainerRef}) vcr!: ViewContainerRef;

  // ngAfterViewInit(): void {
  //     const componentRef = this.vcr.createComponent(RoomsComponent);
  //     componentRef.instance.numberOfRooms = 50;
  // }

  constructor(@Optional() private loggerService: LoggerService,
  @Inject(localStorageToken) private localStorage: Storage){

  }

  @ViewChild('name', {static: true}) name!: ElementRef;

  ngOnInit(): void {
      this.loggerService?.log('Appcomponent.ngOnInit()');
      this.name.nativeElement.innerText = "Hilton Hotel";

      this.localStorage.setItem('name', 'Hilton Hotel');
  }
}
