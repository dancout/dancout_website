import { Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { THIS_EXPR, IfStmt } from '@angular/compiler/src/output/output_ast';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';


/**
 * @title Table with expandable rows
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class AppComponent implements OnInit {


  title = 'dancout';
  woodCost = 4.78;
  shippingCost = 9;
  seeMessage = "See Price Breakdown";
  seeMore = false;

  // submission section
  secondLine = '';

  designSelectionPic = '/assets/Dark.jpg';
  paymentPic = 'https://dvh1deh6tagwk.cloudfront.net/money-transfers/images/product/venmologo-supplied-310x194.png?ver=20200404-135714';

  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  flipSeeMore() {
    this.seeMore = !this.seeMore;
    this.seeMessage = this.seeMore ? "See Less" : "See Price Breakdown";
  }

  updateDonationPerQuantity() {
    const totalQuantity = this.firstFormGroup.get('darkQuantity2').value +
      this.firstFormGroup.get('lightQuantity2').value +
      this.firstFormGroup.get('popQuantity2').value;
    const totalStandsQuantity = this.firstFormGroup.get('standQuantity2').value;

    this.firstFormGroup.get('donationCost2').setValue(totalQuantity * 12 + totalStandsQuantity * 7);
  }

  checkDontationAdequacy() {

    // TODO: make the dontation field just an "additional donation" field
    // TODO: probably change minDonation to totalDonation or something

    const totalQuantity = this.firstFormGroup.get('darkQuantity2').value +
      this.firstFormGroup.get('lightQuantity2').value +
      this.firstFormGroup.get('popQuantity2').value;
    const totalStandsQuantity = this.firstFormGroup.get('standQuantity2').value;

    if (this.firstFormGroup.get('additionalDonation').value < 0) {
      this.firstFormGroup.get('additionalDonation').setErrors({ 'tooLow': true });
    }
    else {
      this.firstFormGroup.get('additionalDonation').setErrors(null);
    }
  }

  disableAccordingly() {
    // dark
    if (this.firstFormGroup.get('darkChecked2').value) {
      this.firstFormGroup.get('darkQuantity2').enable();
      if (this.firstFormGroup.get('darkQuantity2').value === 0) {
        this.firstFormGroup.get('darkQuantity2').setValue(1);
      }
    }
    else {
      this.firstFormGroup.get('darkQuantity2').setValue(0);
      this.firstFormGroup.get('darkQuantity2').disable();
    }

    // light
    if (this.firstFormGroup.get('lightChecked2').value) {
      this.firstFormGroup.get('lightQuantity2').enable();
      if (this.firstFormGroup.get('lightQuantity2').value === 0) {
        this.firstFormGroup.get('lightQuantity2').setValue(1);
      }
    }
    else {
      this.firstFormGroup.get('lightQuantity2').setValue(0);
      this.firstFormGroup.get('lightQuantity2').disable();
    }

    // pop
    if (this.firstFormGroup.get('popChecked2').value) {
      this.firstFormGroup.get('popQuantity2').enable();
      if (this.firstFormGroup.get('popQuantity2').value === 0) {
        this.firstFormGroup.get('popQuantity2').setValue(1);
      }
    }
    else {
      this.firstFormGroup.get('popQuantity2').setValue(0);
      this.firstFormGroup.get('popQuantity2').disable();
    }

    // stand
    if (this.firstFormGroup.get('coasterDecision2').value === 'Yes') {
      this.firstFormGroup.get('standQuantity2').enable();
      if (this.firstFormGroup.get('standQuantity2').value === 0) {
        this.firstFormGroup.get('standQuantity2').setValue(1);
      }
    }
    else {
      this.firstFormGroup.get('standQuantity2').setValue(0);
      this.firstFormGroup.get('standQuantity2').disable();
    }

    // update min donation
    this.updateDonationPerQuantity();
  }


  ngOnInit() {

    this.firstFormGroup = this._formBuilder.group({
      designSelection2: ['Dark', Validators.required],
      darkChecked2: [true],
      darkQuantity2: [1],
      lightChecked2: [false],
      lightQuantity2: [0],
      popChecked2: [false],
      popQuantity2: [0],
      coasterDecision2: ['No'],
      standQuantity2: [0],
      donationCost2: [0],
      additionalDonation: [0],
    });

    this.secondFormGroup = this._formBuilder.group({
      fullName2: ['', Validators.required],
      addressLine1_2: ['', Validators.required],
      addressLine2_2: [''],
      city2: ['', Validators.required],
      state2: ['', Validators.required],
      zip2: ['', Validators.required],
      paymentOption2: ['Venmo', Validators.required],
      paymentAccount: ['', Validators.required],
      additionalComments2: ['']
    });

    this.disableAccordingly();

  }

  scroll(id) {
    let el = document.getElementById(id);
    el.scrollIntoView({ behavior: 'smooth' });
  }

  getTotalCoasterDonation() {
    let myNum = 0;
    myNum += this.firstFormGroup.get('darkQuantity2').value * 12;
    myNum += this.firstFormGroup.get('lightQuantity2').value * 12;
    myNum += this.firstFormGroup.get('popQuantity2').value * 12;

    return myNum;
  }

  getTotalDonation() {
    return this.getTotalCoasterDonation() + this.calculateStandCost() + this.firstFormGroup.get('additionalDonation').value;
  }

  getTotalCost() {
    return this.getTotalDonation() + this.shippingCost + this.calculateWoodCost();
  }

  calculateWoodCost() {
    let myCost = 0;

    this.firstFormGroup.get('darkChecked2').value ? (myCost += this.firstFormGroup.get('darkQuantity2').value * this.woodCost) : myCost;
    this.firstFormGroup.get('lightChecked2').value ? (myCost += this.firstFormGroup.get('lightQuantity2').value * this.woodCost) : myCost;
    this.firstFormGroup.get('popChecked2').value ? (myCost += this.firstFormGroup.get('popQuantity2').value * this.woodCost) : myCost;

    return Number(parseFloat(myCost.toString()).toFixed(2));
  }

  calculateStandCost() {
    return this.firstFormGroup.get('standQuantity2').value * 7;
  }



  displayArrow(text: string) {
    return (
      !(text.includes('$') || text.includes('--')) || text.includes('COVID')
    );
  }

  getDesignPic($event: MatSelectChange) {

    if ($event.value === 'Dark') {
      this.designSelectionPic = '/assets/Dark.jpg';
    } else if ($event.value === 'Light') {
      this.designSelectionPic = '/assets/Light.jpg';
    } else if ($event.value === 'Pop') {
      this.designSelectionPic = '/assets/popOfColor.jpg';
    }
  }


  createDesignSelectionText() {
    let myText = '';
    this.firstFormGroup.get('darkChecked2').value
      ? (myText += 'Dark Coasters:  ' + this.firstFormGroup.get('darkQuantity2').value + ' set(s).%0d%0a')
      : myText;
    this.firstFormGroup.get('lightChecked2').value
      ? (myText += 'Light Coasters:  ' + this.firstFormGroup.get('lightQuantity2').value + ' set(s).%0d%0a')
      : myText;
    this.firstFormGroup.get('popChecked2').value
      ? (myText += 'Pop Coasters:  ' + this.firstFormGroup.get('popQuantity2').value + ' set(s).%0d%0a')
      : myText;
    return myText;
  }

  createStandText() {
    let myText = '';
    this.firstFormGroup.get('coasterDecision2').value === 'Yes'
      ? (myText +=
        'Coaster Stand(s):  ' +
        this.firstFormGroup.get('coasterDecision2').value +
        ',  ' +
        this.firstFormGroup.get('standQuantity2').value +
        ' sets.')
      : (myText += 'Coaster Stand(s):  ' + this.firstFormGroup.get('coasterDecision2').value);
    myText += '%0d%0a';

    return myText;
  }

  sendSubmissionEmail() {
    const subjectLine = "Charity Coaster Request";
    let bodyContent = '';

    let secondLine = '';
    this.secondFormGroup.get('addressLine2_2').value ? (secondLine = this.secondFormGroup.get('addressLine2_2').value + '%0d%0a') : '';
    let addComm = '';
    this.secondFormGroup.get('additionalComments2').value
      ? (addComm =
        'Additional Comments: ' + this.secondFormGroup.get('additionalComments2').value + '%0d%0a%0d%0a')
      : '';


    bodyContent =
      'Charity Coaster Order Details:%0d%0a%0d%0aName: ' +
      this.secondFormGroup.get('fullName2').value +
      '%0d%0a' +
      '%0d%0aAddress: ' +
      '%0d%0a' +
      this.secondFormGroup.get('addressLine1_2').value +
      '%0d%0a' +
      secondLine +
      this.secondFormGroup.get('city2').value +
      '%0d%0a' +
      this.secondFormGroup.get('state2').value +
      '%0d%0a' +
      this.secondFormGroup.get('zip2').value +
      '%0d%0a' +
      '%0d%0a' +
      this.createDesignSelectionText() +
      this.createStandText() +
      'Total Charity Donation: $' +
      this.getTotalDonation() +
      '%0d%0a' +
      this.secondFormGroup.get('paymentOption2').value +
      ' Account: ' +
      this.secondFormGroup.get('paymentAccount').value +
      '%0d%0a%0d%0a' +
      addComm +
      'Total Cost: $' +
      this.getTotalCost() +
      '%0d%0a%0d%0a';



    const mail = 'mailto:dancout@umich.edu?subject=' + subjectLine +
      '&body=' + bodyContent;
    window.location.href = mail;

  }

}

export interface PeriodicElement {
  item: string;
  price: string;
  symbol: string;
  picURL: string;
}
