import Component from '@glimmer/component';
import { set, action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export const priceList = {
  small: 25,
  medium: 50,
  large: 75,
  xLarge: 100,
};
export default class ShoppingCartComponent extends Component {
  constructor() {
    super(...arguments);
    set(this, 'checkoutItems', this.storage.checkoutItems);
    set(this, 'totalPrice', this._sumPrices());
  }

  @service storage;
  @tracked totalPrice;
  @tracked checkoutItems;

  taxRate = 0.15;

  _sumPrices() {
    const checkoutItems = this.storage.checkoutItems;
    const totalPrice = checkoutItems.reduce((acc, cur) => {
      return acc + cur.price;
    }, 0);
    return totalPrice.toFixed(2);
  }

  updateCart() {
    set(this, 'checkoutItems', this.storage.checkoutItems);
    set(this, 'totalPrice', this._sumPrices());
  }

  @action
  remove(orderId) {
    const order = { id: orderId };
    this.storage.updateCheckout(order, 'remove');
    this.updateCart();
  }

  @action
  checkout(orders) {
    this.updateCart();
    const taxPayment = Number(this.totalPrice) * this.taxRate;
    const totalPrice = Number(this.totalPrice) + taxPayment;
    const orderDetails = {
      orderItems: orders,
      priceOrders: this.totalPrice,
      tax: taxPayment,
      totalPrice: totalPrice,
    };
    console.log('orders list for checkout:', orderDetails);
    // will be handled in checkout service
  }
}
