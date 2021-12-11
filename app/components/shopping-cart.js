import Component from '@glimmer/component';
import { set, action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
export default class ShoppingCartComponent extends Component {
  constructor() {
    super(...arguments);
    set(this, 'checkoutItems', this.storage.checkoutItems);
    set(this, 'totalPrice', this.account.totalPrice);
  }

  @service storage;
  @service account;

  @tracked checkoutItems;

  updateCart() {
    set(this, 'checkoutItems', this.storage.checkoutItems);
    set(this, 'totalPrice', this.account.totalPrice);
  }

  @action
  remove(orderId) {
    const order = { id: orderId };
    this.storage.updateCheckout(order, 'remove');
    this.account.calculatePrice();
    this.updateCart();
  }

  @action
  checkout(orders) {
    this.updateCart();
    this.account.checkout(orders);
  }
}
