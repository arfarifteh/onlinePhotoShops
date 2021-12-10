import Component from '@glimmer/component';
import { set, action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
export default class PhotoProductComponent extends Component {
  constructor() {
    super(...arguments);
    set(this, 'checkoutItems', this.storage.checkoutItems);
  }

  @service storage;
  @tracked checkoutItems;

  showCartFlag = false;

  @action
  submit(newItem) {
    this.storage.updateCheckout(newItem, 'add');
    set(this, 'checkoutItems', this.storage.checkoutItems);
    console.log('submitted items', newItem, this.storage.checkoutItems);
  }
}
