import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ShoppingCartComponent extends Component {
  constructor() {
    super(...arguments);
  }
  @service storage;

  @action
  remove(orderId) {
    const order = { id: orderId };
    this.storage.updateCheckout(order, 'remove');
  }

  @action
  checkout(orders) {
    console.log('orders list for checkout:', orders);
    // will be handled in checkout service
  }
}
