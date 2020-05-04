import { Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

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
  ELEMENT_DATA: PeriodicElement[] = [
    {
      item: 'Wood Materials Cost',
      price: '$3.78',
      symbol: 'woodCost',
      picURL:
        'https://images-na.ssl-images-amazon.com/images/I/51xMwQS2PKL._AC_.jpg',
    },
    {
      item: 'Design Selection',
      price: '--',
      symbol: 'Design',
      picURL:
        'https://images-na.ssl-images-amazon.com/images/I/41Db7qugswL._AC_.jpg',
    },
    {
      item: 'Coaster Stand',
      price: '$7',
      symbol: 'stand',
      picURL:
        'https://lh3.googleusercontent.com/H6gEQNHn3DXfIqyaxpM3HlHF3HEbS2ZPeA_fJKjsJYiI2629T4oum5pOTOsL2HP1In2c3DUripWEeOAaeKVw7DHJAkeWnooMn2wFQ9WoL6tj251ersP2YK1cPRrrqdr0ClzxiOfx27M58KqM4-Ynln17Vb_TvCVR1gHrohu5xANi4gmqyiLCP6hMk_vkUggCopDcPxAjYe5pwoPPikCj38tMf2Qt1iwZFt_dS-pGLF1JQa4QPPmmv1Zp4mSMV_IDpUTC28_M905kSwl58qOXKk7V2al2GzfrtMwBrgCk3h7u_a0G2ri1IHWWplky6L8jG0SQKUkCH99URdFO1zqEzMsuqBRtuLs5nwpwaZpMu_-ZRQPTXAYhUHCe5Q4rwC4TUgiVhdph0yfDYUzuBA8z0nbVRFqGBZsMMQGl5HqsYPz4emb4vKsamjFi2ttcckiAYssPK1QXNK0Ak9UAgxOrRAiu7Qtnkm9890E4GQl04XOsgjS_jf94KZGJEJFiK9rV8bBx0KF6jdm0auGE2JdDcMybUyvKRqYa-5Sc16OD0l2_7iLbxknkWr8IVpw077QSAAjPkVHvDcAnYYf-T_biswab7lvYr3hVES9VY15-5jz-XbkSEBVVCJiWseklpT9VjrnXLJk9reNdvdXySdBcRHhK5gzluo9NyMZi5glhnG_qibuDC2QIPUfcBY8_wg=w1155-h951-no',
    },

    {
      item: 'COVID19 Relief Donation',
      price: '$15',
      symbol: 'Covid',
      picURL:
        'https://jojebar.com/wp-content/uploads/2018/04/Screen-Shot-2018-04-05-at-1.15.46-PM.png',
    },
    {
      item: 'Payment Information',
      price: '--',
      symbol: 'payment',
      picURL:
        'https://dvh1deh6tagwk.cloudfront.net/money-transfers/images/product/venmologo-supplied-310x194.png?ver=20200404-135714',
    },
    {
      item: 'Shipping',
      price: '$8.40',
      symbol: 'Shipping',
      picURL:
        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQDxAQDxAQDw8QEA8QEBAQEA8PERANFREWFhUSExUZHiggGBolGxUVIjEhJikrLi4uFx8zODMsNygtLisBCgoKDg0OGhAQGyslICYtLS0tLy8tLS0vLS0tLS0tLS0tLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBEQACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAQMCBAUGB//EAEcQAAEDAgMDCQUEBQoHAAAAAAEAAgMEEQUSITFBUQYHEyJxgZGhsTJCYXLBFCMzUhZigpKyFRdDRFNjg6LR4SQ0ZHOTs8T/xAAZAQEAAwEBAAAAAAAAAAAAAAAAAQIDBAX/xAA1EQEAAgECAwMLAwQDAQAAAAAAAQIDBBESITEFMkETFDNRYYGRscHR8EJxoRUiI+FSovGC/9oADAMBAAIRAxEAPwD7igICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICCCQggyDiEGJmbxQQZ2/HwQYGqbwPggj7V8CgzFQOBQZiVvFBkCglAQEBAQEBAQEGLngbTZBXLUsaC4nQbdCfRBT/AClGSAM5zbLRyW7zbTvU7Sjdkawflf4AepUJQas7mHvc0IH2l/5AP2v9kGXTu+CCOmdxQQZHcUEZjxPighBFkCyBZAsglAsgWQLIFkGQceKDMSlBkJvggyEoQZhw4oJQEBAQeU5T8r6WiqWQVHSNLohIHtZnblLnCxA193gsr5q0naXZp9Dl1FZtj25L8Nx+kqPwKmKQ/lDwH/umx8lauStuks8ulzYu/WYdIOV3OyDggyBQSgIFkCyCbIFkANQQUEB7b5czc1r2uL2424Inadt2VkQmyAgWQEGLr7hftNkTyRZx3N8yoOSWsdxHc3/dDknoz+Y+A0TY5HRfrO8U2NzoG/E95KbG8rALcR4qUJimBdYO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',
    },
    {
      item: 'Order Summary',
      price: '$30',
      symbol: 'total',
      picURL:
        'https://lh3.googleusercontent.com/IkHNS8Wyr_UYHc15oXFkxeeo84Gy6-IuWnRDgF3E0_DWiOACU9JQHhIg_45m46p2pkJio9ovDtoHQ9X4rKNXIXklh2bOWMG6UUcOy_Cpbpz1KICN3oFZbfelpW-tlmh9KxJqYkRowEjDafGmMbEUllVavP-KsstUD0dZluYK3qCHx2YyWUqUIygLaRESAgBiNXjQtfjSDyY4x0twQ6AyXDTgSCdYIHRqV7bzCsAj0WYoqTqJx47kARwlImleOzA5dTbzvoAQIsdK9yCtCsJ7g9V8omoyc7dtRrl-UJS0App5P1a4COYNv4rQOqo0s5nGFtlrDjUjdUoLNnz896txUBN5c4dL8KKdms0_xAXRdHEH9yg21R3PTxjIHVdVGR48t2vUil0AmFVSmwQfX53oUfC19dtQqomPj1YntWCQoesgrOyWcQh5r8_W3F056pbkAYKop28G3Sf_q17l8nSGajK5hW1yzHvixv9seBIhLHNPoltuMwbPB3jkeQh_TR8oZBlmQmuiqtSXVB3OLhjrGs1fUBAE02jn6sLpSUEzdxNkM-AghjuoatBsUm3zZjh6Xu12rB__zHIiJ4we0Et8S4V94uyZHLDryk6umHDNCoAkC3V0Yu8ZQKfFJOtCLiAOgECbteQ68Sz-s3-3iem3uTrdWdOTybNYVOHYfnbzKhmcfVDG4KtY_67dp5vG6Q=w714-h951-no',
    },
  ];

  dataSource = this.ELEMENT_DATA;
  columnsToDisplay = ['item', 'price'];
  expandedElement: PeriodicElement | null;
  title = 'dancout';
  designSelection = 'Dark';
  coasterDecision = 'No';
  totalCost: number;
  woodCost = 3.78;
  standCost = 0;
  shippingCost = 8.4;
  donationCost = 15;
  donationTooLow = false;
  venmoAccount: string;
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zip: number;

  ngOnInit() {
    this.getDesignPic();
    this.getCoasterDecision();
    this.calculateCost();
    this.expandedElement = this.ELEMENT_DATA[0];
  }

  scroll(id) {
    let el = document.getElementById(id);
    el.scrollIntoView({ behavior: 'smooth' });
  }

  getTotalDonation() {
    return this.donationCost + this.standCost;
  }

  calculateCost() {
    this.totalCost =
      this.woodCost + this.standCost + this.shippingCost + this.donationCost;
    this.ELEMENT_DATA[6].price = '$' + this.totalCost.toString();
  }

  displayWoodCostSection(symbol) {
    return symbol === 'woodCost';
  }

  displayStandSelection(symbol) {
    return symbol === 'stand';
  }

  displayDesignSelection(symbol) {
    return symbol === 'Design';
  }

  displayShippingSection(symbol) {
    return symbol === 'Shipping';
  }
  displayCovidSection(symbol) {
    return symbol === 'Covid';
  }

  displayTotalSection(symbol) {
    return symbol === 'total';
  }

  displayPaymentSection(symbol) {
    return symbol === 'payment';
  }

  lightSelected() {
    return this.designSelection === 'Light';
  }

  checkDonation() {
    if (this.donationCost < 15) {
      this.donationTooLow = true;
      this.ELEMENT_DATA[3].price =
        '$' + this.donationCost.toString() + ' -- Too Low :(';
    } else {
      this.donationTooLow = false;
      this.ELEMENT_DATA[3].price = '$' + this.donationCost.toString();
    }
    this.calculateCost();
  }

  getCoasterDecision() {
    if (this.coasterDecision === 'Yes') {
      this.ELEMENT_DATA[2].item = 'Coaster Stand (Yes, Please!)';
      this.standCost = 7;
      this.ELEMENT_DATA[2].price = '$' + this.standCost.toString();
    } else {
      this.ELEMENT_DATA[2].item = 'Coaster Stand (No, thank you.)';
      this.standCost = 0;
      this.ELEMENT_DATA[2].price = '--';
    }
    this.calculateCost();
  }

  getDesignPic() {
    if (this.designSelection === 'Dark') {
      this.ELEMENT_DATA[1].picURL =
        'https://lh3.googleusercontent.com/VHCCqifMXwb74d5WvR7o2unP_pHg3ofZ5cxH3Z2MJr7wemy4_H298EX68ex8rqGYyE39Z27aoeBUq1Ol0Y0pRpvB6iR2KzCxHkpzVKLk6qRKl1wyYTkgATBKZatfmXRNvXMPQ5_wmQdRIFL2sXQVtPSm7dT0R0VW-zPwIwGjS3cQ5J7byGnps_bXgz5XWdJXePpAfYYNoJ3gsorp0wFVYR3fFq6G3nvtb2wpLPUsPBEdvJNvax5kVXdxrV3QGOQsw6uX9B-f1b0cllel9Cdkie4buN0wLBaEwpDQdBxystNDHabNlJrZxHfZx1GrWTzLxvsIzWFkFMXfeZfcvpnSexVEvJqhQrbeqloYrzlhhvVA1PpC5fnJDY45xWa0z9kAh__fMR7fsyAlm5BchxrfCgsCdYQOBPz7dkdV7J8_SA6nDNZJLo5I4Ro1QiqaSB1ti4G1lHpfhIOC-osxYb_U0s1_9KwV4tuC3z4idwo_L49T44A-GWC5g9xK7KDte5iVV2KVDGWCDvPUefRkycPv7pvIXDxUhW9kFPeqZdSwEgo4QhntsTp_i0qcjdY8vbcrd3JRxyZGhxiziYioABkzQJOEapcqpBpperOZZrkiMuwDhZBfkUS5RaZwmhbOASLvRcWKU45VCoIVkxkCMXAprh_s2Qjy2kNa6naHRSA4GL8q-SRazhsbG3ivh3tXmg=w1000-h951-no';
    } else if (this.designSelection === 'Light') {
      this.ELEMENT_DATA[1].picURL =
        'https://lh3.googleusercontent.com/4GaXLPjukDOvQ9gN2Wmwcx9gpkp4rrdLk-6Kky7TWBpah3Gq8FspkSRYQWGLyXSj4TB8_DSryB9UGNDBVeDxHnc2e22V7ZEUU615wL7TresRy_bN5en4S_DZNb6hEqhQkQ1h8JD_EHa0sNXg-UR3PxbaAi9AL-JtK6ougO_DIKvFvJX4nvfRsOG4NK9BYTK4Dbe8d6Du-xlQ30lS_8rZNXFNLFx4IZ4ZQ_u5Z6t5mV5evHF_2jTd9HmSz93OECYUZgFDj-Jmu5f1gDDmfONNRXfl6-cyjSscJwC13xNPkvGstngomZsUYjXNZgk09khOYQK2BlG34kqC8Z3iXXsGRy_8R7rD7CrPUBUQxHvNkVA7mmQblAU_iBVvIuJed7NUJmDGQgF6pfjwX-kmS18uscHyfefWqUn2dMOsIcfUr0Iq3eZRMGKQz0WsFdv9t3oBjklNI3P374FdgOTFKdtqLkM-LXjFLX-PLHJ7ZfKXrgz9BNmMe17b7SfyPBpBccRHbY1r1yu_EITpsyfXCSDgEjb5Ba0oHLNJ767H3e53mBm6VrBBYi5p7ewDHt-BKYM5Uack_vervJCj5eiS0MYXAn6_1Yu5JGuNtMr0zw1zc2L8ECGHIjbrb5teEcARdTnMHsCc9tg2TqYUbhR5F5dhZ6QAzy83sSLaAZrUYXu4Izkb_U2Pe5c9lXSd4Pj-6Q=w1277-h951-no';
    }

    this.ELEMENT_DATA[1].item =
      'Design Selection (' + this.designSelection + ')';
  }

  checkAddressValidity() {
    return (
      this.addressLine1 &&
      this.city &&
      this.state &&
      this.firstName &&
      this.lastName &&
      this.zip &&
      this.venmoAccount &&
      !this.donationTooLow
    );
  }

  checkValidity() {
    const ready = this.checkAddressValidity();
    if (ready) {
      this.createOrderButton();
    }

    return ready;
  }

  createOrderButton() {
    console.log('submitted!');
    let el = document.getElementById('submitButton');
    let secondLine = '';
    this.addressLine2 ? (secondLine = this.addressLine2 + '%0d%0a') : '';
    el.innerHTML =
      '<a href="mailto:dancout@umich.edu?subject=Charity Coaster Request&body=Charity Coaster Order Details:%0d%0aName: ' +
      this.firstName +
      ' ' +
      this.lastName +
      '%0d%0a' +
      '%0d%0aAddress: ' +
      '%0d%0a' +
      this.addressLine1 +
      '%0d%0a' +
      secondLine +
      this.city +
      '%0d%0a' +
      this.state +
      '%0d%0a' +
      this.zip +
      '%0d%0a' +
      '%0d%0a' +
      'Design Selection: ' +
      this.designSelection +
      '%0d%0a' +
      'Coaster Stand: ' +
      this.coasterDecision +
      '%0d%0a' +
      'Total Donation: $' +
      this.getTotalDonation() +
      '%0d%0a' +
      '%0d%0a' +
      'Venmo Account: ' +
      this.venmoAccount +
      '%0d%0a' +
      'Total Cost: $' +
      this.totalCost +
      '">Order Now!</a>';
  }
}

export interface PeriodicElement {
  item: string;
  price: string;
  symbol: string;
  picURL: string;
}