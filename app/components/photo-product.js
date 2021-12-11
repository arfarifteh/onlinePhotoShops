import Component from '@glimmer/component';
import { set, action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { priceList } from './shopping-cart';
export default class PhotoProductComponent extends Component {
  constructor() {
    super(...arguments);
    set(this, 'checkoutItems', this.storage.checkoutItems);
    set(this, 'priceList', priceList);
  }

  @service storage;
  @tracked checkoutItems;

  showCartFlag = false;

  _itemPriceCalculation(resolution) {
    let price = 0;
    switch (resolution) {
      case 'small':
        price = priceList.small;
        break;
      case 'medium':
        price = priceList.medium;
        break;
      case 'large':
        price = priceList.large;
        break;
      case 'xLarge':
        price = priceList.xLarge;
        break;

      default:
        price = priceList.medium;
        break;
    }
    return price;
  }

  _totalCalculation() {
    const inputEls = document.querySelectorAll('input');
    const resolutions = [];
    let totalPrice = 0;
    inputEls.forEach((elm) => {
      if (elm.checked) {
        resolutions.push(elm.value);
        totalPrice += this._itemPriceCalculation(elm.value);
      }
    });
    return { resolutions, totalPrice };
  }

  @action
  submit(item) {
    const { resolutions, totalPrice } = this._totalCalculation();
    const newOrder = {
      item,
      resolution: resolutions,
      price: totalPrice,
    };
    this.storage.updateCheckout(newOrder, 'add');
    set(this, 'checkoutItems', this.storage.checkoutItems);
    set(this, 'showCartFlag', !this.showCartFlag);
  }
}
