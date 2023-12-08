import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsComponent } from './rooms.component';
import { RoomsService } from './services/rooms.service';
import { ConfigService } from 'src/services/config.service';
import { HttpClientModule } from '@angular/common/http';
import { APP_SERVICE_CONFIG } from '../AppConfig/appconfig.service';
import { RouteConfigToken } from 'src/services/routeConfig.service';

describe('RoomsComponent', () => {
  let component: RoomsComponent;
  let fixture: ComponentFixture<RoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomsComponent, HttpClientModule],
      providers: [
        RoomsService,
        ConfigService,
        {
          provide: APP_SERVICE_CONFIG,
          useValue: { apiEndpoint: 'http://localhost:3000' },
        },
        {
          provide: RouteConfigToken,
          useValue: { title: 'rooms' },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
