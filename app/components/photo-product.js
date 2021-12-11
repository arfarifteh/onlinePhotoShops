import Component from '@glimmer/component';
import { set, action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
export default class PhotoProductComponent extends Component {
  constructor() {
    super(...arguments);
    set(this, 'checkoutItems', this.storage.checkoutItems);
    set(this, 'priceList', this.account.priceList);
  }

  @service storage;
  @service account;

  @tracked checkoutItems;

  showCartFlag = false;

  @action
  submit(item) {
    const { resolutionList, totalPrice } = this.account.calculateTotal();
    const newOrder = {
      item,
      resolutionList: resolutionList,
      price: Number(totalPrice).toFixed(2),
    };
    this.storage.updateCheckout(newOrder, 'add');
    this.account.calculatePrice();
    set(this, 'checkoutItems', this.storage.checkoutItems);

    if (this.showCartFlag) set(this, 'showCartFlag', false);
  }
}
