import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { exhaustMap, mergeMap, switchMap } from 'rxjs';
import { ConfigService } from '../services/config.service';
import { BookingService } from './booking.service';
import { CustomValidatorComponent } from './validators/custom-validator/custom-validator.component';

@Component({
  selector: 'hinv-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  constructor(private configService: ConfigService, private fb: FormBuilder,private bookingService:BookingService,private route:ActivatedRoute) {}
  ngOnInit(): void {
    const roomId=this.route.snapshot.paramMap.get('roomid');
    this.bookingForm = this.fb.group({
      roomId: new FormControl({value:roomId,disabled:true},{validators:[Validators.required]}),
      guestEmail: ['',{updateOn:'blur',validators:[Validators.required,Validators.email]}],
      checkInTime: ['',{}],
      checkOutTime: ['',{}],
      bookingStatus: [''],
      bookingDate: [''],
      mobileNumber: ['',{updateOn:'blur',validators:[Validators.required]}],
      guestName: ['',[Validators.required,Validators.minLength(5),CustomValidatorComponent.ValidateName,CustomValidatorComponent.ValidateSpecialChar('*')]],
      guestAddress: this.fb.group({
        addressLine1: ['',[Validators.required]],
        addressLine2: ['',[Validators.required]],
        city: ['',[Validators.required]],
        state: ['',[Validators.required]],
        country: ['',[Validators.required]],
        zipCode: [''],
      }),
      guestCount: this.fb.array([
        this.addGuestControl(),
      ]),
      tnc:new FormControl(false,{validators:[Validators.requiredTrue]}),
      guestList: [''],
    }
    ,{updateOn:'blur',Validators:[CustomValidatorComponent.Validatedate]}
    );

  this.getBookingData();
  this.bookingForm.valueChanges.pipe(
    exhaustMap((data)=>this.bookingService.bookRoom(data))
  ).subscribe((data)=>console.log(data));
  }
  bookingForm!: FormGroup;
  get guests() {
    return this.bookingForm.get('guestCount') as FormArray;
  }

  addBooking() {
    console.log(this.bookingForm.value);
    // this.bookingService.bookRoom(this.bookingForm.getRawValue()).subscribe((data)=>{
    //   console.log(data)
    // });
    this.bookingForm.reset({
      roomId: '',
      guestEmail: '',
      checkInTime: '',
      checkOutTime: '',
      bookingStatus: '',
      bookingDate: '',
      mobileNumber: '',
      guestName: '',
      guestAddress: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      },
      guestCount: [],
      tnc:false,
      guestList: [''],
  });
  }

getBookingData(){
  this.bookingForm.patchValue({
    guestEmail: 'test@gmail.com',
    checkInTime: '',
    checkOutTime: '',
    bookingStatus: '',
    bookingDate: '',
    mobileNumber: '',
    guestName: '',
    guestAddress: {
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      country: '',
      zipCode: '',
    },
    guestCount: [],
    tnc:false,
    guestList: [''],
  })
}

  addGuest() {
    this.guests.push(
      this.fb.group({ guestName: ['',[Validators.required]], age: new FormControl('') })
    );
  }

  addGuestControl(){
    return this.fb.group({ guestName: ['',[Validators.required]], age: new FormControl('') });
  }

  addPassport(){
    this.bookingForm.addControl('passport',new FormControl(''));
  }

  deletePassport(){
    this.bookingForm.removeControl('passport');
  }

  removeGuest(i:number){
    this.guests.removeAt(i);
  }
}

// export class Booking{
//   roomId:string;
//   guestEmail:string;
//   checkInTime:Date;
//   checkOutTime:Date;
//   bookingStatus:string;
//   bookingDate:Date;
//   mobileNumber:string;
//   guestAddress:string;
//   guestCity:string;
//   guestState:string;
//   guestCountry:string;
//   guestZipCode:string;
//   guestCount:number;
//   guestList:Guest[];
// }
