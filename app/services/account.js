import Service, { inject as service } from '@ember/service';
import { set } from '@ember/object';

export default class AccountService extends Service {
  @service storage;

  constructor() {
    super(...arguments);
    this.calculatePrice();
  }

  priceList = {
    small: 25,
    medium: 50,
    large: 75,
    xLarge: 100,
  };

  taxRate = 0.15;

  _itemPriceCalculation(resolution) {
    let price = 0;
    switch (resolution) {
      case 'small':
        price = this.priceList.small;
        break;
      case 'medium':
        price = this.priceList.medium;
        break;
      case 'large':
        price = this.priceList.large;
        break;
      case 'xLarge':
        price = this.priceList.xLarge;
        break;

      default:
        price = this.priceList.medium;
        break;
    }
    return price;
  }

  calculateTotal() {
    const inputEls = document.querySelectorAll('.image-resolution>label>input');
    const resolutionList = [];
    let totalPrice = 0;
    inputEls.forEach((elm) => {
      if (elm.checked) {
        resolutionList.push(elm.value);
        totalPrice += this._itemPriceCalculation(elm.value);
      }
    });
    return { resolutionList, totalPrice };
  }

  calculatePrice() {
    const checkoutItems = this.storage.checkoutItems;
    const totalPrice = checkoutItems.reduce((acc, cur) => {
      return acc + Number(cur.price);
    }, 0);
    set(this, 'totalPrice', Number(totalPrice).toFixed(2));
  }

  checkout(orders) {
    const taxPayment = Number(this.totalPrice) * this.taxRate;
    const totalPrice = Number(this.totalPrice) + taxPayment;
    const orderDetails = {
      orderItems: orders,
      priceOrders: Number(this.totalPrice),
      tax: taxPayment,
      totalPrice: totalPrice,
    };
    console.log('orders list for checkout:', orderDetails);
    // will be handled in /checkout server endpoint
  }
}
