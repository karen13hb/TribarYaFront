import { Component } from '@angular/core';
import { phoneNumbers } from 'src/app/utils/countryList';


@Component({
  selector: 'app-input-tel',
  templateUrl: './input-tel.component.html',
  styleUrls: ['./input-tel.component.css']
})
export class InputTelComponent {

  phoneNumbers = phoneNumbers;

  selectedCountry: string = this.phoneNumbers[0].country;

  code = "";
  
  selectCountry(country: string, code:string): void {
    this.selectedCountry = country;
    this.code = code.toLowerCase();
  }
}
