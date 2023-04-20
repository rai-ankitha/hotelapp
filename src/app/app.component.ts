import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import { InitService } from './init.service';
import { localStorageToken } from './localstorage.token';
import { Dummy } from './rooms/dummy.model';
import { RoomsComponent } from './rooms/rooms.component';
import { ConfigService } from './services/config.service';

@Component({
  selector: 'hinv-root',
  templateUrl: './app.component.html',
  // template: `<h1>Hello world from inline template!</h1>
  // <p>Angular is Awesome</p>`,
  // styleUrls: ['./app.component.scss']
  styles: [
    `
      h1 {
        color: blue;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    // this.router.events.subscribe((event)=>{
    //   console.log(event);
    // })
    this.router.events.pipe(filter((event)=>event instanceof NavigationStart)).subscribe((event)=>{
      console.log('Navigation started');
    });

    this.router.events.pipe(filter((event)=>event instanceof NavigationEnd)).subscribe((event)=>{
      console.log('Navigation ended');
    });
    this.nm.nativeElement.innerText = 'Swadist hotel';
    this.localStorage.setItem('name', 'HiltonHotel');
  }

  constructor(
    @Inject(localStorageToken) private localStorage: Storage,
    private initService: InitService,
    private configService: ConfigService,
    private router:Router
  ) {console.log(initService.config);}
  title = 'hotelapp';

  appVersion = this.initService.config.api;

  role = 'Admin';

  @ViewChild('name', { static: true }) nm!: ElementRef;

  // @ViewChild('user', { read: ViewContainerRef }) vcr!: ViewContainerRef;

  // ngAfterViewInit() {
  //   const componentRef = this.vcr.createComponent(RoomsComponent);
  //   componentRef.instance.noOfRooms = 50;

  // }

  dummies: Dummy[] = [new Dummy('Ankitha Rai', 22), new Dummy('Sanjana', 27)];
}
