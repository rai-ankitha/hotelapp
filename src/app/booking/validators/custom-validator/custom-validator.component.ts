import { Component } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'hinv-custom-validator',
  templateUrl: './custom-validator.component.html',
  styleUrls: ['./custom-validator.component.scss'],
})
export class CustomValidatorComponent {
  static ValidateName(control: AbstractControl) {
    const value = control.value as string;
    if (value.includes('test')) {
      return {
        validateName: {
          invalid: true,
        },
      };
    }
    return null;
  }

  static ValidateSpecialChar(char: string) {
    return (control: AbstractControl) => {
      const value = control.value as string;
      if (value.includes(char)) {
        return {
          invalidSpecialChar: true,
        };
      }
      return null;
    };
  }
  
  static Validatedate(control: FormGroup) {
    const checkInTime:any=new Date(control.get('checkInTime')?.value);
    const checkOutTime:any=new Date(control.get('checkOutTime')?.value);
   const diffTime=checkOutTime-checkInTime;
    const diffDays=Math.ceil(diffTime/(1000*60*60*24));
    console.log(diffDays);
    console.log(diffTime);
    if(diffDays<=0){
      control.get('checkOutTime')?.setErrors({
        invalidDate:true,
      })
      return{
        invalidDate:true,
      }
    }
    return null;
  }
}
